import ProductCard from "@/components/misc/product-card";
import { SERVER_URL } from "@/lib/constants";
import type { Product } from "@/lib/types";
import { StandardResponse } from "@/lib/types";

type FetchProductsReturnType = StandardResponse<{ products: Product[] }>;

async function fetchProducts(): Promise<FetchProductsReturnType> {
  const response = await fetch(`${SERVER_URL}/api/products?limit=12`);
  return response.json();
}

/**
 * The Products component fetches and displays a list of products.
 */
export default async function Products(): Promise<JSX.Element> {
  let data: FetchProductsReturnType;

  try {
    data = await fetchProducts();
  } catch (error) {
    return <ErrorComponent message="Products could not be fetched" />;
  }

  if (!data.success) {
    return <ErrorComponent message="Products could not be fetched" />;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 py-4">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
        {data.data!.products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
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
