export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  inStock: boolean;
  featured?: boolean;
}

export type ProductCategory = 
  | 'books'
  | 'courses'
  | 'consulting'
  | 'merchandise'
  | 'resources';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}
