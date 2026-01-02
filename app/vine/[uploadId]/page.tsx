"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import VineStatistics from "@/components/VineStatistics";

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
  const [allOrders, setAllOrders] = useState<Order[]>([]); // For statistics
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Read sort params directly from URL (no state needed)
  const sortBy = searchParams.get("sortBy") || "orderDate";
  const sortOrder = (searchParams.get("sortOrder") || "desc") as "asc" | "desc";
  const viewMode = (searchParams.get("view") || "chiclet") as "chiclet" | "table" | "compact";

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

  useEffect(() => {
    if (session && uploadId) {
      fetchAllOrders();
    }
  }, [session, uploadId]);

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

  const fetchAllOrders = async () => {
    try {
      const response = await fetch(
        `/api/vine/uploads/${uploadId}?page=1&limit=10000`
      );
      const data = await response.json();
      setAllOrders(data.orders || []);
    } catch (error) {
      console.error("Failed to fetch all orders for statistics:", error);
    }
  };

  const handleSort = (field: string) => {
    const newSortOrder = sortBy === field ? (sortOrder === "asc" ? "desc" : "asc") : "desc";
    // Update URL with new sort parameters, preserve view mode
    router.push(`/vine/${uploadId}?sortBy=${field}&sortOrder=${newSortOrder}&view=${viewMode}`);
  };

  const handleViewChange = (view: "chiclet" | "table" | "compact") => {
    // Update URL with new view, preserve sort parameters
    router.push(`/vine/${uploadId}?sortBy=${sortBy}&sortOrder=${sortOrder}&view=${view}`);
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent shadow-lg shadow-purple-500/50"></div>
          <p className="mt-4 text-sm font-medium text-gray-400">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/vine"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Uploads
          </Link>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {upload?.filename}
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                {total} orders • Uploaded on{" "}
                {upload ? new Date(upload.uploadedAt).toLocaleDateString() : ""}
              </p>
            </div>
            <a
              href={`/api/vine/uploads/${uploadId}/export`}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Export CSV
              </span>
            </a>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <VineStatistics orders={allOrders} />

        {/* View Switcher and Sort Controls */}
        <div className="mb-6 rounded-xl bg-gray-800/50 border border-gray-700/50 p-4 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* View Switcher */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-400">View:</span>
              <div className="inline-flex rounded-lg bg-gray-700/30 border border-gray-600/50 p-1">
                <button
                  onClick={() => handleViewChange("chiclet")}
                  className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                    viewMode === "chiclet"
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                  Cards
                </button>
                <button
                  onClick={() => handleViewChange("table")}
                  className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                    viewMode === "table"
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Table
                </button>
                <button
                  onClick={() => handleViewChange("compact")}
                  className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                    viewMode === "compact"
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  List
                </button>
              </div>
            </div>

            {/* Sort Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-gray-400">Sort by:</span>
              {[
                { key: "orderDate", label: "Date" },
                { key: "orderNumber", label: "Order #" },
                { key: "productName", label: "Product" },
                { key: "asin", label: "ASIN" },
                { key: "estimatedValue", label: "Amazon ETV" },
                { key: "computedFmv", label: "ZTV" },
                { key: "userFmv", label: "Your FMV" }
              ].map((sort) => (
                <button
                  key={sort.key}
                  onClick={() => handleSort(sort.key)}
                  className={`group relative rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                    sortBy === sort.key
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {sort.label}
                  {sortBy === sort.key && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders Display - Conditional Rendering Based on View Mode */}
        {viewMode === "chiclet" && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/vine/${uploadId}/order/${order.id}?sortBy=${sortBy}&sortOrder=${sortOrder}&view=${viewMode}`}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm p-6 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500/50"
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {order.orderType?.toUpperCase() === "CANCELLATION" ? (
                    <span className="inline-flex items-center rounded-full bg-yellow-500/20 border border-yellow-500/30 px-3 py-1 text-xs font-semibold text-yellow-400">
                      Cancellation
                    </span>
                  ) : order.isCancelled ? (
                    <span className="inline-flex items-center rounded-full bg-red-500/20 border border-red-500/30 px-3 py-1 text-xs font-semibold text-red-400">
                      Cancelled
                    </span>
                  ) : null}
                </div>

                {/* Product Name */}
                <h3 className="mb-4 text-lg font-semibold text-white line-clamp-2 pr-20">
                  {order.productName}
                </h3>

                {/* Details Grid */}
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</p>
                    <p className="mt-1 text-sm font-semibold text-gray-300">{order.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">ASIN</p>
                    <p className="mt-1 text-sm font-semibold text-gray-300">{order.asin}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Date</p>
                    <p className="mt-1 text-sm font-semibold text-gray-300">
                      {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Amazon ETV</p>
                    <p className="mt-1 text-sm font-semibold text-amber-400">
                      {order.estimatedValue !== null && order.estimatedValue !== undefined
                        ? `$${parseFloat(order.estimatedValue).toFixed(2)}`
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Value Pills */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-700/50">
                  <div className="flex-1 rounded-lg bg-purple-500/10 border border-purple-500/20 px-3 py-2">
                    <p className="text-xs text-gray-400">ZTV</p>
                    <p className="text-lg font-bold text-purple-400">
                      {order.computedFmv !== null && order.computedFmv !== undefined
                        ? `$${parseFloat(order.computedFmv).toFixed(2)}`
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-3 py-2">
                    <p className="text-xs text-gray-400">Your FMV</p>
                    <p className="text-lg font-bold text-cyan-400">
                      {order.userFmv ? `$${parseFloat(order.userFmv).toFixed(2)}` : "-"}
                    </p>
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}

        {viewMode === "table" && (
          <div className="rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/70 border-b border-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Order #</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">ASIN</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Amazon ETV</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">ZTV</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Your FMV</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="group hover:bg-gray-700/30 transition-colors cursor-pointer"
                      onClick={() => router.push(`/vine/${uploadId}/order/${order.id}?sortBy=${sortBy}&sortOrder=${sortOrder}&view=${viewMode}`)}
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white line-clamp-2 max-w-md group-hover:text-purple-400 transition-colors">
                          {order.productName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{order.orderNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{order.asin}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-semibold text-amber-400">
                          {order.estimatedValue !== null && order.estimatedValue !== undefined
                            ? `$${parseFloat(order.estimatedValue).toFixed(2)}`
                            : "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-semibold text-purple-400">
                          {order.computedFmv !== null && order.computedFmv !== undefined
                            ? `$${parseFloat(order.computedFmv).toFixed(2)}`
                            : "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-semibold text-cyan-400">
                          {order.userFmv ? `$${parseFloat(order.userFmv).toFixed(2)}` : "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex justify-center gap-2">
                          {order.orderType?.toUpperCase() === "CANCELLATION" ? (
                            <span className="inline-flex items-center rounded-full bg-yellow-500/20 border border-yellow-500/30 px-2 py-1 text-xs font-semibold text-yellow-400">
                              Cancellation
                            </span>
                          ) : order.isCancelled ? (
                            <span className="inline-flex items-center rounded-full bg-red-500/20 border border-red-500/30 px-2 py-1 text-xs font-semibold text-red-400">
                              Cancelled
                            </span>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {viewMode === "compact" && (
          <div className="rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm overflow-hidden">
            <div className="divide-y divide-gray-700/50">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/vine/${uploadId}/order/${order.id}?sortBy=${sortBy}&sortOrder=${sortOrder}&view=${viewMode}`}
                  className="group flex items-center gap-6 px-6 py-4 hover:bg-gray-700/30 transition-all"
                >
                  {/* Left: Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-white line-clamp-1 group-hover:text-purple-400 transition-colors">
                      {order.productName}
                    </h3>
                    <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {order.orderNumber}
                      </span>
                      <span>•</span>
                      <span>{order.asin}</span>
                      <span>•</span>
                      <span>{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}</span>
                    </div>
                  </div>

                  {/* Right: Values and Status */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Amazon ETV</p>
                      <p className="text-sm font-semibold text-amber-400">
                        {order.estimatedValue !== null && order.estimatedValue !== undefined
                          ? `$${parseFloat(order.estimatedValue).toFixed(2)}`
                          : "N/A"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">ZTV</p>
                      <p className="text-sm font-semibold text-purple-400">
                        {order.computedFmv !== null && order.computedFmv !== undefined
                          ? `$${parseFloat(order.computedFmv).toFixed(2)}`
                          : "N/A"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Your FMV</p>
                      <p className="text-sm font-semibold text-cyan-400">
                        {order.userFmv ? `$${parseFloat(order.userFmv).toFixed(2)}` : "-"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 min-w-[120px] justify-end">
                      {order.orderType?.toUpperCase() === "CANCELLATION" ? (
                        <span className="inline-flex items-center rounded-full bg-yellow-500/20 border border-yellow-500/30 px-2 py-1 text-xs font-semibold text-yellow-400">
                          Cancellation
                        </span>
                      ) : order.isCancelled ? (
                        <span className="inline-flex items-center rounded-full bg-red-500/20 border border-red-500/30 px-2 py-1 text-xs font-semibold text-red-400">
                          Cancelled
                        </span>
                      ) : null}
                    </div>
                    <svg className="h-5 w-5 text-gray-600 group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between rounded-xl bg-gray-800/50 border border-gray-700/50 p-4 backdrop-blur-sm">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="group flex items-center gap-2 rounded-lg bg-gray-700/50 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <div className="text-sm font-medium text-gray-400">
            Page <span className="text-white">{page}</span> of <span className="text-white">{totalPages}</span>
          </div>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="group flex items-center gap-2 rounded-lg bg-gray-700/50 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
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
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
          <div className="text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent shadow-lg shadow-purple-500/50"></div>
            <p className="mt-4 text-sm font-medium text-gray-400">Loading orders...</p>
          </div>
        </div>
      }
    >
      <VineOrdersContent />
    </Suspense>
  );
}
