"use client";

import { clearCart, removeFromCart } from "@/lib/actions";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "../ui/button";

/**
 * DeleteFromCartButton component renders a button to delete an item from the cart.
 */
export function DeleteFromCartButton({
  productId,
}: {
  productId: string;
}): JSX.Element {
  return (
    <Button
      onClick={() => {
        removeFromCart(productId);
      }}
      size={"icon"}
      variant={"destructive"}
    >
      <AiOutlineDelete size={20} />
    </Button>
  );
}

/**
 * ClearCartButton component renders a button to clear the cart.
 */
export function ClearCartButton(): JSX.Element {
  return (
    <Button
      variant={"destructive"}
      onClick={() => {
        clearCart();
      }}
    >
      Clear Cart
    </Button>
  );
}
