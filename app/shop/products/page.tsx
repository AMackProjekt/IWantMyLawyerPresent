"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
}

const products: Product[] = [
  {
    id: "1",
    name: "Legal Rights T-Shirt",
    category: "Apparel",
    price: 29.99,
    description: "Premium cotton tee with 'I Want My Lawyer Present' print",
    image: "👕",
    inStock: true,
  },
  {
    id: "2",
    name: "Constitutional Rights Hoodie",
    category: "Apparel",
    price: 59.99,
    description: "Comfortable hoodie featuring constitutional amendments",
    image: "🧥",
    inStock: true,
  },
  {
    id: "3",
    name: "Legal Defense Mug",
    category: "Accessories",
    price: 19.99,
    description: "Ceramic mug with legal rights reminder",
    image: "☕",
    inStock: true,
  },
  {
    id: "4",
    name: "Know Your Rights Cap",
    category: "Accessories",
    price: 24.99,
    description: "Adjustable cap with embroidered logo",
    image: "🧢",
    inStock: true,
  },
  {
    id: "5",
    name: "Legal Reference Poster",
    category: "Home & Office",
    price: 34.99,
    description: "High-quality poster of your constitutional rights",
    image: "🖼️",
    inStock: true,
  },
  {
    id: "6",
    name: "Rights Reminder Sticker Pack",
    category: "Accessories",
    price: 9.99,
    description: "Set of 10 waterproof stickers",
    image: "🎫",
    inStock: true,
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [cart, setCart] = useState<string[]>([]);

  const categories = ["All", "Apparel", "Accessories", "Home & Office"];

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (productId: string) => {
    setCart([...cart, productId]);
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />

      {/* Header */}
      <header className="border-b border-border bg-panel/50 backdrop-blur-xl">
        <div className="mx-auto max-w-container px-7 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-xl font-extrabold tracking-tight text-text">
              I Want My Lawyer Present
            </a>
            <span className="text-muted">|</span>
            <span className="text-sm text-muted">Merchandise</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button type="button" className="relative" aria-label="View cart">
              <svg className="h-6 w-6 text-muted hover:text-brand transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-brand text-bg text-xs flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>
            <a href="/shop/account" className="text-sm font-semibold text-muted hover:text-text transition-colors">
              Account
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-container px-7 py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-text">
            Shop Products
          </h1>
          <p className="mt-2 text-muted">Premium legal rights merchandise</p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                selectedCategory === category
                  ? "bg-brand text-bg shadow-neon"
                  : "bg-panel text-muted hover:text-text border border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlowCard className="p-6 h-full flex flex-col">
                <div className="text-6xl mb-4 text-center">{product.image}</div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-extrabold tracking-tight text-text">
                      {product.name}
                    </h3>
                    <span className="text-brand font-bold text-lg">
                      ${product.price}
                    </span>
                  </div>
                  
                  <p className="text-xs text-muted mb-2">{product.category}</p>
                  <p className="text-sm text-muted mb-4">{product.description}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => addToCart(product.id)}
                    disabled={!product.inStock}
                    className="flex-1"
                  >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                  {cart.filter(id => id === product.id).length > 0 && (
                    <span className="text-brand text-sm font-semibold">
                      +{cart.filter(id => id === product.id).length}
                    </span>
                  )}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
