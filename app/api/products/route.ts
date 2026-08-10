import { NextRequest } from "next/server";

import { requireAdmin } from "@/app/middleware/auth";

import {
  successResponse,
  errorResponse,
} from "@/app/lib/api-response";

import { productSchema } from "@/app/validations/product";
import { getAllProductsService } from "@/app/services/product.service";
import { createProductService } from "@/app/services/product.service";

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);

    const body = await request.json();

    const validation = productSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(
        validation.error.issues[0]?.message ??
          "Validation failed",
        400
      );
    }

    const product = await createProductService(
      validation.data
    );

    return successResponse(
      "Product created successfully.",
      product,
      201
    );
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(error.message, 400);
    }

    return errorResponse(
      "Internal Server Error",
      500
    );
  }
}
export async function GET() {
  try {
    const products = await getAllProductsService();

    return successResponse(
      "Products fetched successfully.",
      products
    );
  } catch (error) {
    return errorResponse(
      "Internal Server Error",
      500
    );
  }
}