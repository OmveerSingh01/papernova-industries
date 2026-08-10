"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/app/lib/api";
import DashboardCard from "@/components/admin/DashboardCard";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: {
    name: string;
  };
  images: {
    imageUrl: string;
  }[];
}

interface Category {
  id: string;
  name: string;
}

interface DashboardData {
  totalProducts: number;
  totalCategories: number;
  featuredProducts: number;
  activeProducts: number;
  recentProducts: Product[];
  recentCategories: Category[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await apiRequest<{
          success: boolean;
          data: DashboardData;
        }>("/api/dashboard");

        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <h2 className="text-2xl font-semibold">
        Loading Dashboard...
      </h2>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here's an overview of your store.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <DashboardCard
          title="Products"
          value={data?.totalProducts ?? 0}
          icon="📦"
          color="bg-blue-100"
        />

        <DashboardCard
          title="Categories"
          value={data?.totalCategories ?? 0}
          icon="📂"
          color="bg-green-100"
        />

        <DashboardCard
          title="Featured"
          value={data?.featuredProducts ?? 0}
          icon="⭐"
          color="bg-yellow-100"
        />

        <DashboardCard
          title="Active Products"
          value={data?.activeProducts ?? 0}
          icon="🟢"
          color="bg-emerald-100"
        />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

          <h2 className="text-xl font-semibold mb-5">
            Recent Products
          </h2>

          <div className="space-y-4">

            {data?.recentProducts.length === 0 ? (
              <p className="text-gray-500">
                No products available.
              </p>
            ) : (
              data?.recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-4">

                    <img
                      src={
                        product.images[0]?.imageUrl ??
                        "/placeholder.png"
                      }
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover border"
                    />

                    <div>
                      <h3 className="font-semibold">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {product.category.name}
                      </p>
                    </div>

                  </div>

                  <div className="text-right">

                    <p className="font-semibold">
                      ₹{product.price}
                    </p>

                    <p className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </p>

                  </div>

                </div>
              ))
            )}

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

          <h2 className="text-xl font-semibold mb-5">
            Recent Categories
          </h2>

          <div className="space-y-3">

            {data?.recentCategories.length === 0 ? (
              <p className="text-gray-500">
                No categories available.
              </p>
            ) : (
              data?.recentCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <span className="font-medium">
                    📂 {category.name}
                  </span>
                </div>
              ))
            )}

          </div>

        </div>

      </div>

    </div>
  );
}