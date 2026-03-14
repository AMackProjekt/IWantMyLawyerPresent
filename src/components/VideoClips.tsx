import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { LINK_NAMESPACES } from '../config/linkNamespaces';

export default function VideoClips() {
  return (
    <section id="video-clips" className="py-20 bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 font-semibold mb-4">
            <PlayCircle className="w-5 h-5" />
            Video Clips
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Watch The Brand In Motion
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Drop in your final video clip links anytime using the embedded-video-clips namespace.
          </p>
        </motion.div>

        <div className="mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Marketing Reels From Gallery</h3>
          <p className="text-gray-600 mb-6 max-w-3xl">
            These reels are generated from your gallery images to keep media lightweight while still feeling like video ads.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LINK_NAMESPACES.marketingClips.map((clip, index) => (
              <SequenceClipCard
                key={clip.title}
                title={clip.title}
                frames={clip.frames}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LINK_NAMESPACES.videoEmbeds.map((clip, index) => (
            <motion.article
              key={clip.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              <div className="aspect-video bg-gray-100">
                {clip.type === 'embed' ? (
                  <iframe
                    src={clip.src}
                    title={clip.title}
                    className="w-full h-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <video
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                    poster={clip.poster}
                  >
                    <source src={clip.src} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900">{clip.title}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

interface SequenceClipCardProps {
  title: string;
  frames: readonly string[];
  delay: number;
}

function SequenceClipCard({ title, frames, delay }: SequenceClipCardProps) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    if (frames.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames.length);
    }, 950);

    return () => window.clearInterval(timer);
  }, [frames]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
    >
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={frames[frameIndex]}
            src={frames[frameIndex]}
            alt={`${title} frame`}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            loading="lazy"
          />
        </AnimatePresence>

        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-semibold tracking-wide">
          Marketing Clip
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900">{title}</h3>
      </div>
    </motion.article>
  );
}
