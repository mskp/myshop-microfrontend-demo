import { CartItem, StandardResponse } from "@/lib/types";
import Image from "next/image";
import {
  ClearCartButton,
  DeleteFromCartButton,
} from "@/components/misc/action-buttons";
import { SERVER_URL } from "@/lib/constants";

type FetchCartItemsReturnType = StandardResponse<{
  cartItems: CartItem[];
  grandTotal: number;
}>;

async function fetchCartInfo(): Promise<FetchCartItemsReturnType> {
  const response = await fetch(`${SERVER_URL}/api/cart`, { cache: "no-store" });
  return response.json();
}

export default async function CartPage() {
  let data: FetchCartItemsReturnType;

  try {
    data = await fetchCartInfo();
  } catch (error) {
    return <ErrorComponent message="Cart is empty" />;
  }

  if (!data.success) {
    return <ErrorComponent message="Cart is empty" />;
  }

  const cartItems = data.data!.cartItems;
  const grandTotal = data.data!.grandTotal;

  if (cartItems?.length === 0) {
    return <ErrorComponent message="Cart is empty" />;
  }

  return (
    <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto py-4">
      {cartItems.map(({ product, quantity }, index) => (
        <div
          key={index}
          className="rounded-3xl border-[0.06rem] border-gray-700 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4"
        >
          <div className="col-span-12 lg:col-span-2 img box">
            <Image
              height={500}
              width={200}
              src={product.imageUrl}
              alt="speaker image"
              className="max-lg:w-full lg:w-[180px] rounded-xl"
            />
          </div>
          <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
            <div className="flex items-center justify-between w-full mb-4">
              <h5 className="font-manrope font-bold text-2xl leading-9  truncate">
                {product.name}
              </h5>
              <DeleteFromCartButton productId={product.id} />
            </div>
            <p className="font-normal text-base leading-7 mb-6 capitalize flex gap-2">
              <span className="text-blue-500">
                {product.price} X {quantity}
              </span>
              &bull;
              <span>{product.brand}</span> &bull;{" "}
              <span className="capitalize">{product.category}</span>
            </p>

            <div className="flex justify-between items-center">
              <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">
                &#8377;
                {parseFloat(product.price.replace(/[^0-9]/g, "")) * quantity}
              </h6>
            </div>
          </div>
        </div>
      ))}

      <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 max-lg:max-w-lg max-lg:mx-auto">
        <h5 className=" font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">
          Subtotal
        </h5>

        <div className="flex items-center justify-between gap-5 ">
          <ClearCartButton />
          <h6 className="font-manrope font-bold text-3xl lead-10 text-indigo-600">
            &#8377;{grandTotal}
          </h6>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ message }: { message: string }) {
  return (
    <div className="grid h-screen place-content-center px-4">
      <h1 className="uppercase tracking-widest text-2xl">{message}</h1>
    </div>
  );
}
