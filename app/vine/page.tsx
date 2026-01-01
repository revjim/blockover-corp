"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Upload {
  id: string;
  filename: string;
  uploadedAt: string;
  _count: {
    orders: number;
  };
}

export default function VineUploadsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchUploads();
    }
  }, [session]);

  const fetchUploads = async () => {
    try {
      const response = await fetch("/api/vine/uploads");
      const data = await response.json();
      setUploads(data.uploads || []);
    } catch (error) {
      console.error("Failed to fetch uploads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/vine/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          `Upload successful! Processed ${data.ordersCount} orders.`
        );
        fetchUploads();
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (error) {
      setError("An error occurred during upload");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (uploadId: string) => {
    if (!confirm("Are you sure you want to delete this upload?")) {
      return;
    }

    try {
      const response = await fetch(`/api/vine/uploads/${uploadId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Upload deleted successfully");
        fetchUploads();
      } else {
        setError("Failed to delete upload");
      }
    } catch (error) {
      setError("An error occurred");
    }
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
          <h1 className="text-3xl font-bold text-gray-900">
            Amazon Vine Orders
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Upload and manage your Amazon Vine order spreadsheets
          </p>
        </div>

        {message && (
          <div className="mb-4 rounded-md bg-green-50 p-4">
            <div className="text-sm text-green-800">{message}</div>
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-800">{error}</div>
          </div>
        )}

        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-900">
            Upload Spreadsheet
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Upload an Excel file (.xlsx, .xls) containing your Amazon Vine
            orders
          </p>
          <div className="mt-4">
            <label
              htmlFor="file-upload"
              className="inline-flex cursor-pointer items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Choose File"}
              <input
                id="file-upload"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                disabled={uploading}
                className="sr-only"
              />
            </label>
          </div>
        </div>

        <div className="rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Uploads
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {uploads.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-gray-500">
                No uploads yet. Upload your first spreadsheet to get started.
              </div>
            ) : (
              uploads.map((upload) => (
                <div
                  key={upload.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <Link
                      href={`/vine/${upload.id}`}
                      className="text-sm font-medium text-gray-900 hover:text-gray-700"
                    >
                      {upload.filename}
                    </Link>
                    <div className="mt-1 text-xs text-gray-500">
                      {new Date(upload.uploadedAt).toLocaleDateString()} •{" "}
                      {upload._count.orders} orders
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Link
                      href={`/vine/${upload.id}`}
                      className="text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      View Orders
                    </Link>
                    <a
                      href={`/api/vine/uploads/${upload.id}/export`}
                      className="text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      Export CSV
                    </a>
                    <button
                      onClick={() => handleDelete(upload.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
