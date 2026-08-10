"use client";

import { useEffect } from "react";

interface ToastProps {
  show: boolean;
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

export default function Toast({
  show,
  message,
  type = "success",
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  const colors = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  };

  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
  };

  return (
    <div className="fixed top-5 right-5 z-[999]">

      <div
        className={`${colors[type]} text-white px-5 py-4 rounded-xl shadow-xl flex items-center gap-3 min-w-[320px] animate-in slide-in-from-right duration-300`}
      >

        <span className="text-xl">
          {icons[type]}
        </span>

        <p className="font-medium">
          {message}
        </p>

      </div>

    </div>
  );
}