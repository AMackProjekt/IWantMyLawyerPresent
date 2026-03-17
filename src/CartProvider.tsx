import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CartItem, Product } from './types/product';
import { CartContext, type CartContextValue } from './CartContext';

const STORAGE_KEY = 'iwantmylawyerpresent-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const rawCart = localStorage.getItem(STORAGE_KEY);
      if (!rawCart) {
        return [];
      }

      const parsed = JSON.parse(rawCart) as CartItem[];
      if (Array.isArray(parsed)) {
        return parsed;
      }

      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage failures and keep cart state in memory for this session.
    }
  }, [items]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    addToCart: (product: Product) => {
      setItems((previous) => {
        const existing = previous.find((item) => item.product.id === product.id);
        if (existing) {
          return previous.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }

        return [...previous, { product, quantity: 1 }];
      });
    },
    removeFromCart: (productId: string) => {
      setItems((previous) => previous.filter((item) => item.product.id !== productId));
    },
    updateQuantity: (productId: string, quantity: number) => {
      if (quantity <= 0) {
        setItems((previous) => previous.filter((item) => item.product.id !== productId));
        return;
      }

      setItems((previous) =>
        previous.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      );
    },
    clearCart: () => {
      setItems([]);
    },
    getTotal: () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    getItemCount: () => items.reduce((sum, item) => sum + item.quantity, 0),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}