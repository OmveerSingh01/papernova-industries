"use client";

import { useEffect, useState } from "react";

import { apiRequest } from "@/app/lib/api";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  message: string;
  status: string;
  createdAt: string;
}

const statuses = [
  "NEW",
  "CONTACTED",
  "QUOTED",
  "COMPLETED",
];

export default function InquiriesPage() {
  const [inquiries, setInquiries] =
    useState<Inquiry[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

  async function loadInquiries() {
    try {
      setLoading(true);

      const response =
        await apiRequest<{
          success: boolean;
          data: Inquiry[];
        }>("/api/admin/inquiries");

      setInquiries(response.data);
    } catch (error) {
      console.error(
        "Failed to load inquiries:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInquiries();
  }, []);

  async function updateStatus(
    id: string,
    status: string
  ) {
    try {
      setUpdatingId(id);

      await apiRequest(
        `/api/admin/inquiries/${id}`,
        {
          method: "PUT",

          body: JSON.stringify({
            status,
          }),
        }
      );

      setInquiries(
        (current) =>
          current.map((inquiry) =>
            inquiry.id === id
              ? {
                  ...inquiry,
                  status,
                }
              : inquiry
          )
      );
    } catch (error) {
      console.error(
        "Failed to update status:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update status."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  function getStatusClass(
    status: string
  ) {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-700";

      case "CONTACTED":
        return "bg-yellow-100 text-yellow-700";

      case "QUOTED":
        return "bg-purple-100 text-purple-700";

      case "COMPLETED":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Inquiries
        </h1>

        <p className="mt-3 text-gray-500">
          Loading inquiries...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold text-slate-900">
          Quote Inquiries
        </h1>

        <p className="mt-2 text-gray-500">
          Manage customer quote requests
          and inquiries.
        </p>

      </div>

      {/* Empty */}

      {inquiries.length === 0 ? (
        <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">

          <h2 className="text-xl font-semibold text-slate-900">
            No inquiries yet
          </h2>

          <p className="mt-2 text-gray-500">
            Customer quote requests will
            appear here.
          </p>

        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="p-4 text-left text-sm font-semibold">
                    Customer
                  </th>

                  <th className="p-4 text-left text-sm font-semibold">
                    Contact
                  </th>

                  <th className="p-4 text-left text-sm font-semibold">
                    Company
                  </th>

                  <th className="p-4 text-left text-sm font-semibold">
                    Message
                  </th>

                  <th className="p-4 text-left text-sm font-semibold">
                    Date
                  </th>

                  <th className="p-4 text-left text-sm font-semibold">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {inquiries.map(
                  (inquiry) => (
                    <tr
                      key={inquiry.id}
                      className="border-t hover:bg-slate-50"
                    >

                      {/* Customer */}

                      <td className="p-4 align-top">

                        <p className="font-semibold text-slate-900">
                          {inquiry.name}
                        </p>

                      </td>

                      {/* Contact */}

                      <td className="p-4 align-top">

                        <p className="text-sm text-slate-700">
                          {inquiry.email}
                        </p>

                        {inquiry.phone && (
                          <p className="mt-1 text-sm text-gray-500">
                            {inquiry.phone}
                          </p>
                        )}

                      </td>

                      {/* Company */}

                      <td className="p-4 align-top text-sm text-slate-700">
                        {inquiry.company ||
                          "—"}
                      </td>

                      {/* Message */}

                      <td className="max-w-sm p-4 align-top">

                        <p className="text-sm leading-6 text-slate-600">
                          {inquiry.message}
                        </p>

                      </td>

                      {/* Date */}

                      <td className="whitespace-nowrap p-4 align-top text-sm text-gray-500">

                        {new Date(
                          inquiry.createdAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}

                      </td>

                      {/* Status */}

                      <td className="p-4 align-top">

                        <div className="flex flex-col gap-2">

                          <span
                            className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                              inquiry.status
                            )}`}
                          >
                            {inquiry.status}
                          </span>

                          <select
                            value={
                              inquiry.status
                            }
                            disabled={
                              updatingId ===
                              inquiry.id
                            }
                            onChange={(
                              e
                            ) =>
                              updateStatus(
                                inquiry.id,
                                e.target
                                  .value
                              )
                            }
                            className="rounded-lg border border-slate-300 px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                          >

                            {statuses.map(
                              (
                                status
                              ) => (
                                <option
                                  key={
                                    status
                                  }
                                  value={
                                    status
                                  }
                                >
                                  {status}
                                </option>
                              )
                            )}

                          </select>

                        </div>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
}