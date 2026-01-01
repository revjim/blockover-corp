import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

export async function POST(request: NextRequest) {
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

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Read the Excel file
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Try parsing normally first
    let jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Check if first row looks like a title row (Amazon Vine Itemized Report format)
    if (jsonData.length > 0 && jsonData[0]) {
      const firstRowKeys = Object.keys(jsonData[0]);
      // If we see "__EMPTY" columns or "Itemized Report", it's the Amazon Vine format
      // Row 0: Title, Row 1: Empty, Row 2: Headers, Row 3+: Data
      if (firstRowKeys.some(key => key.startsWith('__EMPTY')) ||
          firstRowKeys.some(key => key.includes('Itemized Report'))) {
        // Re-parse starting from row 3 (index 2), using row 3 (index 2) as headers
        jsonData = XLSX.utils.sheet_to_json(worksheet, { range: 2 });
      }
    }

    if (jsonData.length === 0) {
      return NextResponse.json(
        { error: "No data found in spreadsheet" },
        { status: 400 }
      );
    }

    // Create upload record
    const upload = await prisma.upload.create({
      data: {
        userId: user.id,
        filename: file.name,
      },
    });

    // Process orders and ASINs
    const orders = [];
    const asinMap = new Map<string, { productName: string }>();

    for (const row of jsonData as any[]) {
      // Map common Excel column names (adjust based on actual format)
      const orderNumber = row["Order Number"] || row["OrderNumber"] || row["order_number"] || "";
      const orderDate = row["Order Date"] || row["OrderDate"] || row["order_date"];
      const orderType = row["Order Type"] || row["OrderType"] || row["order_type"] || "Order";
      const asin = row["ASIN"] || row["asin"] || "";
      const productName = row["Product Name"] || row["ProductName"] || row["product_name"] || "";
      const estimatedValue = row["Estimated Tax Value"] || row["Estimated Value"] || row["EstimatedValue"] || row["estimated_value"];

      if (!asin || !orderNumber) {
        continue; // Skip rows without ASIN or order number
      }

      // Store ASIN data for batch upsert
      if (productName && !asinMap.has(asin)) {
        asinMap.set(asin, { productName });
      }

      // Parse date
      let parsedDate: Date | null = null;
      if (orderDate) {
        if (typeof orderDate === "number") {
          // Excel date serial number
          parsedDate = XLSX.SSF.parse_date_code(orderDate);
          parsedDate = new Date(parsedDate.y, parsedDate.m - 1, parsedDate.d);
        } else if (typeof orderDate === "string") {
          parsedDate = new Date(orderDate);
        }
      }

      // Parse estimated value
      let parsedValue: number | null = null;
      if (estimatedValue) {
        const numValue = typeof estimatedValue === "number"
          ? estimatedValue
          : parseFloat(String(estimatedValue).replace(/[$,]/g, ""));
        if (!isNaN(numValue)) {
          parsedValue = numValue;
        }
      }

      orders.push({
        uploadId: upload.id,
        orderNumber: String(orderNumber),
        orderDate: parsedDate,
        orderType: String(orderType),
        asin: String(asin),
        productName: String(productName),
        estimatedValue: parsedValue,
        computedFmv: null, // Will be calculated separately
      });
    }

    // Batch upsert ASINs
    for (const [asin, data] of asinMap) {
      await prisma.asin.upsert({
        where: { asin },
        update: { productName: data.productName },
        create: {
          asin,
          productName: data.productName,
        },
      });
    }

    // Create all orders
    await prisma.vineOrder.createMany({
      data: orders,
    });

    // Calculate FMV for all orders based on user's subscription plan
    await calculateFmvForUpload(upload.id, user.subscriptionPlan || "basic");

    return NextResponse.json({
      message: "Upload successful",
      uploadId: upload.id,
      ordersCount: orders.length,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process upload" },
      { status: 500 }
    );
  }
}

async function calculateFmvForUpload(uploadId: string, subscriptionPlan: string) {
  // Get all orders for this upload
  const orders = await prisma.vineOrder.findMany({
    where: { uploadId },
  });

  // Calculate FMV based on subscription plan
  const updates = orders.map((order) => {
    let computedFmv = order.estimatedValue ? Number(order.estimatedValue) : 0;

    // Different plans get different FMV calculations
    switch (subscriptionPlan) {
      case "premium":
        // Premium: 110% of estimated value
        computedFmv = computedFmv * 1.1;
        break;
      case "enterprise":
        // Enterprise: 120% of estimated value
        computedFmv = computedFmv * 1.2;
        break;
      default:
        // Basic: 100% of estimated value
        break;
    }

    return prisma.vineOrder.update({
      where: { id: order.id },
      data: { computedFmv },
    });
  });

  await Promise.all(updates);
}
