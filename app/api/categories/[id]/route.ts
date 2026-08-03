import { NextRequest } from "next/server";

import { requireAdmin } from "@/app/middleware/auth";

import {
  successResponse,
  errorResponse,
} from "@/app/lib/api-response";

import { categorySchema } from "@/app/validations/category";

import {
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
} from "@/app/services/category.service";

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

    const category = await getCategoryByIdService(id);

    return successResponse(
      "Category fetched successfully.",
      category
    );
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(error.message, 404);
    }

    return errorResponse(
      "Internal Server Error",
      500
    );
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

    const validation = categorySchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(
        validation.error.issues[0]?.message ??
          "Validation failed",
        400
      );
    }

    const category = await updateCategoryService(
      id,
      validation.data
    );

    return successResponse(
      "Category updated successfully.",
      category
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

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await requireAdmin(request);

    const { id } = await params;

    await deleteCategoryService(id);

    return successResponse(
      "Category deleted successfully."
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