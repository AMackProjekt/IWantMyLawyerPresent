"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border/50 bg-panel/50 backdrop-blur-xl overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 footer-grid-bg" />
      </div>

      {/* Glowing top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent animate-pulse" />

      <div className="relative mx-auto max-w-container px-7 py-12">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Logo with glow effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative text-center"
          >
            <div className="text-5xl mb-3">⚖️</div>
            <div className="text-xl font-extrabold tracking-tight text-text">
              I Want My Lawyer Present
            </div>
          </motion.div>

          {/* Neon text with electric effect */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="text-center">
              <div className="relative inline-block">
                <span className="relative text-sm text-muted">
                  Know Your Rights • Protect Your Freedom
                </span>
              </div>
            </div>
          </motion.div>

          {/* Electric line decoration */}
          <div className="w-full max-w-xs h-[1px] bg-gradient-to-r from-transparent via-brand to-transparent animate-pulse" />

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-6 text-xs text-muted/70 font-mono"
          >
            <a href="/privacy" className="hover:text-brand transition-colors">
              Privacy Policy
            </a>
            <span className="text-muted/30">|</span>
            <a href="/terms" className="hover:text-brand transition-colors">
              Terms of Service
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs text-muted/60 text-center font-mono"
          >
            © {new Date().getFullYear()} I Want My Lawyer Present. All rights reserved.
          </motion.p>
        </div>
      </div>

      {/* Animated corner accents */}
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-brand/30 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-brand2/30 animate-pulse animation-delay-500" />
    </footer>
  );
}
