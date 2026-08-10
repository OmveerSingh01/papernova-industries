"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/app/lib/api";
import AddCategoryModal from "@/components/admin/CategoryModal";
interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
const [open, setOpen] = useState(false);
const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  async function loadCategories() {
    try {
      const response = await apiRequest<{
        success: boolean;
        data: Category[];
      }>("/api/categories");

      setCategories(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Categories
        </h1>

       <button
 onClick={() => {
  setSelectedCategory(null);
  setOpen(true);
}}
  className="bg-black text-white px-5 py-2 rounded-lg"
>
  + Add Category
</button>

      </div>

      <table className="w-full bg-white rounded-xl shadow overflow-hidden">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-4">
              Name
            </th>

            <th className="text-left p-4">
              Slug
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

          {categories.map((category) => (

            <tr
              key={category.id}
              className="border-t"
            >

              <td className="p-4">
                {category.name}
              </td>

              <td className="p-4">
                {category.slug}
              </td>

             <td className="p-4">
  <span
    className={`px-3 py-1 rounded-full text-sm font-medium ${
      category.isActive
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {category.isActive ? "Active" : "Inactive"}
  </span>
</td>

<td className="p-4 flex gap-3">

  <button
  onClick={() => {
    setSelectedCategory(category);
    setOpen(true);
  }}
  className="text-blue-600 hover:underline"
>
  Edit
</button>

  {category.isActive && (
  <button
    onClick={async () => {
      const confirmDelete = window.confirm(
        `Deactivate "${category.name}"?`
      );

      if (!confirmDelete) return;

      try {
        await apiRequest(`/api/categories/${category.id}`, {
          method: "DELETE",
        });

        loadCategories();
      } catch (error) {
        console.error(error);
        alert("Failed to deactivate category.");
      }
    }}
    className="text-red-600 hover:underline"
  >
    Deactivate
  </button>
)}

</td>

            </tr>

          ))}

        </tbody>

      </table>

<AddCategoryModal
  open={open}
  onClose={() => {
    setOpen(false);
    setSelectedCategory(null);
  }}
  onSuccess={loadCategories}
  category={selectedCategory}
/>
    </div>
  );
}