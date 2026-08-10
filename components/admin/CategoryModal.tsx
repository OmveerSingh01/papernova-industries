"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/app/lib/api";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category?: Category | null;
}

export default function AddCategoryModal({
  open,
  onClose,
  onSuccess,
  category,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description ?? "");
      setPreview(category.imageUrl ?? "");
      setImageFile(null);
    } else {
      setName("");
      setDescription("");
      setPreview("");
      setImageFile(null);
    }
  }, [category, open]);

  if (!open) return null;

  async function uploadImage() {
    if (!imageFile) {
      return preview;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", imageFile);

    const token = localStorage.getItem("accessToken");

    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    setUploading(false);

    if (!response.ok) {
      throw new Error(result.message);
    }

    return result.data.imageUrl;
  }

  async function handleSubmit() {
    try {
      const imageUrl = await uploadImage();

      const payload = {
        name,
        description,
        imageUrl,
      };

      if (category) {
        await apiRequest(`/api/categories/${category.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest("/api/categories", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      setName("");
      setDescription("");
      setImageFile(null);
      setPreview("");

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong.");
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[500px] p-6 shadow-xl">

        <h2 className="text-2xl font-bold mb-6">
          {category ? "Edit Category" : "Add Category"}
        </h2>

        <input
          className="border w-full p-3 rounded mb-4"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="border w-full p-3 rounded mb-4"
          rows={4}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={(e) => {
            if (e.target.files?.length) {
              const file = e.target.files[0];

              setImageFile(file);
              setPreview(URL.createObjectURL(file));
            }
          }}
        />

        {preview && (
          <div className="mb-6">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-44 object-cover rounded-lg border"
            />
          </div>
        )}

        <div className="flex justify-end gap-3">

          <button
            onClick={() => {
              onClose();
            }}
            className="border px-5 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="bg-black text-white px-5 py-2 rounded disabled:opacity-50"
          >
            {uploading
              ? "Uploading..."
              : category
              ? "Update Category"
              : "Create Category"}
          </button>

        </div>

      </div>
    </div>
  );
}