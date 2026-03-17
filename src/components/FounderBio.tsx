import { motion } from 'framer-motion';
import { Award, BookOpen, Users, Heart } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export default function FounderBio() {
  const { content } = useSiteContent();

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image/Profile Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={content.media.founderProfileImage}
                  alt="Brian Mason"
                  className="aspect-[3/4] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {content.founder.name}
                  </h3>
                  <p className="text-blue-200">{content.founder.role}</p>
                </div>
              </div>
            </motion.div>

            {/* Bio Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8 text-yellow-500" />
                <span className="text-primary-600 font-semibold text-lg">
                  {content.founder.storyLabel}
                </span>
              </div>

              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {content.founder.headline}
              </h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>{content.founder.paragraph1}</p>

                <p>{content.founder.paragraph2}</p>

                <p>{content.founder.paragraph3}</p>

                <p className="font-semibold text-primary-700">
                  {content.founder.quote}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    30+
                  </div>
                  <div className="text-sm text-gray-600">Product Variants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    4+
                  </div>
                  <div className="text-sm text-gray-600">Payment Options</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    100%
                  </div>
                  <div className="text-sm text-gray-600">Authentic Brand</div>
                </div>
              </div>

              {/* Mission Icons */}
              <div className="flex gap-4 mt-8">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <BookOpen className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Product Drops
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Customer Love
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Brand Community
                  </span>
                </div>
              </div>

              <div
                id="book-launch"
                className="mt-8 overflow-hidden rounded-2xl border border-primary-200 bg-white shadow-lg"
              >
                <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-blue-600 px-5 py-3">
                  <p className="text-xs font-mono tracking-wide text-white/90">
                    namespace: {content.bookLaunch.namespace}
                  </p>
                </div>

                <div className="grid gap-5 p-5 md:grid-cols-[160px_1fr]">
                  <div className="rounded-xl border border-primary-100 bg-gray-50 p-2">
                    <img
                      src={content.media.bookCoverImage}
                      alt="Founder book cover"
                      className="h-full w-full rounded-lg object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-primary-900">
                      {content.bookLaunch.title}
                    </h3>
                    <p className="mt-2 text-primary-700">
                      {content.bookLaunch.description}
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-lg border border-primary-100 bg-primary-50 px-3 py-2">
                        <p className="text-xs uppercase tracking-wide text-primary-700">Launch Date</p>
                        <p className="text-sm font-semibold text-primary-900">{content.bookLaunch.launchDate}</p>
                      </div>
                      <div className="rounded-lg border border-primary-100 bg-primary-50 px-3 py-2">
                        <p className="text-xs uppercase tracking-wide text-primary-700">Pre-Order</p>
                        <p className="text-sm font-semibold text-primary-900">{content.bookLaunch.preOrderStatus}</p>
                      </div>
                      <div className="rounded-lg border border-primary-100 bg-primary-50 px-3 py-2">
                        <p className="text-xs uppercase tracking-wide text-primary-700">Media Kit</p>
                        <p className="text-sm font-semibold text-primary-900">{content.bookLaunch.mediaKitStatus}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        disabled
                        className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white opacity-70"
                      >
                        {content.bookLaunch.preOrderButton}
                      </button>
                      <button
                        type="button"
                        disabled
                        className="rounded-lg border border-primary-300 bg-white px-4 py-2 text-sm font-semibold text-primary-700 opacity-70"
                      >
                        {content.bookLaunch.mediaKitButton}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
