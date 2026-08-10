import { NextRequest } from "next/server";

import { requireAdmin } from "@/app/middleware/auth";
import { supabaseServer } from "@/app/lib/supabase-server";

import {
  successResponse,
  errorResponse,
} from "@/app/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);

    const formData = await request.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return errorResponse("No file uploaded.", 400);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabaseServer.storage
      .from("products")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      return errorResponse(error.message, 400);
    }

    const { data } = supabaseServer.storage
      .from("products")
      .getPublicUrl(fileName);

    return successResponse("Image uploaded successfully.", {
      imageUrl: data.publicUrl,
    });
  } catch (error) {
    console.error(error);

    return errorResponse("Internal Server Error", 500);
  }
}