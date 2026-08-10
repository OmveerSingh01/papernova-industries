"use client";

import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "@/app/lib/api";
import ProductModal from "@/components/admin/ProductModal";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Toast from "@/components/ui/Toast";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  sku: string;
  price: number;
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
  }[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  const [productToDelete, setProductToDelete] =
    useState<Product | null>(null);

  const [deleting, setDeleting] = useState(false);

  const [toast, setToast] = useState({
  show: false,
  message: "",
  type: "success" as "success" | "error" | "info",
});
  async function loadProducts() {
    try {
      const response = await apiRequest<{
        success: boolean;
        data: Product[];
      }>("/api/products");

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    try {
      const response = await apiRequest<{
        success: boolean;
        data: Category[];
      }>("/api/categories");

      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.sku
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "" ||
        product.categoryId === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

 async function deleteProduct() {
  if (!productToDelete) return;

  try {
    setDeleting(true);

    await apiRequest(
      `/api/products/${productToDelete.id}`,
      {
        method: "DELETE",
      }
    );

    setConfirmOpen(false);
    setProductToDelete(null);

    setToast({
      show: true,
      message: "Product deactivated successfully.",
      type: "success",
    });

    loadProducts();
  } catch (error) {
    console.error(error);

    setToast({
      show: true,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      type: "error",
    });
  } finally {
    setDeleting(false);
  }
}

  if (loading) {
    return (
      <h2 className="text-2xl font-semibold">
        Loading Products...
      </h2>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            Products
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your products
          </p>

        </div>

        <PrimaryButton
          onClick={() => {
            setSelectedProduct(null);
            setOpen(true);
          }}
        >
          + Add Product
        </PrimaryButton>

      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-5">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value)
            }
            className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">
              All Categories
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}

          </select>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Image
              </th>

              <th className="p-4 text-left">
                Product
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Price
              </th>

              <th className="p-4 text-left">
                Stock
              </th>

              <th className="p-4 text-left">
                Featured
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.map((product) => (

              <tr
                key={product.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">

                  <img
                    src={
                      product.images[0]?.imageUrl ??
                      "/placeholder.png"
                    }
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />

                </td>

                <td className="p-4 font-medium">
                  {product.name}
                </td>

                <td className="p-4">
                  {product.category.name}
                </td>

                <td className="p-4">
                  ₹{product.price}
                </td>

                <td className="p-4">
                  {product.stock}
                </td>

                <td className="p-4">

                  {product.isFeatured ? (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      Featured
                    </span>
                  ) : (
                    "-"
                  )}

                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      product.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>

                </td>

                <td className="p-4 flex gap-3">

                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setSelectedProduct(product);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => {
                      setProductToDelete(product);
                      setConfirmOpen(true);
                    }}
                  >
                    Deactivate
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <ProductModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedProduct(null);
        }}
        onSuccess={loadProducts}
        product={selectedProduct}
      />

      <ConfirmModal
        open={confirmOpen}
        title="Deactivate Product"
        message={`Are you sure you want to deactivate "${productToDelete?.name}"?`}
        confirmText="Deactivate"
        loading={deleting}
        onCancel={() => {
          setConfirmOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={deleteProduct}
      />

<Toast
  show={toast.show}
  message={toast.message}
  type={toast.type}
  onClose={() =>
    setToast((prev) => ({
      ...prev,
      show: false,
    }))
  }
/>
    </div>
  );
}