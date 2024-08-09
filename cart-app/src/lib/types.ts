export type Product = {
  id: string;
  name: string;
  category: string;
  brand: string;
  imageUrl: string;
  price: string;
  originalPrice: string;
  discount: string;
};

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};

export type StandardResponse<T = any> = {
  success: boolean;
  message: string;
  error?: string;
  data?: T;
};
