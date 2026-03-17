import { createContext } from 'react';
import type { CartItem, Product } from './types/product';

export interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);
