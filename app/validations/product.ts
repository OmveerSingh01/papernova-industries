import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters")
    .max(150),

  description: z
    .string()
    .trim()
    .optional(),

  sku: z
    .string()
    .trim()
    .min(3),

  price: z
    .number()
    .positive(),

  stock: z
    .number()
    .int()
    .min(0),

  categoryId: z.string(),

  isFeatured: z.boolean().optional(),

  isActive: z.boolean().optional(),

  imageUrls: z.array(z.string().url()).optional(),
});

export type ProductInput = z.infer<typeof productSchema>;