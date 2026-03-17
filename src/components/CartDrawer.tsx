import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Minus, Plus, X } from 'lucide-react';
import { useCart } from '../useCart';

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, getItemCount, getTotal, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open shopping cart"
        className="relative p-2 rounded-lg border border-primary-700 text-white hover:text-yellow-400 transition-colors"
      >
        <ShoppingCart className="w-5 h-5" />
        {getItemCount() > 0 && (
          <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-yellow-400 text-primary-900 text-xs font-bold grid place-items-center">
            {getItemCount()}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close cart overlay"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-60 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 z-70 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                  items.map((item) => (
                    <article key={item.product.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-md object-cover bg-gray-100"
                          loading="lazy"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">{item.product.name}</h3>
                          <p className="text-sm text-primary-700 font-bold mt-1">
                            ${item.product.price.toFixed(2)}
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center border border-gray-300 rounded-md">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1.5 text-gray-600 hover:bg-gray-100"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1.5 text-gray-600 hover:bg-gray-100"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>

              <div className="border-t border-gray-200 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-xl font-bold text-gray-900">${getTotal().toFixed(2)}</span>
                </div>

                <a
                  href="#checkout"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center py-3 rounded-lg bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-colors"
                >
                  Go To Checkout
                </a>

                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="block w-full py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
