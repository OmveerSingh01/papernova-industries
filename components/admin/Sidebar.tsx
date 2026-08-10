"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  FolderOpen,
  Package,
  ShoppingCart,
  Users,
  Mail,
  LogOut,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: FolderOpen,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Inquiries",
    href: "/admin/inquiries",
    icon: Mail,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-64 flex-col bg-gray-900 text-white">

      {/* Header */}

      <div className="border-b border-gray-700 p-6">

        <h1 className="text-2xl font-bold">
          PaperNova
        </h1>

        <p className="text-sm text-gray-400">
          Admin Panel
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4">

        {menu.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            pathname.startsWith(
              `${item.href}/`
            );

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`mb-2 flex items-center gap-3 rounded-lg p-3 transition ${
                isActive
                  ? "bg-white text-black"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={20} />

              <span>
                {item.name}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* Logout */}

      <button
        type="button"
        onClick={() => {
          localStorage.removeItem(
            "accessToken"
          );

          localStorage.removeItem(
            "refreshToken"
          );

          window.location.href =
            "/admin/login";
        }}
        className="flex items-center gap-3 border-t border-gray-700 p-5 text-gray-300 transition hover:bg-gray-800 hover:text-white"
      >
        <LogOut size={20} />

        Logout
      </button>

    </aside>
  );
}