"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/app/lib/api";
import { X, Plus, Trash2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  sku: string;
  price: number;
  stock: number;
  categoryId: string;
  isFeatured: boolean;
  isActive: boolean;

  images: {
    imageUrl: string;
  }[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: Product | null;
}

interface ImageItem {
  id: string;
  url: string;
  isNew: boolean;
}

interface ImageFileItem {
  id: string;
  file: File;
}

export default function ProductModal({
  open,
  onClose,
  onSuccess,
  product,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [sku, setSku] = useState("");

  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [categoryId, setCategoryId] =
    useState("");

  const [isFeatured, setIsFeatured] =
    useState(false);

  const [isActive, setIsActive] =
    useState(true);

  const [images, setImages] =
    useState<ImageItem[]>([]);

  const [imageFiles, setImageFiles] =
    useState<ImageFileItem[]>([]);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [saving, setSaving] =
    useState(false);

  /*
   * Load categories
   */

  useEffect(() => {
    if (!open) return;

    async function loadCategories() {
      try {
        const response =
          await apiRequest<{
            success: boolean;
            data: Category[];
          }>("/api/categories");

        setCategories(response.data);
      } catch (error) {
        console.error(
          "Failed to load categories:",
          error
        );
      }
    }

    loadCategories();
  }, [open]);

  /*
   * Load product when editing
   */

  useEffect(() => {
    if (!open) return;

    if (product) {
      setName(product.name);

      setDescription(
        product.description ?? ""
      );

      setSku(product.sku);

      setPrice(
        product.price.toString()
      );

      setStock(
        product.stock.toString()
      );

      setCategoryId(
        product.categoryId
      );

      setIsFeatured(
        product.isFeatured
      );

      setIsActive(
        product.isActive
      );

      /*
       * Existing product images
       */

      setImages(
        product.images.map(
          (image, index) => ({
            id: `existing-${index}-${image.imageUrl}`,
            url: image.imageUrl,
            isNew: false,
          })
        )
      );

      setImageFiles([]);
    } else {
      /*
       * Reset form for new product
       */

      setName("");
      setDescription("");
      setSku("");
      setPrice("");
      setStock("");
      setCategoryId("");

      setIsFeatured(false);
      setIsActive(true);

      setImages([]);
      setImageFiles([]);
    }
  }, [product, open]);

  /*
   * Select multiple images
   */

  function handleImageSelect(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(
      e.target.files || []
    );

    if (files.length === 0) {
      return;
    }

    const newFiles: ImageFileItem[] =
      files.map((file, index) => ({
        id: `new-${Date.now()}-${index}`,
        file,
      }));

    /*
     * Store files
     */

    setImageFiles((current) => [
      ...current,
      ...newFiles,
    ]);

    /*
     * Create previews
     */

    const newImages: ImageItem[] =
      newFiles.map((item) => ({
        id: item.id,
        url: URL.createObjectURL(
          item.file
        ),
        isNew: true,
      }));

    setImages((current) => [
      ...current,
      ...newImages,
    ]);

    /*
     * Reset file input
     * so the same image can be selected again.
     */

    e.target.value = "";
  }

  /*
   * Remove image
   */

  function removeImage(
    image: ImageItem
  ) {
    setImages((current) =>
      current.filter(
        (item) =>
          item.id !== image.id
      )
    );

    /*
     * Remove newly selected file
     */

    if (image.isNew) {
      setImageFiles((current) =>
        current.filter(
          (item) =>
            item.id !== image.id
        )
      );

      /*
       * Release preview URL
       */

      URL.revokeObjectURL(
        image.url
      );
    }
  }

  /*
   * Upload image
   */

  async function uploadImage(
    file: File
  ): Promise<string> {
    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    const token =
      localStorage.getItem(
        "accessToken"
      );

    if (!token) {
      throw new Error(
        "Authentication required."
      );
    }

    const response = await fetch(
      "/api/upload",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
        },

        body: formData,
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ||
          "Image upload failed."
      );
    }

    return result.data.imageUrl;
  }

  /*
   * Save product
   */

  async function handleSubmit() {
    try {
      /*
       * Validation
       */

      if (!name.trim()) {
        alert(
          "Please enter a product name."
        );
        return;
      }

      if (!sku.trim()) {
        alert(
          "Please enter a SKU."
        );
        return;
      }

      if (
        price === "" ||
        Number(price) < 0
      ) {
        alert(
          "Please enter a valid price."
        );
        return;
      }

      if (
        stock === "" ||
        Number(stock) < 0
      ) {
        alert(
          "Please enter valid stock."
        );
        return;
      }

      if (!categoryId) {
        alert(
          "Please select a category."
        );
        return;
      }

      setSaving(true);

      /*
       * Keep existing images
       * that were not removed.
       */

      const existingImageUrls =
        images
          .filter(
            (image) =>
              !image.isNew
          )
          .map(
            (image) =>
              image.url
          );

      /*
       * Upload new images
       */

      const newImageUrls: string[] =
        [];

      for (
        const item of imageFiles
      ) {
        /*
         * Make sure the file
         * hasn't been removed.
         */

        const stillExists =
          images.some(
            (image) =>
              image.id === item.id
          );

        if (!stillExists) {
          continue;
        }

        const imageUrl =
          await uploadImage(
            item.file
          );

        newImageUrls.push(
          imageUrl
        );
      }

      /*
       * Final image list
       */

      const imageUrls = [
        ...existingImageUrls,
        ...newImageUrls,
      ];

      /*
       * Product data
       */

      const body = {
        name: name.trim(),

        description:
          description.trim(),

        sku: sku.trim(),

        price: Number(price),

        stock: Number(stock),

        categoryId,

        isFeatured,

        isActive,

        imageUrls,
      };

      /*
       * Create product
       */

      if (!product) {
        await apiRequest(
          "/api/products",
          {
            method: "POST",

            body: JSON.stringify(
              body
            ),
          }
        );
      }

      /*
       * Update product
       */

      else {
        await apiRequest(
          `/api/products/${product.id}`,
          {
            method: "PUT",

            body: JSON.stringify(
              body
            ),
          }
        );
      }

      /*
       * Success
       */

      onSuccess();
      onClose();
    } catch (error) {
      console.error(
        "Failed to save product:",
        error
      );

      if (
        error instanceof Error
      ) {
        alert(error.message);
      } else {
        alert(
          "Failed to save product."
        );
      }
    } finally {
      setSaving(false);
    }
  }

  /*
   * Don't render when closed
   */

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-5">

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {product
                ? "Edit Product"
                : "Add Product"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage product information,
              pricing, stock and images.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50"
          >
            <X size={22} />
          </button>

        </div>

        {/* Form */}

        <div className="p-6">

          {/* Name */}

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Product Name
          </label>

          <input
            className="mb-5 w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          {/* SKU */}

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            SKU
          </label>

          <input
            className="mb-5 w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-green-500"
            placeholder="SKU"
            value={sku}
            onChange={(e) =>
              setSku(e.target.value)
            }
          />

          {/* Description */}

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Description
          </label>

          <textarea
            className="mb-5 w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
            placeholder="Product description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          {/* Price / Stock */}

          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Price (₹)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Price"
                value={price}
                onChange={(e) =>
                  setPrice(
                    e.target.value
                  )
                }
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Stock
              </label>

              <input
                type="number"
                min="0"
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Stock"
                value={stock}
                onChange={(e) =>
                  setStock(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* Category */}

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Category
          </label>

          <select
            className="mb-5 w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-green-500"
            value={categoryId}
            onChange={(e) =>
              setCategoryId(
                e.target.value
              )
            }
          >
            <option value="">
              Select Category
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category.id}
                  value={
                    category.id
                  }
                >
                  {category.name}
                </option>
              )
            )}
          </select>

          {/* Featured / Active */}

          <div className="mb-6 flex flex-wrap gap-6">

            <label className="flex cursor-pointer items-center gap-3">

              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) =>
                  setIsFeatured(
                    e.target.checked
                  )
                }
                className="h-4 w-4"
              />

              <span className="text-sm font-semibold text-slate-700">
                Featured Product
              </span>

            </label>

            <label className="flex cursor-pointer items-center gap-3">

              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) =>
                  setIsActive(
                    e.target.checked
                  )
                }
                className="h-4 w-4"
              />

              <span className="text-sm font-semibold text-slate-700">
                Active Product
              </span>

            </label>

          </div>

          {/* Images */}

          <div className="border-t border-slate-200 pt-6">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h3 className="text-lg font-bold text-slate-900">
                  Product Images
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Add multiple images for
                  this product.
                </p>

              </div>

              <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700">

                <Plus size={18} />

                Add Images

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={
                    handleImageSelect
                  }
                />

              </label>

            </div>

            {/* Image Preview */}

            {images.length > 0 ? (
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">

                {images.map(
                  (image) => (
                    <div
                      key={image.id}
                      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                    >

                      <img
                        src={image.url}
                        alt="Product"
                        className="h-40 w-full object-cover"
                      />

                      {/* Remove */}

                      <button
                        type="button"
                        onClick={() =>
                          removeImage(
                            image
                          )
                        }
                        disabled={saving}
                        className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white opacity-0 shadow transition group-hover:opacity-100 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Remove image"
                      >
                        <Trash2
                          size={16}
                        />
                      </button>

                      {/* New badge */}

                      {image.isNew && (
                        <span className="absolute bottom-2 left-2 rounded-full bg-green-600 px-2 py-1 text-xs font-semibold text-white">
                          New
                        </span>
                      )}

                    </div>
                  )
                )}

              </div>
            ) : (
              <div className="mt-5 rounded-xl border-2 border-dashed border-slate-300 p-8 text-center">

                <p className="text-gray-500">
                  No product images added.
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Click "Add Images" to
                  upload product images.
                </p>

              </div>
            )}

          </div>

        </div>

        {/* Footer */}

        <div className="sticky bottom-0 flex justify-end gap-3 border-t bg-white px-6 py-5">

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : product
              ? "Update Product"
              : "Create Product"}
          </button>

        </div>

      </div>

    </div>
  );
}