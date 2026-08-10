import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/middleware/auth";

const allowedStatuses = [
  "NEW",
  "CONTACTED",
  "QUOTED",
  "COMPLETED",
];

export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await requireAdmin(request);

    const { id } =
      await context.params;

    const body =
      await request.json();

    const { status } = body;

    if (
      !allowedStatuses.includes(
        status
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid status",
        },
        {
          status: 400,
        }
      );
    }

    const inquiry =
      await prisma.inquiry.update({
        where: {
          id,
        },

        data: {
          status,
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "Inquiry status updated successfully.",
      data: inquiry,
    });
  } catch (error) {
    console.error(
      "Failed to update inquiry:",
      error
    );

    if (
      error instanceof Error &&
      error.message === "Forbidden"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}