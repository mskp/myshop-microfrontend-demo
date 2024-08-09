import type { Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/db";
import { sendResponse } from "../lib/utils";

export const fetchProductsQuerySchema = z.object({
  limit: z.coerce.number().optional(),
});

/**
 * Retrieve products from the database,
 * optionally limited by a specified number.
 */
export async function GetProducts(req: Request, res: Response) {
  const { limit } = fetchProductsQuerySchema.parse(req.query);

  const products = await prisma.product.findMany({
    take: limit ?? 10,
  });

  sendResponse(res, 200, "Products fetched successfully", {
    products,
  });
}
