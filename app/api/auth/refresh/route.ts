import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
import {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
} from "@/app/lib/jwt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { refreshToken } = body;

    if (!refreshToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Refresh token is required.",
        },
        {
          status: 401,
        }
      );
    }

    // Verify refresh token
    const payload = await verifyToken(refreshToken);

    // Find user
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        {
          status: 401,
        }
      );
    }

    // Check account status
    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Account is disabled.",
        },
        {
          status: 403,
        }
      );
    }

    // Make sure this refresh token belongs
    // to the current user
    if (user.refreshToken !== refreshToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid refresh token.",
        },
        {
          status: 401,
        }
      );
    }

    const newPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // Generate new tokens
    const newAccessToken =
      await generateAccessToken(newPayload);

    const newRefreshToken =
      await generateRefreshToken(newPayload);

    // Save rotated refresh token
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: newRefreshToken,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Token refreshed successfully.",
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Refresh token error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Invalid or expired refresh token.",
      },
      {
        status: 401,
      }
    );
  }
}