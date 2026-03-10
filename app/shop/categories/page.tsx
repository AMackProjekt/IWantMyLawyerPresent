"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";

const categories = [
  {
    id: "apparel",
    name: "Apparel",
    description: "Premium clothing featuring legal rights messages",
    icon: "👕",
    productCount: 12,
    featured: true,
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Everyday items to remind you of your rights",
    icon: "🎒",
    productCount: 8,
    featured: true,
  },
  {
    id: "home-office",
    name: "Home & Office",
    description: "Educational and decorative items for your space",
    icon: "🏠",
    productCount: 6,
    featured: false,
  },
  {
    id: "books-media",
    name: "Books & Media",
    description: "Legal education materials and resources",
    icon: "📚",
    productCount: 15,
    featured: false,
  },
  {
    id: "gifts",
    name: "Gift Sets",
    description: "Curated collections of legal rights merchandise",
    icon: "🎁",
    productCount: 5,
    featured: true,
  },
  {
    id: "legal-kits",
    name: "Legal Kits",
    description: "Essential legal reference materials and tools",
    icon: "⚖️",
    productCount: 4,
    featured: false,
  },
];

export default function CategoriesPage() {
  const router = useRouter();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const navigateToProducts = (categoryId: string) => {
    router.push(`/shop/products?category=${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />

      {/* Header */}
      <header className="border-b border-border bg-panel/50 backdrop-blur-xl">
        <div className="mx-auto max-w-container px-7 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push("/shop/products")} 
              className="text-brand hover:text-brand2 transition-colors"
            >
              ← Back to Products
            </button>
          </div>
          <a 
            href="/shop/account" 
            className="text-sm font-semibold text-muted hover:text-text transition-colors"
          >
            Account
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-container px-7 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-text mb-2">
            Product Categories
          </h1>
          <p className="text-muted">Browse our collection by category</p>
        </motion.div>

        {/* Featured Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8"
        >
          <h2 className="text-xl font-extrabold tracking-tight text-text mb-4 flex items-center gap-2">
            <span className="text-brand">⭐</span>
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {categories.filter(cat => cat.featured).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <a href={`/shop/products?category=${category.id}`}>
                  <GlowCard 
                    className={`p-6 h-full flex flex-col cursor-pointer transition-all ${
                      hoveredCategory === category.id ? "shadow-neon scale-105" : ""
                    }`}
                  >
                    <div className="text-6xl mb-4">{category.icon}</div>
                    
                    <h3 className="text-xl font-extrabold tracking-tight text-text mb-2">
                      {category.name}
                    </h3>
                    
                    <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs text-muted">
                        {category.productCount} products
                      </span>
                      <span className="text-brand text-sm font-semibold">
                        Browse →
                      </span>
                    </div>
                  </GlowCard>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-extrabold tracking-tight text-text mb-4">
            All Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <a href={`/shop/products?category=${category.id}`}>
                  <GlowCard 
                    className={`p-6 cursor-pointer transition-all ${
                      hoveredCategory === category.id ? "shadow-neon" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{category.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-extrabold tracking-tight text-text">
                          {category.name}
                        </h3>
                        <p className="text-xs text-muted mt-1">
                          {category.productCount} products
                        </p>
                      </div>
                      <svg 
                        className="h-5 w-5 text-brand" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7" 
                        />
                    </svg>
                  </div>
                </GlowCard>
              </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
