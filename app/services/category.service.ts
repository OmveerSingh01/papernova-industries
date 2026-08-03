import {
  createCategory,
  findCategoryByName,
  findCategoryBySlug,
} from "@/app/repositories/category.repository";

import { generateSlug } from "@/app/lib/slug";

import type { CreateCategoryInput } from "@/app/validations/category";

export async function createCategoryService(
  input: CreateCategoryInput
) {
  const existingCategory = await findCategoryByName(
    input.name
  );

  if (existingCategory) {
    throw new Error("Category already exists.");
  }

  const slug = generateSlug(input.name);

  const existingSlug = await findCategoryBySlug(slug);

  if (existingSlug) {
    throw new Error("Slug already exists.");
  }

  return createCategory({
    ...input,
    slug,
  });
}