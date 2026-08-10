"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { apiRequest } from "@/app/lib/api";

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  price: number | string;
  quantity: number;
  subtotal: number | string;

  product?: {
    images?: {
      imageUrl: string;
    }[];
  };
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

  items: OrderItem[];

  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [expandedOrder, setExpandedOrder] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const token =
          localStorage.getItem("accessToken");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response =
          await apiRequest<{
            success: boolean;
            data: Order[];
          }>("/api/orders/my");

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

    loadOrders();
  }, []);

  function toggleOrder(orderId: string) {
    setExpandedOrder((current) =>
      current === orderId
        ? null
        : orderId
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

  function formatStatus(status: string) {
    return status
      .toLowerCase()
      .replace(
        /(^|\s)\S/g,
        (letter) =>
          letter.toUpperCase()
      );
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-gray-500">
          Loading your orders...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}

      <div className="bg-white border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-6 py-8">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-green-600 font-medium"
          >
            <ArrowLeft size={18} />

            Back to Store
          </Link>

          <div className="flex items-center gap-4 mt-6">

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Package
                size={25}
                className="text-green-600"
              />
            </div>

            <div>

              <h1 className="text-4xl font-bold text-slate-900">
                My Orders
              </h1>

              <p className="text-gray-500 mt-1">
                View your order history and
                track your purchases.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Orders */}

      <main className="max-w-7xl mx-auto px-6 py-10">

        {orders.length === 0 ? (

          /* Empty Orders */

          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">

            <div className="flex justify-center mb-5">

              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">

                <Package
                  size={36}
                  className="text-green-600"
                />

              </div>

            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              No orders yet
            </h2>

            <p className="text-gray-500 mt-2">
              Your completed orders will appear
              here.
            </p>

            <Link
              href="/#products"
              className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Start Shopping
            </Link>

          </div>

        ) : (

          <div className="space-y-5">

            {orders.map((order) => {

              const isExpanded =
                expandedOrder === order.id;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
                >

                  {/* Order Header */}

                  <button
                    type="button"
                    onClick={() =>
                      toggleOrder(order.id)
                    }
                    className="w-full text-left p-6 hover:bg-slate-50 transition"
                  >

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                      <div>

                        <p className="text-sm text-gray-500">
                          Order Number
                        </p>

                        <h2 className="text-lg font-bold text-slate-900 mt-1">
                          {order.orderNumber}
                        </h2>

                        <p className="text-sm text-gray-500 mt-2">
                          {formatDate(
                            order.createdAt
                          )}
                        </p>

                      </div>

                      <div className="flex items-center gap-6">

                        <div>

                          <p className="text-sm text-gray-500">
                            Total
                          </p>

                          <p className="text-xl font-bold text-slate-900">
                            ₹
                            {Number(
                              order.total
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </p>

                        </div>

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {formatStatus(
                            order.status
                          )}
                        </span>

                        {isExpanded ? (
                          <ChevronUp
                            size={22}
                            className="text-gray-500"
                          />
                        ) : (
                          <ChevronDown
                            size={22}
                            className="text-gray-500"
                          />
                        )}

                      </div>

                    </div>

                  </button>

                  {/* Expanded Order */}

                  {isExpanded && (

                    <div className="border-t border-slate-200 p-6">

                      {/* Items */}

                      <h3 className="text-lg font-bold text-slate-900 mb-4">
                        Order Items
                      </h3>

                      <div className="space-y-4">

                        {order.items.map(
                          (item) => (

                            <div
                              key={item.id}
                              className="flex gap-4 p-4 bg-slate-50 rounded-xl"
                            >

                              {/* Image */}

                              <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0">

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

                                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                    No Image
                                  </div>

                                )}

                              </div>

                              {/* Item Info */}

                              <div className="flex-1">

                                <h4 className="font-semibold text-slate-900">
                                  {
                                    item.productName
                                  }
                                </h4>

                                <p className="text-sm text-gray-500 mt-1">
                                  Quantity:{" "}
                                  {
                                    item.quantity
                                  }
                                </p>

                                <p className="text-sm text-gray-500">
                                  ₹
                                  {Number(
                                    item.price
                                  ).toLocaleString(
                                    "en-IN"
                                  )}{" "}
                                  each
                                </p>

                              </div>

                              {/* Item Total */}

                              <div className="font-bold text-slate-900">
                                ₹
                                {Number(
                                  item.subtotal
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </div>

                            </div>

                          )
                        )}

                      </div>

                      {/* Shipping */}

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                        <div>

                          <h3 className="text-lg font-bold text-slate-900 mb-3">
                            Delivery Address
                          </h3>

                          <div className="bg-slate-50 rounded-xl p-4 text-gray-600 leading-7">

                            <p className="font-semibold text-slate-900">
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

                        {/* Summary */}

                        <div>

                          <h3 className="text-lg font-bold text-slate-900 mb-3">
                            Order Summary
                          </h3>

                          <div className="bg-slate-50 rounded-xl p-4 space-y-3">

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

                            <div className="border-t border-slate-200 pt-3 flex justify-between">

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

                    </div>

                  )}

                </div>
              );
            })}

          </div>

        )}

      </main>

    </div>
  );
}