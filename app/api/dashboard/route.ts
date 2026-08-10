import { NextRequest } from "next/server";

import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/middleware/auth";

import {
  successResponse,
  errorResponse,
} from "@/app/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    const [
      totalProducts,
      totalCategories,
      featuredProducts,
      activeProducts,
      recentProducts,
      recentCategories,
    ] = await Promise.all([
      prisma.product.count(),

      prisma.category.count(),

      prisma.product.count({
        where: {
          isFeatured: true,
        },
      }),

      prisma.product.count({
        where: {
          isActive: true,
        },
      }),

      prisma.product.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          category: true,
          images: true,
        },
      }),

      prisma.category.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    return successResponse("Dashboard data fetched.", {
      totalProducts,
      totalCategories,
      featuredProducts,
      activeProducts,
      recentProducts,
      recentCategories,
    });
  } catch (error) {
    console.error(error);

    return errorResponse(
      "Internal Server Error",
      500
    );
  }
}