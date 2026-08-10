import { NextRequest } from "next/server";

import { requireAdmin } from "@/app/middleware/auth";

import {
  successResponse,
  errorResponse,
} from "@/app/lib/api-response";

import { productSchema } from "@/app/validations/product";

import {
  getProductByIdService,
  updateProductService,
  deleteProductService,
} from "@/app/services/product.service";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const product = await getProductByIdService(id);

    return successResponse(
      "Product fetched successfully.",
      product
    );
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(error.message, 404);
    }

    return errorResponse("Internal Server Error", 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await requireAdmin(request);

    const { id } = await params;

    const body = await request.json();

    const validation = productSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(
        validation.error.issues[0]?.message ??
          "Validation failed",
        400
      );
    }

    const product = await updateProductService(
      id,
      validation.data
    );

    return successResponse(
      "Product updated successfully.",
      product
    );
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(error.message, 400);
    }

    return errorResponse("Internal Server Error", 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await requireAdmin(request);

    const { id } = await params;

    await deleteProductService(id);

    return successResponse(
      "Product deleted successfully."
    );
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(error.message, 400);
    }

    return errorResponse("Internal Server Error", 500);
  }
}