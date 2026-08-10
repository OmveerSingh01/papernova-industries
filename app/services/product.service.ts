import { generateSlug } from "@/app/lib/slug";

import {
  findProductBySku,
  findProductBySlug,
  findCategory,
  createProduct,
} from "@/app/repositories/product.repository";

import type { ProductInput } from "@/app/validations/product";
import {
  getProductById,
  updateProduct,
  deactivateProduct,
} from "@/app/repositories/product.repository";

export async function createProductService(
  input: ProductInput
) {
  // Check category exists
  const category = await findCategory(input.categoryId);

  if (!category) {
    throw new Error("Category not found.");
  }

  // Check duplicate SKU
  const existingSku = await findProductBySku(input.sku);

  if (existingSku) {
    throw new Error("SKU already exists.");
  }

  // Generate slug
  const slug = generateSlug(input.name);

  // Check duplicate slug
  const existingSlug = await findProductBySlug(slug);

  if (existingSlug) {
    throw new Error("Product slug already exists.");
  }

return createProduct({
  name: input.name,
  slug,
  description: input.description,
  sku: input.sku,
  price: input.price,
  stock: input.stock,
  isFeatured: input.isFeatured ?? false,
  isActive: input.isActive ?? true,

  category: {
    connect: {
      id: input.categoryId,
    },
  },

  images: {
    create:
      input.imageUrls?.map((url) => ({
        imageUrl: url,
      })) ?? [],
  },
});
}
import { getAllProducts } from "@/app/repositories/product.repository";

export async function getAllProductsService() {
  return getAllProducts();
}

export async function getProductByIdService(id: string) {
  const product = await getProductById(id);

  if (!product) {
    throw new Error("Product not found.");
  }

  return product;
}

export async function updateProductService(
  id: string,
  input: ProductInput
) {
  const product = await getProductById(id);

  if (!product) {
    throw new Error("Product not found.");
  }

  const category = await findCategory(input.categoryId);

  if (!category) {
    throw new Error("Category not found.");
  }

  const existingSku = await findProductBySku(input.sku);

  if (existingSku && existingSku.id !== id) {
    throw new Error("SKU already exists.");
  }

  const slug = generateSlug(input.name);

  const existingSlug = await findProductBySlug(slug);

  if (existingSlug && existingSlug.id !== id) {
    throw new Error("Product slug already exists.");
  }

  return updateProduct(id, {
    name: input.name,
    slug,
    description: input.description,
    sku: input.sku,
    price: input.price,
    stock: input.stock,
    isFeatured: input.isFeatured,
    isActive: input.isActive,
    category: {
      connect: {
        id: input.categoryId,
      },
    },
  });
}

export async function deleteProductService(id: string) {
  const product = await getProductById(id);

  if (!product) {
    throw new Error("Product not found.");
  }

  return deactivateProduct(id);
}