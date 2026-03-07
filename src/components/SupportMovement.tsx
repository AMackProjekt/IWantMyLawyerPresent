import { motion } from 'framer-motion';
import { HandHeart, Shirt, Megaphone, Users } from 'lucide-react';

const movementImages = [
  '/images/IMG_5698.JPG',
  '/images/IMG_5699.JPG',
  '/images/IMG_5701 (1).JPG',
  '/images/IMG_5702.JPG',
  '/images/IMG_5703.JPG',
  '/images/IMG_5707.JPG',
  '/images/IMG_5708.jpg',
  '/images/IMG_5709.JPG',
  '/images/TShirt2.JPG',
  '/images/TShirt3.JPG',
];

const supportWays = [
  {
    title: 'Wear The Message',
    description:
      'T-shirts and hoodies help fund rights education while keeping visibility high in the community.',
    icon: Shirt,
    href: '#shop',
    cta: 'Shop Apparel',
  },
  {
    title: 'Sponsor Outreach',
    description:
      'Support events, materials, and workshops that teach people how to protect their rights.',
    icon: Megaphone,
    href: '#contact',
    cta: 'Sponsor A Program',
  },
  {
    title: 'Join The Community',
    description:
      'Become part of a network advocating for legal awareness, justice reform, and second chances.',
    icon: Users,
    href: '#contact',
    cta: 'Get Involved',
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
            Support The Movement
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Stand With Justice In Action
          </h2>
          <p className="text-lg sm:text-xl text-primary-100 max-w-3xl mx-auto">
            Every order, share, and sponsorship helps expand legal education and
            protect communities from preventable injustice.
          </p>
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {movementImages.map((imagePath) => (
              <figure
                key={imagePath}
                className="relative overflow-hidden rounded-xl border border-white/10 aspect-square"
              >
                <img
                  src={imagePath}
                  alt="Supporter wearing movement apparel"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </figure>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}