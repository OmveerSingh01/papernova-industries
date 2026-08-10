import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyToken } from "@/app/lib/jwt";

export async function GET(request: NextRequest) {
  try {
    // Get access token
    const authHeader =
      request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const payload = await verifyToken(token);

    // Only customers can access their orders
    if (payload.role !== "CUSTOMER") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only customers can access orders.",
        },
        { status: 403 }
      );
    }

    // Get only the logged-in customer's orders
    const orders = await prisma.order.findMany({
      where: {
        userId: payload.id,
      },

      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
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
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Fetch customer orders error:",
      error
    );

    if (
      error instanceof Error &&
      error.message.includes("JWT")
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired token.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch orders.",
      },
      { status: 500 }
    );
  }
}