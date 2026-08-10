import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export async function findProductBySku(sku: string) {
  return prisma.product.findUnique({
    where: {
      sku,
    },
  });
}

export async function findProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: {
      slug,
    },
  });
}

export async function findCategory(id: string) {
  return prisma.category.findUnique({
    where: {
      id,
    },
  });
}

export async function createProduct(
  data: Prisma.ProductCreateInput
) {
  return prisma.product.create({
    data,
    include: {
      category: true,
      images: true,
    },
  });
}
export async function getAllProducts() {
  return prisma.product.findMany({
    where: {
      isActive: true,
    },
    include: {
      category: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
export async function getProductById(id: string) {
  return prisma.product.findFirst({
    where: {
      id,
      isActive: true,
    },
    include: {
      category: true,
      images: true,
    },
  });
}

export async function updateProduct(
  id: string,
  data: Prisma.ProductUpdateInput
) {
  return prisma.product.update({
    where: {
      id,
    },
    data,
    include: {
      category: true,
      images: true,
    },
  });
}

export async function deactivateProduct(id: string) {
  return prisma.product.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}