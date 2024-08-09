"use client";

import { addToCart } from "@/lib/actions";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { CART_APP_URL } from "@/lib/constants";

export function AddToCartButton({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}): JSX.Element {
  const router = useRouter();

  async function handleAddToCart() {
    const { message, success } = await addToCart(productId);
    toast({
      title: message,
    });
    if (success) return router.push(CART_APP_URL);
  }

  return (
    <Button onClick={handleAddToCart} variant={"outline"} className={className}>
      Add to cart
    </Button>
  );
}
