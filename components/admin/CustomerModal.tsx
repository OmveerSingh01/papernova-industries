"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/app/lib/api";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  isActive: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  customer: Customer | null;
}

export default function CustomerModal({
  open,
  onClose,
  onSuccess,
  customer,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open || !customer) {
      return;
    }

    setName(customer.name);
    setEmail(customer.email);
    setPhone(customer.phone ?? "");
    setIsActive(customer.isActive);
  }, [open, customer]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!customer) {
      return;
    }

    try {
      setSaving(true);

      await apiRequest(
        `/api/customers/${customer.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name,
            email,
            phone: phone || undefined,
            isActive,
          }),
        }
      );

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to update customer.");
      }
    } finally {
      setSaving(false);
    }
  }

  if (!open || !customer) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">

        {/* Header */}

        <div className="mb-6">

          <h2 className="text-2xl font-bold">
            Edit Customer
          </h2>

          <p className="text-gray-500 mt-1">
            Update customer information
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Name */}

          <label className="block text-sm font-medium mb-2">
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="border w-full p-3 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          {/* Email */}

          <label className="block text-sm font-medium mb-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="border w-full p-3 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          {/* Phone */}

          <label className="block text-sm font-medium mb-2">
            Phone
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="border w-full p-3 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Phone number"
          />

          {/* Status */}

          <label className="flex items-center gap-3 mb-6">

            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) =>
                setIsActive(e.target.checked)
              }
              className="w-4 h-4"
            />

            <span className="text-sm font-medium">
              Customer is active
            </span>

          </label>

          {/* Buttons */}

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="border px-5 py-2.5 rounded-xl hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}