import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/middleware/auth";

const allowedStatuses = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;

type OrderStatus =
  (typeof allowedStatuses)[number];

export async function PATCH(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await requireAdmin(request);

    const { id } = await context.params;

    const body = await request.json();

    const status = body.status as OrderStatus;

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order status.",
        },
        {
          status: 400,
        }
      );
    }

    const existingOrder =
      await prisma.order.findUnique({
        where: {
          id,
        },
      });

    if (!existingOrder) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        {
          status: 404,
        }
      );
    }

    const order =
      await prisma.order.update({
        where: {
          id,
        },

        data: {
          status,
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },

          items: true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Order status updated successfully.",
        data: order,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Update order status error:",
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
        message:
          "Failed to update order status.",
      },
      {
        status: 500,
      }
    );
  }
}