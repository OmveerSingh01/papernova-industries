import { z } from "zod";

export const categorySchema = z.object({
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

export type CategoryInput = z.infer<typeof categorySchema>;