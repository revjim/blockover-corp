import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
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

    // Delete upload (cascades to orders)
    await prisma.upload.delete({
      where: { id: params.uploadId },
    });

    return NextResponse.json({ message: "Upload deleted successfully" });
  } catch (error) {
    console.error("Delete upload error:", error);
    return NextResponse.json(
      { error: "Failed to delete upload" },
      { status: 500 }
    );
  }
}

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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const sortBy = searchParams.get("sortBy") || "orderDate";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

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

    const [orders, total] = await Promise.all([
      prisma.vineOrder.findMany({
        where: { uploadId: params.uploadId },
        include: {
          asinData: true,
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      prisma.vineOrder.count({
        where: { uploadId: params.uploadId },
      }),
    ]);

    // Find cancellations for order numbers in this batch
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

    // Add cancellation status to each order
    const ordersWithCancellationStatus = orders.map((order) => ({
      ...order,
      isCancelled: cancelledOrderNumbers.has(order.orderNumber),
    }));

    return NextResponse.json({
      upload,
      orders: ordersWithCancellationStatus,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get upload orders error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
