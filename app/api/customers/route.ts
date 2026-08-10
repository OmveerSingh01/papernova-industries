import { NextRequest } from "next/server";

import { requireAdmin } from "@/app/middleware/auth";

import {
  successResponse,
  errorResponse,
} from "@/app/lib/api-response";

import { getAllCustomersService } from "@/app/services/customer.service";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    const customers =
      await getAllCustomersService();

    return successResponse(
      "Customers fetched successfully.",
      customers
    );
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return errorResponse(
        error.message,
        400
      );
    }

    return errorResponse(
      "Internal Server Error",
      500
    );
  }
}