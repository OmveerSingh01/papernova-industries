import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/middleware/auth";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },

        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                sku: true,
                images: {
                  select: {
                    imageUrl: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: orders,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Admin orders error:",
      error
    );

    if (
      error instanceof Error &&
      (
        error.message === "Unauthorized" ||
        error.message === "Forbidden"
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status:
            error.message === "Unauthorized"
              ? 401
              : 403,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch orders.",
      },
      {
        status: 500,
      }
    );
  }
}