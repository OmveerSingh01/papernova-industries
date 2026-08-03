import { NextRequest } from "next/server";

import { verifyToken } from "@/app/lib/jwt";

export async function requireAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  const payload = await verifyToken(token);

  if (payload.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  return payload;
}