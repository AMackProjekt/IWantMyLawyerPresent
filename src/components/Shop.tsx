import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../useCart';
import type { Product } from '../types/product';

export default function Shop() {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const featuredProducts = products.filter((p) => p.featured);

  return (
    <section id="shop" className="py-20 bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Resources & Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empower yourself with knowledge, guidance, and tools to protect your
            rights and build a better future.
          </p>
        </motion.div>

        {/* Featured Products */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Products
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* All Products */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            All Products
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  delay: number;
}

function ProductCard({ product, onAddToCart, delay }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="card group hover:shadow-xl transition-all"
    >
      {/* Product Image */}
      <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingCart className="w-16 h-16 text-gray-300" />
          </div>
        )}
        {product.featured && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-primary-900 px-3 py-1 rounded-full text-xs font-bold">
            Featured
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h4>
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            {product.category}
          </p>
        </div>

        <p className="text-gray-600 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <span className="text-2xl font-bold text-primary-600">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transform hover:scale-105 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
