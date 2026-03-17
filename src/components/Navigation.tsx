import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Menu, X, Sun, Moon } from 'lucide-react';
import CartDrawer from './CartDrawer';
import { useSiteContent } from '../context/SiteContentContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { content } = useSiteContent();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    let savedTheme: string | null = null;
    try {
      savedTheme = localStorage.getItem('theme');
    } catch {
      savedTheme = null;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme === 'dark' || (!savedTheme && prefersDark) ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    try {
      localStorage.setItem('theme', nextTheme);
    } catch {
      // Ignore storage failures and keep the in-memory theme state.
    }
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  const navItems = [
    { label: content.navigation.home, href: '#' },
    { label: content.navigation.shop, href: '#shop' },
    { label: content.navigation.videoClips, href: '#video-clips' },
    { label: content.navigation.gallery, href: '#support' },
    { label: content.navigation.checkout, href: '#checkout' },
    { label: content.navigation.about, href: '#about' },
    { label: content.navigation.contact, href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary-900/95 backdrop-blur-md shadow-lg">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <Scale className="w-8 h-8 text-yellow-400 group-hover:rotate-12 transition-transform" />
            <span className="text-white font-bold text-lg hidden sm:block">
              {content.brandName}
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
              {content.navShopCta}
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
                    {content.navShopCta}
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
