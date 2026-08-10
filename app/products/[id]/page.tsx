"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingCart,
  Minus,
  Plus,
  CheckCircle,
} from "lucide-react";

import { apiRequest } from "@/app/lib/api";

interface Product {
  id: string;
  name: string;
  description?: string;
  sku: string;
  price: number | string;
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
  categoryId: string;

  category: {
    id: string;
    name: string;
  };

  images: {
    imageUrl: string;
    altText?: string | null;
  }[];
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export default function ProductDetailsPage() {
  const params = useParams();

  const productId = params.id as string;

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [quantity, setQuantity] =
    useState(1);

  const [selectedImage, setSelectedImage] =
    useState("");

  const [addedToCart, setAddedToCart] =
    useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        const response =
          await apiRequest<{
            success: boolean;
            data: Product;
          }>(
            `/api/products/${productId}`
          );

        setProduct(response.data);

        if (
          response.data.images &&
          response.data.images.length > 0
        ) {
          setSelectedImage(
            response.data.images[0].imageUrl
          );
        }
      } catch (error) {
        console.error(
          "Failed to load product:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  function increaseQuantity() {
    if (!product) return;

    if (quantity < product.stock) {
      setQuantity(
        (current) => current + 1
      );
    }
  }

  function decreaseQuantity() {
    setQuantity(
      (current) =>
        Math.max(1, current - 1)
    );
  }

  function handleAddToCart() {
    if (!product) return;

    if (product.stock <= 0) {
      alert(
        "This product is out of stock."
      );

      return;
    }

    const existingCart =
      localStorage.getItem("cart");

    let cart: CartItem[] = [];

    try {
      cart = existingCart
        ? JSON.parse(existingCart)
        : [];
    } catch {
      cart = [];
    }

    const existingItem = cart.find(
      (item) =>
        item.productId === product.id
    );

    if (existingItem) {
      existingItem.quantity = Math.min(
        existingItem.quantity + quantity,
        product.stock
      );
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: Number(product.price),
        imageUrl:
          product.images[0]?.imageUrl || "",
        quantity,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    // Tell Navbar that the cart changed
    window.dispatchEvent(
      new Event("cartUpdated")
    );

    // Show cart confirmation
    setAddedToCart(true);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg text-gray-500">
          Loading product...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Product Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            This product may have been removed
            or is no longer available.
          </p>

          <Link
            href="/#products"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-green-600 hover:text-green-700"
          >
            <ArrowLeft size={18} />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const mainImage =
    selectedImage ||
    product.images[0]?.imageUrl ||
    "/images/products/notebook.jpg";

  const totalPrice =
    Number(product.price) * quantity;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Back */}

      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 font-medium text-slate-600 hover:text-green-600"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>
      </div>

      {/* Product */}

      <main className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

          {/* Images */}

          <div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

              <div className="relative h-[500px]">

                <img
                  src={mainImage}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />

                {product.isFeatured && (
                  <span className="absolute left-5 top-5 rounded-full bg-yellow-500 px-4 py-2 text-sm font-semibold text-white">
                    ⭐ Featured
                  </span>
                )}

              </div>

            </div>

            {/* Image thumbnails */}

            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3">

                {product.images.map(
                  (image, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() =>
                        setSelectedImage(
                          image.imageUrl
                        )
                      }
                      className={`h-20 w-20 overflow-hidden rounded-lg border-2 ${
                        selectedImage ===
                        image.imageUrl
                          ? "border-green-600"
                          : "border-slate-200"
                      }`}
                    >
                      <img
                        src={image.imageUrl}
                        alt={
                          image.altText ||
                          product.name
                        }
                        className="h-full w-full object-cover"
                      />
                    </button>
                  )
                )}

              </div>
            )}

          </div>

          {/* Product Information */}

          <div className="flex flex-col justify-center">

            {/* Category */}

            <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              {product.category.name}
            </span>

            {/* Name */}

            <h1 className="mt-5 text-4xl font-bold text-slate-900">
              {product.name}
            </h1>

            {/* SKU */}

            <p className="mt-3 text-sm text-gray-500">
              SKU: {product.sku}
            </p>

            {/* Description */}

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {product.description ||
                "High-quality paper product designed to meet your everyday requirements."}
            </p>

            {/* Price */}

            <div className="mt-8">

              <span className="text-4xl font-bold text-slate-900">
                ₹
                {Number(
                  product.price
                ).toLocaleString("en-IN")}
              </span>

            </div>

            {/* Stock */}

            <div className="mt-5">

              {product.stock > 0 ? (
                <span className="font-semibold text-green-600">
                  ✓ In Stock ({product.stock}{" "}
                  available)
                </span>
              ) : (
                <span className="font-semibold text-red-600">
                  Out of Stock
                </span>
              )}

            </div>

            {/* Purchase */}

            {product.stock > 0 && (
              <div className="mt-8">

                <div className="flex items-center gap-4">

                  {/* Quantity */}

                  <div className="flex items-center overflow-hidden rounded-xl border border-slate-300">

                    <button
                      type="button"
                      onClick={
                        decreaseQuantity
                      }
                      className="p-3 hover:bg-slate-100"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="px-5 font-semibold">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={
                        increaseQuantity
                      }
                      className="p-3 hover:bg-slate-100"
                    >
                      <Plus size={18} />
                    </button>

                  </div>

                  {/* Add to Cart */}

                  <button
                    type="button"
                    onClick={
                      handleAddToCart
                    }
                    className={`flex flex-1 items-center justify-center gap-3 rounded-xl px-6 py-3 font-semibold text-white transition ${
                      addedToCart
                        ? "bg-green-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <CheckCircle
                          size={20}
                        />

                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart
                          size={20}
                        />

                        Add to Cart
                      </>
                    )}
                  </button>

                </div>

                {/* Go To Cart */}

                {addedToCart && (
                  <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div>
                        <p className="font-semibold text-green-800">
                          Product added to
                          your cart!
                        </p>

                        <p className="mt-1 text-sm text-green-700">
                          You can continue
                          shopping or proceed
                          to your cart.
                        </p>
                      </div>

                      <Link
                        href="/cart"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white transition hover:bg-green-700"
                      >
                        <ShoppingCart
                          size={18}
                        />

                        Go to Cart
                      </Link>

                    </div>

                  </div>
                )}

                {/* Total */}

                <div className="mt-5 flex justify-between rounded-xl border border-slate-200 bg-white p-4">

                  <span className="text-gray-600">
                    Total
                  </span>

                  <span className="text-xl font-bold">
                    ₹
                    {totalPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

              </div>
            )}

            <p className="mt-6 text-sm text-gray-500">
              You can browse products without
              logging in. Login is required when
              you are ready to complete your
              purchase.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}