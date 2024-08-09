"use server";

import { revalidatePath } from "next/cache";
import { SERVER_URL } from "./constants";
import { StandardResponse } from "./types";

const failedResponse = {
  message: "Failed",
  success: false,
};

export async function removeFromCart(productId: string) {
  try {
    const response = await fetch(`${SERVER_URL}/api/cart/${productId}`, {
      method: "DELETE",
    });

    const data = (await response.json()) as StandardResponse<null>;

    if (data.success) {
      revalidatePath("/");
      return {
        message: data.message,
        success: data.success,
      };
    }
  } catch (error) {
    return failedResponse;
  }
}

export async function clearCart() {
  try {
    const response = await fetch(`${SERVER_URL}/api/cart`, {
      method: "DELETE",
    });

    const data = (await response.json()) as StandardResponse<null>;

    if (data.success) {
      revalidatePath("/");
      return {
        message: data.message,
        success: data.success,
      };
    }
  } catch (error) {
    return failedResponse;
  }
}
