"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  CalendarDays,
  Package,
  LogOut,
} from "lucide-react";

import { apiRequest } from "@/app/lib/api";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export default function AccountPage() {
  const [user, setUser] = useState<UserData | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAccount() {
      const token =
        localStorage.getItem("accessToken");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const response =
          await apiRequest<{
            success: boolean;
            data: UserData;
          }>("/api/auth/me");

        if (response.data.role !== "CUSTOMER") {
          window.location.href =
            "/admin/dashboard";
          return;
        }

        setUser(response.data);
      } catch (error) {
        console.error(
          "Failed to load account:",
          error
        );

        localStorage.removeItem(
          "accessToken"
        );
        localStorage.removeItem(
          "refreshToken"
        );

        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    }

    loadAccount();
  }, []);

  function handleLogout() {
    localStorage.removeItem(
      "accessToken"
    );

    localStorage.removeItem(
      "refreshToken"
    );

    window.location.href = "/";
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-gray-500">
          Loading account...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}

      <div className="bg-white border-b border-slate-200">

        <div className="max-w-5xl mx-auto px-6 py-8">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-green-600 font-medium"
          >
            <ArrowLeft size={18} />
            Back to Store
          </Link>

          <h1 className="text-4xl font-bold text-slate-900 mt-6">
            My Account
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your PaperNova account.
          </p>

        </div>

      </div>

      {/* Content */}

      <main className="max-w-5xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Profile Card */}

          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8">

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">

                <User
                  size={38}
                  className="text-green-600"
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  {user.name}
                </h2>

                <p className="text-gray-500 mt-1">
                  Customer Account
                </p>

              </div>

            </div>

            {/* Details */}

            <div className="mt-8 space-y-5">

              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">

                <Mail
                  size={21}
                  className="text-green-600"
                />

                <div>

                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <p className="font-semibold text-slate-900">
                    {user.email}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">

                <Phone
                  size={21}
                  className="text-green-600"
                />

                <div>

                  <p className="text-sm text-gray-500">
                    Phone
                  </p>

                  <p className="font-semibold text-slate-900">
                    {user.phone ||
                      "Not provided"}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <CalendarDays
                  size={21}
                  className="text-green-600"
                />

                <div>

                  <p className="text-sm text-gray-500">
                    Member Since
                  </p>

                  <p className="font-semibold text-slate-900">
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Quick Actions */}

          <div className="bg-white rounded-2xl border border-slate-200 p-6">

            <h2 className="text-xl font-bold text-slate-900">
              Quick Actions
            </h2>

            <div className="mt-5 space-y-3">

              <Link
                href="/orders"
                className="flex items-center gap-3 w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 hover:border-green-300 hover:bg-green-50 hover:text-green-700 transition"
              >
                <Package size={20} />
                My Orders
              </Link>

              <Link
                href="/cart"
                className="flex items-center gap-3 w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 hover:border-green-300 hover:bg-green-50 hover:text-green-700 transition"
              >
                🛒
                My Cart
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-600 hover:bg-red-50 transition"
              >
                <LogOut size={20} />
                Logout
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}