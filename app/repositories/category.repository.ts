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