"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

import { apiRequest } from "@/app/lib/api";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: string;
}

interface OrderResponse {
  success: boolean;
  message: string;
  data: {
    orderId: string;
    orderNumber: string;
    status: string;
    subtotal: number;
    shipping: number;
    total: number;
  };
}

export default function CheckoutPage() {
  const router = useRouter();

  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [user, setUser] =
    useState<CurrentUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [placingOrder, setPlacingOrder] =
    useState(false);

  const [orderNumber, setOrderNumber] =
    useState("");

  const [error, setError] =
    useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  /*
   * Load customer + cart
   */

  useEffect(() => {
    async function loadCheckout() {
      try {
        const token =
          localStorage.getItem(
            "accessToken"
          );

        if (!token) {
          router.replace("/login");
          return;
        }

        /*
         * Verify the logged-in user
         */

        const userResponse =
          await apiRequest<{
            success: boolean;
            data: CurrentUser;
          }>("/api/auth/me");

        if (
          userResponse.data.role !==
          "CUSTOMER"
        ) {
          alert(
            "Please login with a customer account."
          );

          router.replace("/login");
          return;
        }

        setUser(userResponse.data);

        /*
         * Load cart
         */

        const storedCart =
          localStorage.getItem("cart");

        if (!storedCart) {
          setCart([]);
          return;
        }

        try {
          const parsedCart =
            JSON.parse(storedCart);

          if (Array.isArray(parsedCart)) {
            setCart(parsedCart);
          } else {
            setCart([]);
          }
        } catch (cartError) {
          console.error(
            "Failed to parse cart:",
            cartError
          );

          setCart([]);
        }

        /*
         * Pre-fill customer information
         */

        setForm((current) => ({
          ...current,
          name: userResponse.data.name || "",
          phone:
            userResponse.data.phone || "",
        }));
      } catch (error) {
        console.error(
          "Failed to load checkout:",
          error
        );

        localStorage.removeItem(
          "accessToken"
        );

        localStorage.removeItem(
          "refreshToken"
        );

        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    loadCheckout();
  }, [router]);

  /*
   * Form change
   */

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  }

  /*
   * Totals
   */

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        item.quantity,
    0
  );

  const shipping = 0;

  const total =
    subtotal + shipping;

  /*
   * Place order
   */

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");

    /*
     * Check cart
     */

    if (cart.length === 0) {
      setError(
        "Your cart is empty."
      );
      return;
    }

    /*
     * Check authentication
     */

    const token =
      localStorage.getItem(
        "accessToken"
      );

    if (!token) {
      alert(
        "Please login as a customer before placing an order."
      );

      router.push("/login");
      return;
    }

    /*
     * Check customer
     */

    if (
      !user ||
      user.role !== "CUSTOMER"
    ) {
      alert(
        "Please login with a customer account."
      );

      router.push("/login");
      return;
    }

    /*
     * Validate shipping details
     */

    if (!form.name.trim()) {
      setError(
        "Please enter your full name."
      );
      return;
    }

    if (!form.phone.trim()) {
      setError(
        "Please enter your phone number."
      );
      return;
    }

    const phone =
      form.phone.replace(/\D/g, "");

    if (
      phone.length < 10 ||
      phone.length > 15
    ) {
      setError(
        "Please enter a valid phone number."
      );
      return;
    }

    if (!form.address.trim()) {
      setError(
        "Please enter your address."
      );
      return;
    }

    if (!form.city.trim()) {
      setError(
        "Please enter your city."
      );
      return;
    }

    if (!form.state.trim()) {
      setError(
        "Please enter your state."
      );
      return;
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      setError(
        "Please enter a valid 6-digit pincode."
      );
      return;
    }

    try {
      setPlacingOrder(true);

      /*
       * Create order
       */

      const response =
        await apiRequest<OrderResponse>(
          "/api/orders",
          {
            method: "POST",

            body: JSON.stringify({
              items: cart.map(
                (item) => ({
                  productId:
                    item.productId,

                  quantity:
                    item.quantity,
                })
              ),

              shippingName:
                form.name.trim(),

              shippingPhone:
                form.phone.trim(),

              shippingAddress:
                form.address.trim(),

              shippingCity:
                form.city.trim(),

              shippingState:
                form.state.trim(),

              shippingPincode:
                form.pincode.trim(),
            }),
          }
        );

      /*
       * Clear cart
       */

      localStorage.removeItem(
        "cart"
      );

      setCart([]);

      /*
       * Tell Navbar that cart changed
       */

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      /*
       * Show success
       */

      setOrderNumber(
        response.data.orderNumber
      );
    } catch (error) {
      console.error(
        "Failed to place order:",
        error
      );

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Failed to place order. Please try again."
        );
      }
    } finally {
      setPlacingOrder(false);
    }
  }

  /*
   * Loading
   */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-gray-500">
          Loading checkout...
        </p>
      </div>
    );
  }

  /*
   * Order successfully placed
   */

  if (orderNumber) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 max-w-lg w-full text-center">

          <div className="flex justify-center">

            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">

              <CheckCircle
                size={42}
                className="text-green-600"
              />

            </div>

          </div>

          <h1 className="text-3xl font-bold text-slate-900 mt-6">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-500 mt-3">
            Thank you for your order.
            We have received your
            request successfully.
          </p>

          <div className="mt-6 bg-slate-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Order Number
            </p>

            <p className="text-xl font-bold text-slate-900 mt-1">
              {orderNumber}
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">

            <Link
              href="/orders"
              className="inline-flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              View My Orders
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center border border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </div>
    );
  }

  /*
   * Empty cart
   */

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

        <div className="text-center">

          <h1 className="text-3xl font-bold text-slate-900">
            Your cart is empty
          </h1>

          <p className="text-gray-500 mt-3">
            Add some products before
            checking out.
          </p>

          <Link
            href="/#products"
            className="inline-flex items-center gap-2 mt-6 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
          >
            <ArrowLeft size={18} />
            Browse Products
          </Link>

        </div>

      </div>
    );
  }

  /*
   * Checkout
   */

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}

      <div className="bg-white border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-6 py-8">

          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-green-600 font-medium"
          >
            <ArrowLeft size={18} />
            Back to Cart
          </Link>

          <h1 className="text-4xl font-bold text-slate-900 mt-6">
            Checkout
          </h1>

          <p className="text-gray-500 mt-2">
            Enter your delivery details
            to place your order.
          </p>

        </div>

      </div>

      {/* Main */}

      <main className="max-w-7xl mx-auto px-6 py-10">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >

          {/* Shipping */}

          <div className="lg:col-span-2">

            <div className="bg-white rounded-2xl border border-slate-200 p-6">

              <h2 className="text-2xl font-bold text-slate-900">
                Delivery Information
              </h2>

              {error && (
                <div className="mt-5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              <div className="mt-6 space-y-5">

                {/* Name */}

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={
                      handleChange
                    }
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-green-600 focus:ring-4 focus:ring-green-100"
                    required
                  />

                </div>

                {/* Phone */}

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number
                  </label>

                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={
                      handleChange
                    }
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-green-600 focus:ring-4 focus:ring-green-100"
                    required
                  />

                </div>

                {/* Address */}

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={form.address}
                    onChange={
                      handleChange
                    }
                    rows={4}
                    placeholder="House number, street, area..."
                    className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-green-600 focus:ring-4 focus:ring-green-100"
                    required
                  />

                </div>

                {/* City / State */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      City
                    </label>

                    <input
                      name="city"
                      value={form.city}
                      onChange={
                        handleChange
                      }
                      placeholder="City"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-green-600 focus:ring-4 focus:ring-green-100"
                      required
                    />

                  </div>

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      State
                    </label>

                    <input
                      name="state"
                      value={form.state}
                      onChange={
                        handleChange
                      }
                      placeholder="State"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-green-600 focus:ring-4 focus:ring-green-100"
                      required
                    />

                  </div>

                </div>

                {/* Pincode */}

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Pincode
                  </label>

                  <input
                    name="pincode"
                    value={form.pincode}
                    onChange={
                      handleChange
                    }
                    placeholder="6-digit pincode"
                    inputMode="numeric"
                    maxLength={6}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-green-600 focus:ring-4 focus:ring-green-100"
                    required
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Order Summary */}

          <div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">

              <h2 className="text-2xl font-bold text-slate-900">
                Order Summary
              </h2>

              {/* Items */}

              <div className="mt-6 space-y-4">

                {cart.map((item) => (

                  <div
                    key={item.productId}
                    className="flex gap-3"
                  >

                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">

                      {item.imageUrl ? (
                        <img
                          src={
                            item.imageUrl
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}

                    </div>

                    <div className="flex-1">

                      <p className="font-semibold text-slate-900 line-clamp-2">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {item.quantity} × ₹
                        {Number(
                          item.price
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </div>

                    <p className="font-semibold text-slate-900">
                      ₹
                      {(
                        Number(
                          item.price
                        ) *
                        item.quantity
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>

                  </div>

                ))}

              </div>

              {/* Totals */}

              <div className="border-t border-slate-200 mt-6 pt-6 space-y-4">

                <div className="flex justify-between text-slate-600">

                  <span>
                    Subtotal
                  </span>

                  <span>
                    ₹
                    {subtotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                <div className="flex justify-between text-slate-600">

                  <span>
                    Shipping
                  </span>

                  <span className="text-green-600 font-medium">
                    Free
                  </span>

                </div>

               <div className="border-t border-slate-200 pt-4 flex justify-between">

  <span className="text-lg font-semibold text-slate-900">
    Total
  </span>

  <span className="text-2xl font-bold text-slate-900">
    ₹
    {total.toLocaleString("en-IN")}
  </span>

</div>
              </div>

              {/* Place Order */}

              <button
                type="submit"
                disabled={placingOrder}
                className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {placingOrder
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Your order will be created
                after you confirm the details
                above.
              </p>

            </div>

          </div>

        </form>

      </main>

    </div>
  );
}