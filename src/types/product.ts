export interface Product {
  handle: string;
  name: string;
  part_id: string;
  price: string;
  currency: string;
  stock_qty: string;
  brand: string;
  category: string;
  description: string;
  image_url: string;
  url: string;
  related_handles: string[];
}

export interface ProductsData {
  scraped_at: string;
  total_products: number;
  products: Product[];
}

export interface CartItem {
  handle: string;
  name: string;
  price: string;
  image_url: string;
  quantity: number;
}
