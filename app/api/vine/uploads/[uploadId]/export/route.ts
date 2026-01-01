import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { uploadId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify upload belongs to user
    const upload = await prisma.upload.findFirst({
      where: {
        id: params.uploadId,
        userId: user.id,
      },
    });

    if (!upload) {
      return NextResponse.json({ error: "Upload not found" }, { status: 404 });
    }

    // Get all orders for this upload
    const orders = await prisma.vineOrder.findMany({
      where: { uploadId: params.uploadId },
      include: {
        asinData: true,
      },
      orderBy: { orderDate: "desc" },
    });

    // Find cancellations
    const orderNumbers = orders.map((o) => o.orderNumber);
    const cancellations = await prisma.vineOrder.findMany({
      where: {
        uploadId: params.uploadId,
        orderNumber: { in: orderNumbers },
        orderType: "Cancellation",
      },
      select: { orderNumber: true },
    });

    const cancelledOrderNumbers = new Set(
      cancellations.map((c) => c.orderNumber)
    );

    // Generate CSV
    const csvRows = [
      [
        "Order Number",
        "Order Date",
        "Order Type",
        "ASIN",
        "Product Name",
        "Amazon ETV",
        "ZTV",
        "User FMV",
        "User Notes",
        "Cancelled",
      ].join(","),
    ];

    for (const order of orders) {
      const row = [
        order.orderNumber,
        order.orderDate ? order.orderDate.toISOString().split("T")[0] : "",
        order.orderType || "",
        order.asin,
        `"${(order.productName || "").replace(/"/g, '""')}"`,
        order.estimatedValue ? order.estimatedValue.toString() : "",
        order.computedFmv ? order.computedFmv.toString() : "",
        order.userFmv ? order.userFmv.toString() : "",
        `"${(order.userNotes || "").replace(/"/g, '""')}"`,
        cancelledOrderNumbers.has(order.orderNumber) ? "Yes" : "No",
      ];
      csvRows.push(row.join(","));
    }

    const csv = csvRows.join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="vine-orders-${upload.filename}-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export CSV error:", error);
    return NextResponse.json(
      { error: "Failed to export CSV" },
      { status: 500 }
    );
  }
}
