"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";

export function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-container items-center justify-between px-7 py-4">
        <motion.a
          href="/"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3"
        >
          <span className="text-2xl">⚖️</span>
          <span className="font-extrabold tracking-tight text-text">
            I Want My Lawyer Present
          </span>
        </motion.a>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="/shop/products" className="text-sm font-medium text-brand hover:text-brand2 transition-colors">Shop</a>
          <a href="/shop/categories" className="text-sm font-medium text-muted hover:text-text transition-colors">Categories</a>
          <a href="/#products" className="text-sm font-medium text-muted hover:text-text transition-colors">Products</a>
          <a href="/shop/account" className="text-sm font-medium text-muted hover:text-text transition-colors">My Account</a>
        </nav>

        <div className="flex items-center gap-3">
          {mounted && <ThemeToggle />}
          <Button variant="primary" href="/shop/products">
            Shop Now
          </Button>
        </div>
      </div>
    </header>
  );
}
