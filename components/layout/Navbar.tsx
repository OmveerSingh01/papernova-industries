"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ShoppingCart,
  Package,
  LogOut,
  User,
} from "lucide-react";

import Logo from "@/components/common/Logo";
import PrimaryButton from "@/components/ui/PrimaryButton";

const navLinks = [
  {
    name: "Home",
    href: "/#",
  },
  {
    name: "About",
    href: "/#about",
  },
  {
    name: "Products",
    href: "/#products",
  },
  {
    name: "Gallery",
    href: "/#gallery",
  },
  {
    name: "Contact",
    href: "/#contact",
  },
];

interface UserInfo {
  id: string;
  email: string;
  role: string;
}

function getUserFromToken(): UserInfo | null {
  try {
    const token =
      localStorage.getItem("accessToken");

    if (!token) {
      return null;
    }

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

    if (
      !payload.id ||
      !payload.email ||
      !payload.role
    ) {
      return null;
    }

    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
  } catch (error) {
    console.error(
      "Failed to read authentication token:",
      error
    );

    return null;
  }
}

export default function Navbar() {
  const [isOpen, setIsOpen] =
    useState(false);

  const [user, setUser] =
    useState<UserInfo | null>(null);

  const [cartCount, setCartCount] =
    useState(0);

  useEffect(() => {
    function loadAuthState() {
      const currentUser =
        getUserFromToken();

      if (
        currentUser &&
        currentUser.role === "CUSTOMER"
      ) {
        setUser(currentUser);
      } else {
        setUser(null);
      }

      const storedCart =
        localStorage.getItem("cart");

      if (!storedCart) {
        setCartCount(0);
        return;
      }

      try {
        const cart = JSON.parse(
          storedCart
        );

        if (Array.isArray(cart)) {
          const count = cart.reduce(
            (
              total: number,
              item: {
                quantity?: number;
              }
            ) =>
              total +
              Number(item.quantity || 0),
            0
          );

          setCartCount(count);
        } else {
          setCartCount(0);
        }
      } catch {
        setCartCount(0);
      }
    }

    loadAuthState();

    window.addEventListener(
      "storage",
      loadAuthState
    );

    window.addEventListener(
      "cartUpdated",
      loadAuthState
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadAuthState
      );

      window.removeEventListener(
        "cartUpdated",
        loadAuthState
      );
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem(
      "accessToken"
    );

    localStorage.removeItem(
      "refreshToken"
    );

    setUser(null);
    setCartCount(0);
    setIsOpen(false);

    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">

      {/* Main Navbar */}

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}

        <Link
          href="/"
          onClick={() =>
            setIsOpen(false)
          }
        >
          <Logo />
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 md:flex">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative text-sm font-semibold text-slate-700 transition hover:text-green-600"
            >
              {link.name}

              <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-green-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

        </nav>

        {/* Desktop Actions */}

        <div className="hidden items-center gap-2 md:flex">

          {user ? (
            <>
              {/* Account */}

              <Link
                href="/account"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-600"
              >
                <User size={19} />

                Account
              </Link>

              {/* Orders */}

              <Link
                href="/orders"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-600"
              >
                <Package size={19} />

                Orders
              </Link>

              {/* Cart */}

              <Link
                href="/cart"
                className="relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-600"
              >
                <ShoppingCart size={19} />

                Cart

                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Request Quote */}

              <Link href="/#contact">
                <PrimaryButton>
                  Request Quote
                </PrimaryButton>
              </Link>

              {/* Logout */}

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={18} />

                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}

              <Link
                href="/login"
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-600"
              >
                Login
              </Link>

              {/* Register */}

              <Link
                href="/register"
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-600"
              >
                Register
              </Link>

              {/* Request Quote */}

              <Link href="/#contact">
                <PrimaryButton>
                  Request Quote
                </PrimaryButton>
              </Link>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}

        <button
          type="button"
          onClick={() =>
            setIsOpen(!isOpen)
          }
          className="rounded-lg p-2 transition hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X
              size={26}
              className="text-slate-700"
            />
          ) : (
            <Menu
              size={26}
              className="text-slate-700"
            />
          )}
        </button>

      </div>

      {/* Mobile Menu */}

      <div
        className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 md:hidden ${
          isOpen
            ? "max-h-[800px]"
            : "max-h-0"
        }`}
      >

        <nav className="flex flex-col px-6 py-4">

          {/* Main Links */}

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() =>
                setIsOpen(false)
              }
              className="rounded-lg px-3 py-3 font-medium text-slate-700 transition hover:bg-slate-100 hover:text-green-600"
            >
              {link.name}
            </Link>
          ))}

          {/* Customer Menu */}

          {user ? (
            <>
              {/* Customer Info */}

              <div className="mt-3 border-t border-slate-200 pt-4">

                <div className="flex items-center gap-3 px-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">

                    <User
                      size={20}
                      className="text-green-600"
                    />

                  </div>

                  <div className="min-w-0">

                    <p className="text-xs text-gray-500">
                      Welcome
                    </p>

                    <p className="truncate font-semibold text-slate-900">
                      {user.email}
                    </p>

                  </div>

                </div>

              </div>

              {/* Account */}

              <Link
                href="/account"
                onClick={() =>
                  setIsOpen(false)
                }
                className="mt-3 flex items-center gap-3 rounded-lg px-3 py-3 font-medium text-slate-700 transition hover:bg-slate-100 hover:text-green-600"
              >
                <User size={20} />

                My Account
              </Link>

              {/* Orders */}

              <Link
                href="/orders"
                onClick={() =>
                  setIsOpen(false)
                }
                className="flex items-center gap-3 rounded-lg px-3 py-3 font-medium text-slate-700 transition hover:bg-slate-100 hover:text-green-600"
              >
                <Package size={20} />

                My Orders
              </Link>

              {/* Cart */}

              <Link
                href="/cart"
                onClick={() =>
                  setIsOpen(false)
                }
                className="flex items-center justify-between rounded-lg px-3 py-3 font-medium text-slate-700 transition hover:bg-slate-100 hover:text-green-600"
              >

                <span className="flex items-center gap-3">

                  <ShoppingCart size={20} />

                  Cart

                </span>

                {cartCount > 0 && (
                  <span className="rounded-full bg-green-600 px-2 py-1 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}

              </Link>

              {/* Request Quote */}

              <div className="mt-4">

                <Link
                  href="/#contact"
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="block"
                >
                  <PrimaryButton className="w-full">
                    Request Quote
                  </PrimaryButton>
                </Link>

              </div>

              {/* Logout */}

              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 flex items-center gap-3 rounded-lg px-3 py-3 text-left font-medium text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={20} />

                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}

              <Link
                href="/login"
                onClick={() =>
                  setIsOpen(false)
                }
                className="mt-3 rounded-lg px-3 py-3 font-medium text-slate-700 transition hover:bg-slate-100 hover:text-green-600"
              >
                Login
              </Link>

              {/* Register */}

              <Link
                href="/register"
                onClick={() =>
                  setIsOpen(false)
                }
                className="rounded-lg px-3 py-3 font-medium text-slate-700 transition hover:bg-slate-100 hover:text-green-600"
              >
                Register
              </Link>

              {/* Request Quote */}

              <div className="mt-4">

                <Link
                  href="/#contact"
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="block"
                >
                  <PrimaryButton className="w-full">
                    Request Quote
                  </PrimaryButton>
                </Link>

              </div>
            </>
          )}

        </nav>

      </div>

    </header>
  );
}