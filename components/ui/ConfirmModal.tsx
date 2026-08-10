"use client";

import PrimaryButton from "./PrimaryButton";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">

      <div className="bg-white rounded-2xl shadow-xl w-[420px] p-6">

        <div className="flex items-center gap-3 mb-4">

          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl">
            ⚠️
          </div>

          <div>

            <h2 className="text-xl font-bold">
              {title}
            </h2>

            <p className="text-gray-500 text-sm">
              Confirmation Required
            </p>

          </div>

        </div>

        <p className="text-gray-700 leading-7 mb-8">
          {message}
        </p>

        <div className="flex justify-end gap-3">

          <PrimaryButton
            variant="outline"
            className="!border-gray-300 !text-gray-700 hover:!bg-gray-100"
            onClick={onCancel}
          >
            {cancelText}
          </PrimaryButton>

          <PrimaryButton
            className="!bg-red-600 hover:!bg-red-700"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Please wait..." : confirmText}
          </PrimaryButton>

        </div>

      </div>

    </div>
  );
}