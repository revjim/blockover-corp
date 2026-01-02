"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";

interface Order {
  id: string;
  orderNumber: string;
  orderDate: string | null;
  orderType: string | null;
  asin: string;
  productName: string;
  estimatedValue: string | null;
  computedFmv: string | null;
  userFmv: string | null;
  userNotes: string | null;
  isCancelled: boolean;
  asinData?: {
    imageUrl: string | null;
  };
}

interface Upload {
  id: string;
  filename: string;
  uploadedAt: string;
}

function VineOrdersContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const uploadId = params.uploadId as string;

  const [upload, setUpload] = useState<Upload | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Read sort params directly from URL (no state needed)
  const sortBy = searchParams.get("sortBy") || "orderDate";
  const sortOrder = (searchParams.get("sortOrder") || "desc") as "asc" | "desc";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session && uploadId) {
      fetchOrders();
    }
  }, [session, uploadId, page, sortBy, sortOrder]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `/api/vine/uploads/${uploadId}?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`
      );
      const data = await response.json();
      setUpload(data.upload);
      setOrders(data.orders || []);
      setTotalPages(data.pagination.totalPages);
      setTotal(data.pagination.total);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: string) => {
    const newSortOrder = sortBy === field ? (sortOrder === "asc" ? "desc" : "asc") : "desc";
    // Update URL with new sort parameters
    router.push(`/vine/${uploadId}?sortBy=${field}&sortOrder=${newSortOrder}`);
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-900 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/vine"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            ← Back to Uploads
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {upload?.filename}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {total} orders • Uploaded on{" "}
            {upload ? new Date(upload.uploadedAt).toLocaleDateString() : ""}
          </p>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </div>
          <a
            href={`/api/vine/uploads/${uploadId}/export`}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Export CSV
          </a>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    onClick={() => handleSort("orderDate")}
                    className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hover:bg-gray-100"
                  >
                    Order Date{" "}
                    {sortBy === "orderDate" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("orderNumber")}
                    className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hover:bg-gray-100"
                  >
                    Order #{" "}
                    {sortBy === "orderNumber" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("productName")}
                    className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hover:bg-gray-100"
                  >
                    Product{" "}
                    {sortBy === "productName" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("asin")}
                    className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hover:bg-gray-100"
                  >
                    ASIN{" "}
                    {sortBy === "asin" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("estimatedValue")}
                    className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hover:bg-gray-100"
                  >
                    Amazon ETV{" "}
                    {sortBy === "estimatedValue" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("computedFmv")}
                    className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hover:bg-gray-100"
                  >
                    ZTV{" "}
                    {sortBy === "computedFmv" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("userFmv")}
                    className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hover:bg-gray-100"
                  >
                    Your FMV{" "}
                    {sortBy === "userFmv" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {orders.map((order, index) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {order.orderDate
                        ? new Date(order.orderDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {order.orderNumber}
                    </td>
                    <td className="max-w-xs truncate px-6 py-4 text-sm text-gray-900">
                      {order.productName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {order.asin}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {order.estimatedValue !== null && order.estimatedValue !== undefined
                        ? `$${parseFloat(order.estimatedValue).toFixed(2)}`
                        : "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {order.computedFmv !== null && order.computedFmv !== undefined
                        ? `$${parseFloat(order.computedFmv).toFixed(2)}`
                        : "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {order.userFmv
                        ? `$${parseFloat(order.userFmv).toFixed(2)}`
                        : "-"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {order.isCancelled && (
                        <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                          Cancelled
                        </span>
                      )}
                      {order.orderType?.toUpperCase() === "CANCELLATION" && (
                        <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                          Cancellation
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <Link
                        href={`/vine/${uploadId}/order/${order.id}?sortBy=${sortBy}&sortOrder=${sortOrder}`}
                        className="text-gray-900 hover:text-gray-700"
                      >
                        Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <div className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </div>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VineOrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-900 border-t-transparent"></div>
          </div>
        </div>
      }
    >
      <VineOrdersContent />
    </Suspense>
  );
}
