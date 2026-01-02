import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
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

    const { userNotes, userFmv } = await request.json();

    // Verify order belongs to user's upload
    const order = await prisma.vineOrder.findFirst({
      where: {
        id: orderId,
        upload: {
          userId: user.id,
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Update order
    const updatedOrder = await prisma.vineOrder.update({
      where: { id: orderId },
      data: {
        userNotes,
        userFmv: userFmv ? parseFloat(userFmv) : null,
      },
      include: {
        asinData: true,
      },
    });

    return NextResponse.json({ order: updatedOrder });
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
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

    // Get order with ASIN data
    const order = await prisma.vineOrder.findFirst({
      where: {
        id: orderId,
        upload: {
          userId: user.id,
        },
      },
      include: {
        asinData: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Check if this order has a cancellation
    const cancellation = await prisma.vineOrder.findFirst({
      where: {
        uploadId: order.uploadId,
        orderNumber: order.orderNumber,
        orderType: { equals: "Cancellation", mode: "insensitive" },
      },
    });

    return NextResponse.json({
      order,
      isCancelled: !!cancellation,
    });
  } catch (error) {
    console.error("Get order error:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
