import { motion } from 'framer-motion';
import { Scale, Shield } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export default function Hero() {
  const { content } = useSiteContent();

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center gradient-bg overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="section-container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <Scale className="w-12 h-12 text-yellow-400" />
              <Shield className="w-12 h-12 text-yellow-400" />
            </motion.div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {content.hero.line1}
              <br />
              {content.hero.line2}
              <br />
              <span className="text-yellow-400">{content.hero.highlight}</span>
            </h1>

            <p className="text-xl sm:text-2xl text-blue-100 mb-8 leading-relaxed">
              {content.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('shop')}
                className="px-8 py-4 bg-yellow-400 text-primary-900 font-semibold rounded-lg text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all shadow-lg"
              >
                {content.hero.primaryCta}
              </button>
              <button
                onClick={() => scrollToSection('support')}
                className="px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-lg text-lg hover:bg-white/20 transform hover:scale-105 transition-all border-2 border-white/30"
              >
                {content.hero.secondaryCta}
              </button>
            </div>
          </motion.div>

          {/* Right column - Animated stats preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-red-500/20 rounded-2xl blur-2xl"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                  <StatCard
                    number={content.hero.stat1Number}
                    label={content.hero.stat1Label}
                    delay={0.5}
                  />
                  <StatCard
                    number={content.hero.stat2Number}
                    label={content.hero.stat2Label}
                    delay={0.7}
                  />
                  <StatCard
                    number={content.hero.stat3Number}
                    label={content.hero.stat3Label}
                    delay={0.9}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-white/60 flex flex-col items-center cursor-pointer"
          onClick={() => scrollToSection('shop')}
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

interface StatCardProps {
  number: string;
  label: string;
  delay: number;
}

function StatCard({ number, label, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col"
    >
      <span className="text-4xl font-bold text-yellow-400 mb-1">{number}</span>
      <span className="text-sm text-blue-100">{label}</span>
    </motion.div>
  );
}
