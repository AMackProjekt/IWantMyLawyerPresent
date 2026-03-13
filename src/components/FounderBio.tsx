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
                <img
                  src="/images/FoundersProfile.JPG"
                  alt="Brian Mason"
                  className="aspect-[3/4] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Brian Mason
                  </h3>
                  <p className="text-blue-200">Founder/Author/Advocate</p>
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
                  Brian Mason's life is a testament to resilience,
                  accountability, and the relentless pursuit of justice. After
                  serving more than 20 years of incarceration, he emerged with a
                  renewed purpose: to ensure that others never endure the same
                  systemic failures that once defined his experience within the
                  criminal justice system.
                </p>

                <p>
                  Through that journey, he witnessed firsthand the devastating
                  consequences of inadequate legal representation and a
                  widespread lack of awareness surrounding constitutional
                  rights-gaps that continue to contribute to wrongful
                  convictions and decades of lost freedom.
                </p>

                <p>
                  Today, Brian Mason has transformed that hard-earned
                  experience into a mission. He dedicates his work to educating
                  individuals about their constitutional protections and
                  equipping them with the knowledge and confidence needed to
                  safeguard their rights during police encounters. His voice now
                  serves as both a warning and a guide-turning lived experience
                  into a powerful platform for prevention, empowerment, and
                  reform.
                </p>

                <p>
                  Through this movement, he is not only reclaiming his
                  narrative but helping others protect their freedom before it
                  is taken from them.
                </p>

                <p className="font-semibold text-primary-700">
                  "Knowledge of your rights isn't just power-it's protection.
                  It can be the difference between walking free and losing a
                  lifetime."
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

              <div
                id="book-launch"
                className="mt-8 rounded-xl border-2 border-dashed border-primary-300 bg-primary-50 p-5"
              >
                <p className="text-xs font-mono text-primary-700 mb-2">
                  namespace: founders-book-launch
                </p>
                <h3 className="text-xl font-bold text-primary-900 mb-1">
                  Founder Book Launch Placeholder
                </h3>
                <p className="text-primary-700">
                  Upcoming release details, pre-order link, launch date, and
                  media kit will be published here.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
