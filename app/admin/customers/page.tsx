"use client";

import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "@/app/lib/api";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Toast from "@/components/ui/Toast";
import CustomerModal from "@/components/admin/CustomerModal";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: "CUSTOMER";
  isActive: boolean;
  lastLogin?: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<
    Customer[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [editOpen, setEditOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  const [customerToDeactivate, setCustomerToDeactivate] =
    useState<Customer | null>(null);

  const [deactivating, setDeactivating] =
    useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" as
      | "success"
      | "error"
      | "info",
  });

  async function loadCustomers() {
    try {
      const response = await apiRequest<{
        success: boolean;
        data: Customer[];
      }>("/api/customers");

      setCustomers(response.data);
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message:
          error instanceof Error
            ? error.message
            : "Failed to load customers.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    if (!searchValue) {
      return customers;
    }

    return customers.filter((customer) => {
      return (
        customer.name
          .toLowerCase()
          .includes(searchValue) ||
        customer.email
          .toLowerCase()
          .includes(searchValue) ||
        (customer.phone ?? "")
          .toLowerCase()
          .includes(searchValue)
      );
    });
  }, [customers, search]);

  function openEditModal(
    customer: Customer
  ) {
    setSelectedCustomer(customer);
    setEditOpen(true);
  }

  function openDeactivateModal(
    customer: Customer
  ) {
    setCustomerToDeactivate(customer);
    setConfirmOpen(true);
  }

  async function deactivateCustomer() {
    if (!customerToDeactivate) {
      return;
    }

    try {
      setDeactivating(true);

      await apiRequest(
        `/api/customers/${customerToDeactivate.id}`,
        {
          method: "DELETE",
        }
      );

      setConfirmOpen(false);
      setCustomerToDeactivate(null);

      setToast({
        show: true,
        message:
          "Customer deactivated successfully.",
        type: "success",
      });

      await loadCustomers();
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message:
          error instanceof Error
            ? error.message
            : "Failed to deactivate customer.",
        type: "error",
      });
    } finally {
      setDeactivating(false);
    }
  }

  function handleUpdateSuccess() {
    setToast({
      show: true,
      message:
        "Customer updated successfully.",
      type: "success",
    });

    loadCustomers();
  }

  if (loading) {
    return (
      <h2 className="text-2xl font-semibold">
        Loading Customers...
      </h2>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            Customers
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your registered customers
          </p>

        </div>

        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-medium">
          {customers.length} Customer
          {customers.length !== 1
            ? "s"
            : ""}
        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl shadow-sm border p-5">

        <input
          type="text"
          placeholder="🔍 Search by name, email or phone..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        />

      </div>

      {/* Results */}

      <div className="flex justify-between items-center">

        <p className="text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-800">
            {filteredCustomers.length}
          </span>{" "}
          customer
          {filteredCustomers.length !== 1
            ? "s"
            : ""}
        </p>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-left p-4">
                  Customer
                </th>

                <th className="text-left p-4">
                  Email
                </th>

                <th className="text-left p-4">
                  Phone
                </th>

                <th className="text-left p-4">
                  Last Login
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredCustomers.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="p-10 text-center text-gray-500"
                  >
                    {search
                      ? "No customers found matching your search."
                      : "No customers registered yet."}
                  </td>

                </tr>

              ) : (

                filteredCustomers.map(
                  (customer) => (

                    <tr
                      key={customer.id}
                      className="border-t hover:bg-gray-50"
                    >

                      {/* Customer */}

                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold">
                            {customer.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>

                            <p className="font-medium">
                              {customer.name}
                            </p>

                            <p className="text-xs text-gray-400">
                              Customer
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Email */}

                      <td className="p-4">
                        {customer.email}
                      </td>

                      {/* Phone */}

                      <td className="p-4">
                        {customer.phone ||
                          "-"}
                      </td>

                      {/* Last Login */}

                      <td className="p-4">

                        {customer.lastLogin
                          ? new Date(
                              customer.lastLogin
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "Never"}

                      </td>

                      {/* Status */}

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            customer.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {customer.isActive
                            ? "Active"
                            : "Inactive"}
                        </span>

                      </td>

                      {/* Actions */}

                      <td className="p-4">

                        <div className="flex gap-3">

                          <button
                            onClick={() =>
                              openEditModal(
                                customer
                              )
                            }
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </button>

                          {customer.isActive ? (

                            <button
                              onClick={() =>
                                openDeactivateModal(
                                  customer
                                )
                              }
                              className="text-red-600 hover:underline"
                            >
                              Deactivate
                            </button>

                          ) : (

                            <span className="text-gray-400">
                              Deactivated
                            </span>

                          )}

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Edit Customer Modal */}

      <CustomerModal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedCustomer(null);
        }}
        onSuccess={handleUpdateSuccess}
        customer={selectedCustomer}
      />

      {/* Deactivate Confirmation */}

      <ConfirmModal
        open={confirmOpen}
        title="Deactivate Customer"
        message={`Are you sure you want to deactivate "${customerToDeactivate?.name}"?`}
        confirmText="Deactivate"
        loading={deactivating}
        onCancel={() => {
          setConfirmOpen(false);
          setCustomerToDeactivate(null);
        }}
        onConfirm={deactivateCustomer}
      />

      {/* Toast */}

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast((previous) => ({
            ...previous,
            show: false,
          }))
        }
      />

    </div>
  );
}