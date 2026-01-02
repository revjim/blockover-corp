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

  // Get sort parameters from URL
  const sortBy = searchParams.get("sortBy") || "orderDate";
  const sortOrder = (searchParams.get("sortOrder") || "desc") as "asc" | "desc";

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
    // Preserve sort parameters when navigating
    router.push(`/vine/${uploadId}/order/${newOrderId}?sortBy=${sortBy}&sortOrder=${sortOrder}`);
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

  if (!session || !order) {
    return null;
  }

  const totalOrders = allOrderIds.length;
  const currentPosition = allOrderIds.indexOf(orderId) + 1;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link
            href={`/vine/${uploadId}?sortBy=${sortBy}&sortOrder=${sortOrder}`}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            ← Back to Orders
          </Link>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => navigateTo("prev")}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-50"
          >
            ← Previous
          </button>
          <div className="text-sm font-medium text-gray-900">
            Order Details
          </div>
          <button
            onClick={() => navigateTo("next")}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-50"
          >
            Next →
          </button>
        </div>

        {message && (
          <div className="mb-4 rounded-md bg-green-50 p-4">
            <div className="text-sm text-green-800">{message}</div>
          </div>
        )}

        {order.isCancelled && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
            <div className="text-sm font-medium text-red-800">
              ⚠️ This order has a matching cancellation
            </div>
          </div>
        )}

        {order.orderType?.toUpperCase() === "CANCELLATION" && (
          <div className="mb-4 rounded-md bg-yellow-50 p-4">
            <div className="text-sm font-medium text-yellow-800">
              ⚠️ This is a cancellation record
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
            <div>
              {order.asinData?.imageUrl ? (
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={order.asinData.imageUrl}
                    alt={order.productName}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-gray-100">
                  <div className="text-center text-gray-400">
                    <svg
                      className="mx-auto h-12 w-12"
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
                    <p className="mt-2 text-sm">No image available</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {order.productName}
                </h1>
                <p className="mt-1 text-sm text-gray-500">ASIN: {order.asin}</p>
                {order.asinData?.category && (
                  <p className="text-sm text-gray-500">
                    Category: {order.asinData.category}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Order Number
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {order.orderNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Order Date
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Amazon ETV
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {order.estimatedValue !== null && order.estimatedValue !== undefined
                      ? `$${parseFloat(order.estimatedValue).toFixed(2)}`
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    ZTV
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {order.computedFmv !== null && order.computedFmv !== undefined
                      ? `$${parseFloat(order.computedFmv).toFixed(2)}`
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <label
                  htmlFor="userFmv"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Fair Market Value Estimate
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    id="userFmv"
                    step="0.01"
                    min="0"
                    value={userFmv}
                    onChange={(e) => setUserFmv(e.target.value)}
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="userNotes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Notes
                </label>
                <textarea
                  id="userNotes"
                  rows={4}
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                  placeholder="Add notes about this item..."
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => navigateTo("prev")}
            className="rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow hover:bg-gray-50"
          >
            ← Previous Item
          </button>
          <button
            onClick={() => navigateTo("next")}
            className="rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow hover:bg-gray-50"
          >
            Next Item →
          </button>
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
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-900 border-t-transparent"></div>
          </div>
        </div>
      }
    >
      <OrderDetailContent key={orderId} />
    </Suspense>
  );
}
