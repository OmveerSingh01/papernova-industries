import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyToken } from "@/app/lib/jwt";

interface OrderItemInput {
  productId: string;
  quantity: number;
}

interface CreateOrderBody {
  items: OrderItemInput[];

  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPincode: string;
}

export async function POST(request: NextRequest) {
  try {
    // --------------------------------------------------
    // 1. Authenticate customer
    // --------------------------------------------------

    const authHeader =
      request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    const payload = await verifyToken(token);

    if (payload.role !== "CUSTOMER") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only customers can place orders.",
        },
        { status: 403 }
      );
    }

    // --------------------------------------------------
    // 2. Read request body
    // --------------------------------------------------

    const body =
      (await request.json()) as CreateOrderBody;

    const {
      items,
      shippingName,
      shippingPhone,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingPincode,
    } = body;

    // --------------------------------------------------
    // 3. Basic validation
    // --------------------------------------------------

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Your cart is empty.",
        },
        { status: 400 }
      );
    }

    if (
      !shippingName?.trim() ||
      !shippingPhone?.trim() ||
      !shippingAddress?.trim() ||
      !shippingCity?.trim() ||
      !shippingState?.trim() ||
      !shippingPincode?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide complete shipping details.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 4. Validate quantities
    // --------------------------------------------------

    for (const item of items) {
      if (
        !item.productId ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid cart item.",
          },
          { status: 400 }
        );
      }
    }

    // --------------------------------------------------
    // 5. Create order using transaction
    // --------------------------------------------------

    const result = await prisma.$transaction(
      async (transaction) => {
        const productIds = items.map(
          (item) => item.productId
        );

        // Get current products from database.
        // We NEVER trust prices coming from localStorage.
        const products =
          await transaction.product.findMany({
            where: {
              id: {
                in: productIds,
              },
              isActive: true,
            },
          });

        if (products.length !== productIds.length) {
          throw new Error(
            "One or more products are no longer available."
          );
        }

        // ------------------------------------------------
        // Calculate subtotal from database prices
        // ------------------------------------------------

        let subtotal = 0;

        const orderItems = [];

        for (const item of items) {
          const product = products.find(
            (product) =>
              product.id === item.productId
          );

          if (!product) {
            throw new Error(
              "Product not found."
            );
          }

          if (product.stock < item.quantity) {
            throw new Error(
              `${product.name} does not have enough stock.`
            );
          }

          const price = Number(product.price);

          const itemSubtotal =
            price * item.quantity;

          subtotal += itemSubtotal;

          orderItems.push({
            productId: product.id,
            productName: product.name,
            price: product.price,
            quantity: item.quantity,
            subtotal: itemSubtotal,
          });
        }

        // ------------------------------------------------
        // Shipping
        // ------------------------------------------------

        // For now shipping is free.
        // We can add shipping rules later.
        const shipping = 0;

        const total =
          subtotal + shipping;

        // ------------------------------------------------
        // Generate order number
        // ------------------------------------------------

        const orderNumber =
          `PN-${Date.now()}-${Math.floor(
            Math.random() * 1000
          )}`;

        // ------------------------------------------------
        // Create order
        // ------------------------------------------------

        const order =
          await transaction.order.create({
            data: {
              orderNumber,

              userId: payload.id,

              status: "PENDING",

              subtotal,
              shipping,
              total,

              shippingName:
                shippingName.trim(),

              shippingPhone:
                shippingPhone.trim(),

              shippingAddress:
                shippingAddress.trim(),

              shippingCity:
                shippingCity.trim(),

              shippingState:
                shippingState.trim(),

              shippingPincode:
                shippingPincode.trim(),

              items: {
                create: orderItems,
              },
            },

            include: {
              items: true,
            },
          });

        // ------------------------------------------------
        // Reduce product stock
        // ------------------------------------------------

        for (const item of items) {
          const updated =
            await transaction.product.updateMany({
              where: {
                id: item.productId,

                isActive: true,

                stock: {
                  gte: item.quantity,
                },
              },

              data: {
                stock: {
                  decrement: item.quantity,
                },
              },
            });

          if (updated.count !== 1) {
            throw new Error(
              "Stock changed while placing the order. Please try again."
            );
          }
        }

        return order;
      }
    );

    // --------------------------------------------------
    // 6. Return successful response
    // --------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully.",
        data: {
          orderId: result.id,
          orderNumber:
            result.orderNumber,
          status: result.status,
          subtotal: Number(
            result.subtotal
          ),
          shipping: Number(
            result.shipping
          ),
          total: Number(
            result.total
          ),
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error(
      "Create order error:",
      error
    );

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to place order.",
      },
      { status: 500 }
    );
  }
}