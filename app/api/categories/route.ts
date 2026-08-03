import { NextRequest } from "next/server";

import { categorySchema } from "@/app/validations/category";
import { createCategoryService } from "@/app/services/category.service";
import { requireAdmin } from "@/app/middleware/auth";
import {
  successResponse,
  errorResponse,
} from "@/app/lib/api-response";
import { getAllCategoriesService } from "@/app/services/category.service";
export async function POST(request: NextRequest) {
  try {
    // Only ADMIN can create categories
    await requireAdmin(request);

    // Read request body
    const body = await request.json();

    // Validate request
    const validation = categorySchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(
        validation.error.issues[0]?.message ?? "Validation failed",
        400
      );
    }

    // Business Logic
    const category = await createCategoryService(validation.data);

    // Success Response
    return successResponse(
      "Category created successfully.",
      category,
      201
    );
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(error.message, 400);
    }

    return errorResponse("Internal Server Error", 500);
  }
}
export async function GET() {
  try {
    const categories = await getAllCategoriesService();

    return successResponse(
      "Categories fetched successfully.",
      categories
    );
  } catch (error) {
    console.error(error);

    return errorResponse(
      "Internal Server Error",
      500
    );
  }
}