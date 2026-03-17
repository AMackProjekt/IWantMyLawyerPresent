import { motion } from 'framer-motion';
import { Flame, PlayCircle, Sparkles } from 'lucide-react';
import { LINK_NAMESPACES } from '../config/linkNamespaces';
import { useSiteContent } from '../context/SiteContentContext';

export default function LaunchSpotlight() {
  const { content } = useSiteContent();

  const scrollToShop = () => {
    const section = document.getElementById('shop');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen pt-16 overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <img
          src={content.media.launchCoverImage}
          alt="Bold cover launch visual"
          className="h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
      </div>

      <div className="section-container relative z-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-400/50 bg-yellow-300/10 text-yellow-300 font-semibold mb-5">
              <Flame className="w-5 h-5" />
              {content.launch.badge}
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 uppercase tracking-tight">
              {content.launch.titleLine1}
              <br />
              <span className="text-yellow-300">{content.launch.titleLine2}</span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToShop}
                className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-all shadow-xl"
              >
                {content.launch.primaryCta}
              </button>
              <a
                href="#video-clips"
                className="px-8 py-4 border-2 border-white/60 text-white font-bold rounded-lg hover:bg-white/10 transition-all text-center"
              >
                {content.launch.secondaryCta}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut', delay: 0.15 }}
            className="space-y-4"
          >
            <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/40 backdrop-blur-sm">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/15">
                <div className="inline-flex items-center gap-2 text-yellow-300 font-semibold">
                  <PlayCircle className="w-5 h-5" />
                  {content.launch.videoTitle}
                </div>
                <div className="inline-flex items-center gap-1 text-xs uppercase tracking-wide text-gray-300">
                  <Sparkles className="w-4 h-4" />
                  {content.launch.videoTag}
                </div>
              </div>

              <video
                className="w-full aspect-video object-cover"
                poster={content.media.launchPosterImage}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
              >
                <source src={content.media.launchPrimaryVideo} type="video/mp4" />
              </video>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden border border-white/20 bg-black/40">
                <img
                  src={content.media.bookCoverImage}
                  alt="Book cover preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-white/20 bg-black/40">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={content.media.launchSecondaryVideo} type="video/mp4" />
                </video>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
