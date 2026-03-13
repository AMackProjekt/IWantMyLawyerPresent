import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Menu, X, Sun, Moon } from 'lucide-react';
import CartDrawer from './CartDrawer';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme === 'dark' || (!savedTheme && prefersDark)
      ? 'dark'
      : 'light';

    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Shop', href: '#shop' },
    { label: 'Support', href: '#support' },
    { label: 'About', href: '#about' },
    { label: 'Statistics', href: '#statistics' },
    { label: 'Know Your Rights', href: '#rights' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary-900/95 backdrop-blur-md shadow-lg">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <Scale className="w-8 h-8 text-yellow-400 group-hover:rotate-12 transition-transform" />
            <span className="text-white font-bold text-lg hidden sm:block">
              I Want My Lawyer
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white hover:text-yellow-400 font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="text-white hover:text-yellow-400 transition-colors"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            <CartDrawer />
            <a
              href="#shop"
              className="px-6 py-2 bg-yellow-400 text-primary-900 font-semibold rounded-lg hover:bg-yellow-300 transition-all"
            >
              Shop Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-primary-900 border-t border-primary-800"
          >
            <div className="section-container py-4">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-yellow-400 font-medium transition-colors py-2"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex items-center justify-between">
                  <a
                    href="#shop"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 bg-yellow-400 text-primary-900 font-semibold rounded-lg hover:bg-yellow-300 transition-all flex-1 mr-2 text-center"
                  >
                    Shop Now
                  </a>
                  <button
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="p-3 rounded-lg border border-primary-700 text-white hover:text-yellow-400 transition-colors mr-2"
                  >
                    {theme === 'light' ? (
                      <Moon className="w-5 h-5" />
                    ) : (
                      <Sun className="w-5 h-5" />
                    )}
                  </button>
                  <CartDrawer />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
