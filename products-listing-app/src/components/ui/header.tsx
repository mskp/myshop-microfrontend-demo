import { BASE_APP_URL, CART_APP_URL } from "@/lib/constants";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-zinc-900 text-white bg-opacity-90 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 relative z-50">
        <h1>
          <Link href={BASE_APP_URL} className="hover:underline">
            MyShop
          </Link>
        </h1>
        <Link href={CART_APP_URL} className="text-blue-500 hover:underline">
          Cart
        </Link>
      </div>
    </header>
  );
}
