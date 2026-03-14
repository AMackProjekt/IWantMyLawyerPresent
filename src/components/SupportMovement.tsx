import { motion } from 'framer-motion';
import { HandHeart, Shirt, Megaphone, Users } from 'lucide-react';

const movementImages = [
  '/images/Bold-Cover.JPG',
  '/images/Book-Cover.JPG',
  '/images/IMG_5699.JPG',
  '/images/IMG_5701 (1).JPG',
  '/images/TShirt2.JPG',
  '/images/Womens-Tees.JPG',
];

const supportWays = [
  {
    title: 'Shop New Releases',
    description:
      'Browse featured apparel and accessories from the latest storefront drops.',
    icon: Shirt,
    href: '#shop',
    cta: 'Shop Now',
  },
  {
    title: 'Watch Brand Clips',
    description:
      'See quick videos of product details, fit previews, and launch highlights.',
    icon: Megaphone,
    href: '#video-clips',
    cta: 'Watch Clips',
  },
  {
    title: 'Join The Community',
    description:
      'Follow the brand, tag your looks, and get updates for upcoming product launches.',
    icon: Users,
    href: '#contact',
    cta: 'Connect With Us',
  },
];

export default function SupportMovement() {
  return (
    <section id="support" className="py-20 bg-primary-950 text-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-yellow-300 font-semibold mb-5">
            <HandHeart className="w-5 h-5" />
            Merch Gallery
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {supportWays.map((way, index) => {
            const Icon = way.icon;
            return (
              <motion.article
                key={way.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <Icon className="w-7 h-7 text-yellow-300 mb-4" />
                <h3 className="text-2xl font-bold mb-3">{way.title}</h3>
                <p className="text-primary-100 mb-5">{way.description}</p>
                <a
                  href={way.href}
                  className="inline-block px-5 py-2 rounded-lg bg-yellow-400 text-primary-900 font-semibold hover:bg-yellow-300 transition-colors"
                >
                  {way.cta}
                </a>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6">
            {movementImages.map((imagePath) => (
              <figure
                key={imagePath}
                className="relative overflow-hidden rounded-xl border border-white/10 aspect-square"
              >
                <img
                  src={imagePath}
                  alt="Customer wearing I Want My Lawyer Present merchandise"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </figure>
            ))}
          </div>

          <p className="text-center text-primary-100 text-sm">
            Space-saving update: full gallery sets are now transformed into animated marketing reels in the
            <a href="#video-clips" className="text-yellow-300 font-semibold ml-1 hover:text-yellow-200">Video Clips</a>
            section.
          </p>
        </motion.div>
      </div>
    </section>
  );
}