"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { apiRequest } from "@/app/lib/api";

interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "CUSTOMER";
  };
}

export default function CustomerLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response =
        await apiRequest<LoginResponse>(
          "/api/auth/login",
          {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

      /*
       * CUSTOMER LOGIN ONLY
       *
       * Admin credentials are not allowed
       * on this page.
       */
      if (response.user.role !== "CUSTOMER") {
        setError(
          "This login is only for customers. Please use the admin login."
        );

        return;
      }

      // Save customer authentication
      localStorage.setItem(
        "accessToken",
        response.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        response.refreshToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      // Customer goes to storefront
      router.push("/");

    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Invalid email or password."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8"
      >

        {/* Header */}

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-slate-900">
            PaperNova
          </h1>

          <p className="text-gray-500 mt-2">
            Customer Login
          </p>

        </div>

        {/* Error */}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        {/* Email */}

        <label className="block text-sm font-medium mb-2">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded-xl mb-5 outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        {/* Password */}

        <label className="block text-sm font-medium mb-2">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 rounded-xl mb-6 outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        {/* Login */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded-xl font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        {/* Register */}

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{" "}

          <button
            type="button"
            onClick={() =>
              router.push("/register")
            }
            className="text-green-600 font-medium hover:underline"
          >
            Create Account
          </button>
        </p>

      </form>

    </div>
  );
}