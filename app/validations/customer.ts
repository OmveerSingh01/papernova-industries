import { z } from "zod";

export const customerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Customer name must be at least 3 characters")
    .max(100, "Customer name cannot exceed 100 characters"),

  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  phone: z
    .string()
    .trim()
    .optional(),

  isActive: z
    .boolean()
    .optional(),
});

export type CustomerInput = z.infer<
  typeof customerSchema
>;