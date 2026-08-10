import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/middleware/auth";

export async function GET(
  request: NextRequest
) {
  try {
    await requireAdmin(request);

    const inquiries =
      await prisma.inquiry.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      data: inquiries,
    });
  } catch (error) {
    console.error(
      "Failed to load inquiries:",
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