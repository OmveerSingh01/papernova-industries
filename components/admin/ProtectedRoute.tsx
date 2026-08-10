"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface JwtPayload {
  id?: string;
  email?: string;
  role?: string;
  exp?: number;
}

function getTokenPayload(
  token: string
): JwtPayload | null {
  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(
      atob(
        parts[1]
          .replace(/-/g, "+")
          .replace(/_/g, "/")
      )
    );

    return payload;
  } catch {
    return null;
  }
}

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] =
    useState(true);

  useEffect(() => {
    // IMPORTANT:
    // Do not protect the admin login page.
    if (pathname === "/admin/login") {
      setChecking(false);
      return;
    }

    const token =
      localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    const payload =
      getTokenPayload(token);

    if (!payload) {
      localStorage.removeItem(
        "accessToken"
      );
      localStorage.removeItem(
        "refreshToken"
      );

      router.replace("/admin/login");
      return;
    }

    // Token expired
    if (
      payload.exp &&
      payload.exp * 1000 <= Date.now()
    ) {
      localStorage.removeItem(
        "accessToken"
      );
      localStorage.removeItem(
        "refreshToken"
      );

      router.replace("/admin/login");
      return;
    }

    // Only ADMIN can access admin pages
    if (payload.role !== "ADMIN") {
      router.replace("/login");
      return;
    }

    setChecking(false);
  }, [pathname, router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">
          Checking authentication...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}