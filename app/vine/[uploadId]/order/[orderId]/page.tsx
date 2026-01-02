"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

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
    category: string | null;
  };
}

function OrderDetailContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const uploadId = params.uploadId as string;
  const orderId = params.orderId as string;

  // Get sort and view parameters from URL
  const sortBy = searchParams.get("sortBy") || "orderDate";
  const sortOrder = (searchParams.get("sortOrder") || "desc") as "asc" | "desc";
  const viewMode = searchParams.get("view") || "chiclet";

  const [order, setOrder] = useState<Order | null>(null);
  const [allOrderIds, setAllOrderIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userNotes, setUserNotes] = useState("");
  const [userFmv, setUserFmv] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session && uploadId && orderId) {
      setLoading(true);
      setOrder(null); // Clear previous order data
      fetchOrder();
      fetchAllOrderIds();
    }
  }, [session, uploadId, orderId]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/vine/orders/${orderId}`);
      const data = await response.json();
      setOrder(data.order);
      setUserNotes(data.order.userNotes || "");
      setUserFmv(data.order.userFmv || "");
    } catch (error) {
      console.error("Failed to fetch order:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllOrderIds = async () => {
    try {
      const response = await fetch(
        `/api/vine/uploads/${uploadId}?page=1&limit=10000&sortBy=${sortBy}&sortOrder=${sortOrder}`
      );
      const data = await response.json();
      const ids = data.orders.map((o: Order) => o.id);
      setAllOrderIds(ids);
    } catch (error) {
      console.error("Failed to fetch order IDs:", error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`/api/vine/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userNotes,
          userFmv: userFmv ? parseFloat(userFmv) : null,
        }),
      });

      if (response.ok) {
        setMessage("Saved successfully");
        setTimeout(() => setMessage(""), 2000);
        fetchOrder();
      }
    } catch (error) {
      setMessage("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const navigateTo = (direction: "prev" | "next") => {
    const currentIdx = allOrderIds.indexOf(orderId);
    let newIdx = direction === "prev" ? currentIdx - 1 : currentIdx + 1;

    if (newIdx < 0) newIdx = allOrderIds.length - 1;
    if (newIdx >= allOrderIds.length) newIdx = 0;

    const newOrderId = allOrderIds[newIdx];
    // Preserve sort and view parameters when navigating
    router.push(`/vine/${uploadId}/order/${newOrderId}?sortBy=${sortBy}&sortOrder=${sortOrder}&view=${viewMode}`);
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent shadow-lg shadow-purple-500/50"></div>
          <p className="mt-4 text-sm font-medium text-gray-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!session || !order) {
    return null;
  }

  const totalOrders = allOrderIds.length;
  const currentPosition = allOrderIds.indexOf(orderId) + 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href={`/vine/${uploadId}?sortBy=${sortBy}&sortOrder=${sortOrder}&view=${viewMode}`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Orders
          </Link>
        </div>

        <div className="mb-6 flex items-center justify-between rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm p-4">
          <button
            onClick={() => navigateTo("prev")}
            className="group flex items-center gap-2 rounded-lg bg-gray-700/50 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-gray-700 hover:text-white"
          >
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <div className="text-center">
            <div className="text-xs text-gray-500">Order Details</div>
            <div className="text-sm font-semibold text-white">
              {currentPosition} of {totalOrders}
            </div>
          </div>
          <button
            onClick={() => navigateTo("next")}
            className="group flex items-center gap-2 rounded-lg bg-gray-700/50 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-gray-700 hover:text-white"
          >
            Next
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {message && (
          <div className="mb-6 rounded-xl bg-green-500/10 border border-green-500/20 p-4 backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2 text-sm font-medium text-green-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {message}
            </div>
          </div>
        )}

        {order.isCancelled && (
          <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-red-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              This order has a matching cancellation
            </div>
          </div>
        )}

        {order.orderType?.toUpperCase() === "CANCELLATION" && (
          <div className="mb-6 rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-yellow-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              This is a cancellation record
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm shadow-2xl">
          <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-2">
            <div>
              {order.asinData?.imageUrl ? (
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-800/30 border border-gray-700/50">
                  <Image
                    src={order.asinData.imageUrl}
                    alt={order.productName}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              ) : (
                <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-gray-800/30 border border-gray-700/50">
                  <div className="text-center text-gray-500">
                    <svg
                      className="mx-auto h-16 w-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="mt-3 text-sm">No image available</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {order.productName}
                </h1>
                <p className="mt-2 text-sm text-gray-400">ASIN: <span className="text-gray-300 font-mono">{order.asin}</span></p>
                {order.asinData?.category && (
                  <p className="mt-1 text-sm text-gray-400">
                    Category: <span className="text-gray-300">{order.asinData.category}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-gray-700/50 pt-6">
                <div className="rounded-lg bg-gray-700/30 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Order Number
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {order.orderNumber}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-700/30 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Order Date
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-amber-400">
                    Amazon ETV
                  </p>
                  <p className="mt-2 text-lg font-bold text-amber-400">
                    {order.estimatedValue !== null && order.estimatedValue !== undefined
                      ? `$${parseFloat(order.estimatedValue).toFixed(2)}`
                      : "N/A"}
                  </p>
                </div>
                <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-purple-400">
                    ZTV
                  </p>
                  <p className="mt-2 text-lg font-bold text-purple-400">
                    {order.computedFmv !== null && order.computedFmv !== undefined
                      ? `$${parseFloat(order.computedFmv).toFixed(2)}`
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-700/50 pt-6">
                <label
                  htmlFor="userFmv"
                  className="block text-sm font-medium text-gray-300"
                >
                  Your Fair Market Value Estimate
                </label>
                <div className="mt-2 flex rounded-lg bg-gray-700/30 border border-gray-600 overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-transparent transition-all">
                  <span className="inline-flex items-center px-4 text-gray-400 font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    id="userFmv"
                    step="0.01"
                    min="0"
                    value={userFmv}
                    onChange={(e) => setUserFmv(e.target.value)}
                    className="block w-full bg-transparent border-0 px-3 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-0"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="userNotes"
                  className="block text-sm font-medium text-gray-300"
                >
                  Your Notes
                </label>
                <textarea
                  id="userNotes"
                  rows={4}
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  className="mt-2 block w-full rounded-lg bg-gray-700/30 border border-gray-600 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Add notes about this item..."
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-xl hover:shadow-purple-500/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {saving ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
          <div className="text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent shadow-lg shadow-purple-500/50"></div>
            <p className="mt-4 text-sm font-medium text-gray-400">Loading order details...</p>
          </div>
        </div>
      }
    >
      <OrderDetailContent key={orderId} />
    </Suspense>
  );
}
