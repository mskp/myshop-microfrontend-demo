"use server";

import { SERVER_URL } from "./constants";
import { StandardResponse } from "./types";

const failedResponse = {
  message: "Failed",
  success: false,
};

export async function addToCart(productId: string): Promise<{
  message: string;
  success: boolean;
}> {
  try {
    const response = await fetch(`${SERVER_URL}/api/cart`, {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = (await response.json()) as StandardResponse<null>;

    if (data.success) {
      return {
        message: data.message,
        success: data.success,
      };
    }
    throw new Error();
  } catch (error) {
    return failedResponse;
  }
}
