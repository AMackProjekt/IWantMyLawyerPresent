import { motion } from 'framer-motion';
import { Award, BookOpen, Users, Heart } from 'lucide-react';

export default function FounderBio() {
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
                <div className="aspect-[3/4] bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                  <Users className="w-32 h-32 text-white/30" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    [Founder Name]
                  </h3>
                  <p className="text-blue-200">
                    Founder & Legal Rights Advocate
                  </p>
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
                  From Adversity to Advocacy
                </span>
              </div>

              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                A Journey of Resilience & Justice
              </h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  After serving over 20 years of incarceration, [Founder Name]
                  emerged with an unshakeable commitment to ensuring others
                  never face the injustices that marked their journey through
                  the criminal justice system.
                </p>

                <p>
                  Their firsthand experience revealed critical gaps in legal
                  representation and awareness of constitutional rights—gaps
                  that too often lead to wrongful convictions and decades of
                  lost freedom.
                </p>

                <p>
                  Today, [Founder Name] channels that experience into empowering
                  individuals with the knowledge and resources they need to
                  protect their rights during police encounters. Through this
                  platform, they're building a movement to prevent others from
                  enduring similar hardships.
                </p>

                <p className="font-semibold text-primary-700">
                  "Knowledge of your rights isn't just power—it's protection.
                  It's the difference between freedom and a lifetime of regret."
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    20+
                  </div>
                  <div className="text-sm text-gray-600">
                    Years Experience
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    1000+
                  </div>
                  <div className="text-sm text-gray-600">Lives Impacted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    100%
                  </div>
                  <div className="text-sm text-gray-600">Dedicated</div>
                </div>
              </div>

              {/* Mission Icons */}
              <div className="flex gap-4 mt-8">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <BookOpen className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Education
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Advocacy
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Community
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
