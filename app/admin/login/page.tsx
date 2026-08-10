"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { apiRequest } from "@/app/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await apiRequest<any>(
        "/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      // Only allow ADMIN into admin panel
      if (response.user?.role !== "ADMIN") {
        setError(
          "You do not have permission to access the admin panel."
        );
        return;
      }

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

      router.push("/admin/dashboard");

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid email or password.");
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

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold">
            PaperNova Admin
          </h1>

          <p className="text-gray-500 mt-2">
            Admin Panel Login
          </p>

        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        <label className="block text-sm font-medium mb-2">
          Email
        </label>

        <input
          className="w-full border p-3 rounded-xl mb-5 outline-none focus:ring-2 focus:ring-green-500"
          type="email"
          placeholder="Admin email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <label className="block text-sm font-medium mb-2">
          Password
        </label>

        <input
          className="w-full border p-3 rounded-xl mb-6 outline-none focus:ring-2 focus:ring-green-500"
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded-xl font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {loading
            ? "Logging in..."
            : "Admin Login"}
        </button>

      </form>

    </div>
  );
}