"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
} from "lucide-react";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  function loadCart() {
    const storedCart =
      localStorage.getItem("cart");

    if (!storedCart) {
      setCart([]);
      setLoaded(true);
      return;
    }

    try {
      const parsedCart = JSON.parse(
        storedCart
      );

      setCart(
        Array.isArray(parsedCart)
          ? parsedCart
          : []
      );
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error
      );

      setCart([]);
    }

    setLoaded(true);
  }

  function saveCart(updatedCart: CartItem[]) {
    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  }

  function increaseQuantity(
    productId: string
  ) {
    const updatedCart = cart.map((item) => {
      if (item.productId !== productId) {
        return item;
      }

      return {
        ...item,
        quantity: item.quantity + 1,
      };
    });

    saveCart(updatedCart);
  }

  function decreaseQuantity(
    productId: string
  ) {
    const updatedCart = cart
      .map((item) => {
        if (item.productId !== productId) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity - 1,
        };
      })
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  }

  function removeItem(
    productId: string
  ) {
    const updatedCart = cart.filter(
      (item) =>
        item.productId !== productId
    );

    saveCart(updatedCart);
  }

  function clearCart() {
    setCart([]);

    localStorage.removeItem("cart");
  }

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  if (!loaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-gray-500">
          Loading cart...
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

            Continue Shopping
          </Link>

          <div className="flex items-center justify-between mt-6">

            <div>

              <h1 className="text-4xl font-bold text-slate-900">
                Shopping Cart
              </h1>

              <p className="text-gray-500 mt-2">
                {totalItems}{" "}
                {totalItems === 1
                  ? "item"
                  : "items"}{" "}
                in your cart
              </p>

            </div>

            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Clear Cart
              </button>
            )}

          </div>

        </div>

      </div>

      {/* Cart */}

      <main className="max-w-7xl mx-auto px-6 py-10">

        {cart.length === 0 ? (

          /* Empty Cart */

          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">

            <div className="flex justify-center mb-5">

              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">

                <ShoppingCart
                  size={36}
                  className="text-green-600"
                />

              </div>

            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mt-2">
              Browse our products and add
              something you like.
            </p>

            <Link
              href="/#products"
              className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Browse Products
            </Link>

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Cart Items */}

            <div className="lg:col-span-2 space-y-4">

              {cart.map((item) => (

                <div
                  key={item.productId}
                  className="bg-white rounded-2xl border border-slate-200 p-5"
                >

                  <div className="flex gap-5">

                    {/* Image */}

                    <div className="w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">

                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}

                    </div>

                    {/* Details */}

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>

                          <h2 className="text-xl font-semibold text-slate-900">
                            {item.name}
                          </h2>

                          <p className="text-gray-500 mt-1">
                            ₹
                            {Number(
                              item.price
                            ).toLocaleString(
                              "en-IN"
                            )}{" "}
                            each
                          </p>

                        </div>

                        <button
                          onClick={() =>
                            removeItem(
                              item.productId
                            )
                          }
                          className="text-gray-400 hover:text-red-600 transition"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2
                            size={20}
                          />
                        </button>

                      </div>

                      {/* Quantity + Price */}

                      <div className="flex items-center justify-between mt-6">

                        <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">

                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item.productId
                              )
                            }
                            className="p-2.5 hover:bg-slate-100"
                          >
                            <Minus
                              size={17}
                            />
                          </button>

                          <span className="px-5 font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.productId
                              )
                            }
                            className="p-2.5 hover:bg-slate-100"
                          >
                            <Plus
                              size={17}
                            />
                          </button>

                        </div>

                        <p className="text-xl font-bold text-slate-900">
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

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* Summary */}

            <div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">

                <h2 className="text-2xl font-bold text-slate-900">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">

                  <div className="flex justify-between text-slate-600">

                    <span>
                      Items
                    </span>

                    <span>
                      {totalItems}
                    </span>

                  </div>

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

                    <span>
                      Calculated at checkout
                    </span>

                  </div>

                </div>

                <div className="border-t border-slate-200 mt-6 pt-6">

                  <div className="flex justify-between items-center">

                    <span className="text-lg font-semibold">
                      Total
                    </span>

                    <span className="text-2xl font-bold">
                      ₹
                      {subtotal.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                </div>

                <Link
                  href="/checkout"
                  className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center hover:bg-green-700 transition"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/#products"
                  className="mt-3 w-full border border-slate-300 text-slate-700 py-3 rounded-xl font-semibold flex items-center justify-center hover:bg-slate-50 transition"
                >
                  Continue Shopping
                </Link>

              </div>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}