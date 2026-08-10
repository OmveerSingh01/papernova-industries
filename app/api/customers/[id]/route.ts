import { NextRequest } from "next/server";

import { requireAdmin } from "@/app/middleware/auth";

import {
  successResponse,
  errorResponse,
} from "@/app/lib/api-response";

import { customerSchema } from "@/app/validations/customer";

import {
  getCustomerByIdService,
  updateCustomerService,
  deleteCustomerService,
} from "@/app/services/customer.service";

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
    await requireAdmin(request);

    const { id } = await params;

    const customer =
      await getCustomerByIdService(id);

    return successResponse(
      "Customer fetched successfully.",
      customer
    );
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return errorResponse(
        error.message,
        404
      );
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

    const validation =
      customerSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(
        validation.error.issues[0]?.message ??
          "Validation failed",
        400
      );
    }

    const customer =
      await updateCustomerService(
        id,
        validation.data
      );

    return successResponse(
      "Customer updated successfully.",
      customer
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

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await requireAdmin(request);

    const { id } = await params;

    await deleteCustomerService(id);

    return successResponse(
      "Customer deactivated successfully."
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