import type { Request, Response } from "express";
import { BadRequest, NotFound } from "http-errors";
import { z } from "zod";
import prisma from "../lib/db";
import { sendResponse } from "../lib/utils";

const MAX_CART_ITEM_QUANTITY = 5;

const addToCartSchema = z.object({
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/),
});

const deleteCartItemParamsSchema = z.object({
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/),
});

/**
 * Get all cart items for a user.
 */
export async function GetAllCartItems(req: Request, res: Response) {
  const cartItems = await prisma.cart.findMany({
    include: {
      product: true,
    },
    orderBy: {
      createdOn: "desc",
    },
  });

  const grandTotal = cartItems.reduce((total, { product, quantity }) => {
    const price = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
    return total + price * quantity;
  }, 0);

  sendResponse(res, 200, "Cart items fetched successfully", {
    cartItems,
    grandTotal,
  });
}

/**
 * Add a product to the user's cart.
 * If the product already exists in the cart, increment the quantity by 1.
 */
export async function AddToCart(req: Request, res: Response) {
  const { error: validationError, data: parsedData } =
    addToCartSchema.safeParse(req.body);

  if (validationError) {
    throw new BadRequest(validationError.message);
  }

  const { productId } = parsedData;

  const existingCartItem = await prisma.cart.findUnique({
    where: {
      productId,
    },
  });

  if (existingCartItem) {
    const newQuantity = existingCartItem.quantity + 1;

    if (newQuantity > MAX_CART_ITEM_QUANTITY) {
      throw new Error(`Quantity cannot exceed ${MAX_CART_ITEM_QUANTITY}`);
    }

    await prisma.cart.update({
      where: {
        id: existingCartItem.id,
      },
      data: {
        quantity: newQuantity,
      },
    });
  } else {
    await prisma.cart.create({
      data: {
        productId,
        quantity: 1,
      },
    });
  }

  sendResponse(res, 200, "Product added to cart");
}

/**
 * Delete a product from the user's cart.
 */
export async function DeleteCartItem(req: Request, res: Response) {
  const { error, data } = deleteCartItemParamsSchema.safeParse(req.params);

  if (error) {
    throw new BadRequest(error.message);
  }

  const { productId } = data;

  const cartItem = await prisma.cart.findUnique({
    where: {
      productId,
    },
  });

  if (!cartItem) {
    throw new NotFound("Product not in cart");
  }

  await prisma.cart.delete({
    where: {
      productId,
    },
  });

  sendResponse(res, 200, "Product has been removed from cart");
}

/**
 * Clear all items from the cart.
 */
export async function ClearCart(req: Request, res: Response) {
  await prisma.cart.deleteMany();

  sendResponse(res, 200, "Cart has been cleared");
}
