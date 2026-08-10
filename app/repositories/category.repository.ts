import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export async function findCategoryByName(name: string) {
  return prisma.category.findUnique({
    where: {
      name,
    },
  });
}

export async function findCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: {
      slug,
    },
  });
}

export async function createCategory(
  data: Prisma.CategoryCreateInput
) {
  return prisma.category.create({
    data,
  });
}
export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
export async function updateCategory(
  id: string,
  data: Prisma.CategoryUpdateInput
) {
  return prisma.category.update({
    where: {
      id,
    },
    data,
  });
}

export async function deactivateCategory(id: string) {
  return prisma.category.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
export async function getCategoryById(id: string) {
  return prisma.category.findFirst({
    where: {
      id,
      isActive: true,
    },
  });
}