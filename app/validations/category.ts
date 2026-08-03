import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Category name must be at least 3 characters")
    .max(100, "Category name cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),

  imageUrl: z
    .string()
    .url("Invalid image URL")
    .optional(),

  isActive: z
    .boolean()
    .optional(),
});

export type CreateCategoryInput =
  z.infer<typeof createCategorySchema>;