import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      company,
      phone,
      message,
    } = body;

    /*
     * Validation
     */

    if (!name?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!email?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!message?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Message is required.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Basic email validation
     */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Create inquiry
     */

    const inquiry =
      await prisma.inquiry.create({
        data: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          company:
            company?.trim() || null,
          phone:
            phone?.trim() || null,
          message: message.trim(),
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Your inquiry has been submitted successfully.",
        data: {
          id: inquiry.id,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Inquiry creation error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to submit your inquiry. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}