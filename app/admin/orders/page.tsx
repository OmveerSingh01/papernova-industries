"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/app/lib/api";

interface OrderItem {
  id: string;
  productName: string;
  price: number | string;
  quantity: number;
  subtotal: number | string;

  product?: {
    id: string;
    name: string;
    sku: string;
    images: {
      imageUrl: string;
    }[];
  };
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;

  subtotal: number | string;
  shipping: number | string;
  total: number | string;

  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPincode: string;

  createdAt: string;

  user: Customer;

  items: OrderItem[];
}

const statuses = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [expandedOrder, setExpandedOrder] =
    useState<string | null>(null);

  const [updatingOrder, setUpdatingOrder] =
    useState<string | null>(null);

  async function loadOrders() {
    try {
      const response =
        await apiRequest<{
          success: boolean;
          data: Order[];
        }>("/api/admin/orders");

      setOrders(response.data);
    } catch (error) {
      console.error(
        "Failed to load orders:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function updateStatus(
    orderId: string,
    status: string
  ) {
    try {
      setUpdatingOrder(orderId);

      await apiRequest(
        `/api/admin/orders/${orderId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status,
          }),
        }
      );

      await loadOrders();
    } catch (error) {
      console.error(
        "Failed to update order:",
        error
      );

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(
          "Failed to update order status."
        );
      }
    } finally {
      setUpdatingOrder(null);
    }
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }
    );
  }

  function formatStatus(status: string) {
    return status
      .toLowerCase()
      .replace(
        /(^|\s)\S/g,
        (letter) =>
          letter.toUpperCase()
      );
  }

  function getStatusStyle(status: string) {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";

      case "PROCESSING":
        return "bg-purple-100 text-purple-700";

      case "SHIPPED":
        return "bg-indigo-100 text-indigo-700";

      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-semibold">
          Loading Orders...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold text-slate-900">
          Orders
        </h1>

        <p className="text-gray-500 mt-2">
          Manage customer orders and update
          their status.
        </p>

      </div>

      {/* Empty */}

      {orders.length === 0 ? (

        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">

          <h2 className="text-2xl font-bold text-slate-900">
            No Orders Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Customer orders will appear here
            after they place an order.
          </p>

        </div>

      ) : (

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="text-left p-4">
                    Order
                  </th>

                  <th className="text-left p-4">
                    Customer
                  </th>

                  <th className="text-left p-4">
                    Date
                  </th>

                  <th className="text-left p-4">
                    Items
                  </th>

                  <th className="text-left p-4">
                    Total
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>

                  <th className="text-left p-4">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {orders.map((order) => {

                  const isExpanded =
                    expandedOrder ===
                    order.id;

                  return (
                    <tr
                      key={order.id}
                      className="border-t align-top"
                    >

                      {/* Order */}

                      <td className="p-4">

                        <button
                          type="button"
                          onClick={() =>
                            setExpandedOrder(
                              isExpanded
                                ? null
                                : order.id
                            )
                          }
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          {order.orderNumber}
                        </button>

                        <p className="text-xs text-gray-500 mt-1">
                          {order.id}
                        </p>

                      </td>

                      {/* Customer */}

                      <td className="p-4">

                        <p className="font-medium">
                          {order.user.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {order.user.email}
                        </p>

                        {order.user.phone && (
                          <p className="text-sm text-gray-500">
                            {order.user.phone}
                          </p>
                        )}

                      </td>

                      {/* Date */}

                      <td className="p-4 text-sm">
                        {formatDate(
                          order.createdAt
                        )}
                      </td>

                      {/* Items */}

                      <td className="p-4">

                        <span className="bg-slate-100 px-3 py-1 rounded-full text-sm">
                          {order.items.reduce(
                            (
                              total,
                              item
                            ) =>
                              total +
                              item.quantity,
                            0
                          )}{" "}
                          items
                        </span>

                      </td>

                      {/* Total */}

                      <td className="p-4 font-semibold">

                        ₹
                        {Number(
                          order.total
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </td>

                      {/* Status */}

                      <td className="p-4">

                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {formatStatus(
                            order.status
                          )}
                        </span>

                      </td>

                      {/* Actions */}

                      <td className="p-4">

                        <select
                          value={
                            order.status
                          }
                          disabled={
                            updatingOrder ===
                            order.id
                          }
                          onChange={(e) =>
                            updateStatus(
                              order.id,
                              e.target.value
                            )
                          }
                          className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                        >

                          {statuses.map(
                            (status) => (
                              <option
                                key={status}
                                value={status}
                              >
                                {formatStatus(
                                  status
                                )}
                              </option>
                            )
                          )}

                        </select>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </div>
      )}

      {/* Expanded Order Details */}

      {expandedOrder && (

        <div className="bg-white rounded-2xl border border-gray-200 p-6">

          {(() => {
            const order =
              orders.find(
                (item) =>
                  item.id ===
                  expandedOrder
              );

            if (!order) return null;

            return (
              <div>

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-bold text-slate-900">
                      Order Details
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {order.orderNumber}
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setExpandedOrder(
                        null
                      )
                    }
                    className="text-gray-500 hover:text-black"
                  >
                    Close
                  </button>

                </div>

                {/* Customer + Address */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                  <div className="bg-slate-50 rounded-xl p-5">

                    <h3 className="font-semibold text-lg">
                      Customer
                    </h3>

                    <div className="mt-3 space-y-1 text-gray-600">

                      <p>
                        <strong>
                          Name:
                        </strong>{" "}
                        {order.user.name}
                      </p>

                      <p>
                        <strong>
                          Email:
                        </strong>{" "}
                        {order.user.email}
                      </p>

                      <p>
                        <strong>
                          Phone:
                        </strong>{" "}
                        {order.user.phone ||
                          order.shippingPhone}
                      </p>

                    </div>

                  </div>

                  <div className="bg-slate-50 rounded-xl p-5">

                    <h3 className="font-semibold text-lg">
                      Shipping Address
                    </h3>

                    <div className="mt-3 text-gray-600 leading-7">

                      <p>
                        {
                          order.shippingName
                        }
                      </p>

                      <p>
                        {
                          order.shippingPhone
                        }
                      </p>

                      <p>
                        {
                          order.shippingAddress
                        }
                      </p>

                      <p>
                        {
                          order.shippingCity
                        }
                        ,{" "}
                        {
                          order.shippingState
                        }
                      </p>

                      <p>
                        Pincode:{" "}
                        {
                          order.shippingPincode
                        }
                      </p>

                    </div>

                  </div>

                </div>

                {/* Items */}

                <div className="mt-8">

                  <h3 className="text-lg font-semibold mb-4">
                    Order Items
                  </h3>

                  <div className="space-y-3">

                    {order.items.map(
                      (item) => (

                        <div
                          key={item.id}
                          className="flex items-center gap-4 border rounded-xl p-4"
                        >

                          {/* Image */}

                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">

                            {item.product
                              ?.images?.[0]
                              ?.imageUrl ? (

                              <img
                                src={
                                  item
                                    .product
                                    .images[0]
                                    .imageUrl
                                }
                                alt={
                                  item.productName
                                }
                                className="w-full h-full object-cover"
                              />

                            ) : (

                              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                No Image
                              </div>

                            )}

                          </div>

                          {/* Info */}

                          <div className="flex-1">

                            <p className="font-semibold">
                              {
                                item.productName
                              }
                            </p>

                            {item.product && (
                              <p className="text-sm text-gray-500">
                                SKU:{" "}
                                {
                                  item.product
                                    .sku
                                }
                              </p>
                            )}

                            <p className="text-sm text-gray-500">
                              ₹
                              {Number(
                                item.price
                              ).toLocaleString(
                                "en-IN"
                              )}{" "}
                              ×{" "}
                              {
                                item.quantity
                              }
                            </p>

                          </div>

                          {/* Subtotal */}

                          <p className="font-bold">
                            ₹
                            {Number(
                              item.subtotal
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </p>

                        </div>

                      )
                    )}

                  </div>

                </div>

                {/* Summary */}

                <div className="flex justify-end mt-6">

                  <div className="w-full md:w-80 space-y-3">

                    <div className="flex justify-between text-gray-600">

                      <span>
                        Subtotal
                      </span>

                      <span>
                        ₹
                        {Number(
                          order.subtotal
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </div>

                    <div className="flex justify-between text-gray-600">

                      <span>
                        Shipping
                      </span>

                      <span>
                        ₹
                        {Number(
                          order.shipping
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </div>

                    <div className="border-t pt-3 flex justify-between">

                      <span className="font-semibold">
                        Total
                      </span>

                      <span className="text-xl font-bold">
                        ₹
                        {Number(
                          order.total
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </div>

                  </div>

                </div>

              </div>
            );
          })()}

        </div>

      )}

    </div>
  );
}