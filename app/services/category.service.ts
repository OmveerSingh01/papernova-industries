import { generateSlug } from "@/app/lib/slug";

import {
  createCategory,
  findCategoryByName,
  findCategoryBySlug,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deactivateCategory,
} from "@/app/repositories/category.repository";

import type { CategoryInput } from "@/app/validations/category";

export async function createCategoryService(
  input: CategoryInput
) {
  const existingCategory = await findCategoryByName(input.name);

  if (existingCategory) {
    throw new Error("Category already exists.");
  }

  const slug = generateSlug(input.name);

  const existingSlug = await findCategoryBySlug(slug);

  if (existingSlug) {
    throw new Error("Category slug already exists.");
  }

  return createCategory({
    ...input,
    slug,
  });
}

export async function getAllCategoriesService() {
  return getAllCategories();
}

export async function getCategoryByIdService(id: string) {
  const category = await getCategoryById(id);

  if (!category) {
    throw new Error("Category not found.");
  }

  return category;
}

export async function updateCategoryService(
  id: string,
  input: CategoryInput
) {
  const category = await getCategoryById(id);

  if (!category) {
    throw new Error("Category not found.");
  }

  const existingCategory = await findCategoryByName(input.name);

  if (existingCategory && existingCategory.id !== id) {
    throw new Error("Category already exists.");
  }

  const slug = generateSlug(input.name);

  const existingSlug = await findCategoryBySlug(slug);

  if (existingSlug && existingSlug.id !== id) {
    throw new Error("Category slug already exists.");
  }

  return updateCategory(id, {
    ...input,
    slug,
  });
}

export async function deleteCategoryService(id: string) {
  const category = await getCategoryById(id);

  if (!category) {
    throw new Error("Category not found.");
  }

  return deactivateCategory(id);
}