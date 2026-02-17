import { motion } from 'framer-motion';
import { Shield, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';

export default function WhyItMatters() {
  const rights = [
    {
      title: 'Right to Remain Silent',
      description:
        "You are not required to answer questions. Anything you say can be used against you in court. Simply state: 'I invoke my right to remain silent.'",
      icon: <AlertCircle className="w-8 h-8" />,
    },
    {
      title: 'Right to an Attorney',
      description:
        "You have the constitutional right to have an attorney present during questioning. State clearly: 'I want my lawyer present.'",
      icon: <Shield className="w-8 h-8" />,
    },
    {
      title: 'Right to Refuse Searches',
      description:
        'Without a warrant or probable cause, you can refuse consent to search your vehicle, home, or person. Say: "I do not consent to any searches."',
      icon: <BookOpen className="w-8 h-8" />,
    },
    {
      title: 'Right to Leave',
      description:
        'If you are not under arrest, you have the right to leave. Politely ask: "Am I free to go?" If yes, you can calmly walk away.',
      icon: <CheckCircle className="w-8 h-8" />,
    },
  ];

  return (
    <section id="rights" className="py-20 bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Why It Matters
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding and exercising your constitutional rights can be the
            difference between freedom and wrongful conviction.
          </p>
        </motion.div>

        {/* Rights Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {rights.map((right, index) => (
            <motion.div
              key={right.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-start gap-4">
                <div className="text-primary-600 flex-shrink-0">{right.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {right.title}
                  </h3>
                  <p className="text-gray-600">{right.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-yellow-50 rounded-2xl p-8 border-2 border-yellow-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Remember These Key Principles
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-900">1</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Stay Calm</h4>
              <p className="text-gray-600 text-sm">
                Remain polite and cooperative, but firmly assert your rights.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-900">2</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Don't Resist</h4>
              <p className="text-gray-600 text-sm">
                Never physically resist arrest, even if you believe it's unlawful.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-900">3</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Call Immediately</h4>
              <p className="text-gray-600 text-sm">
                Contact a lawyer as soon as possible after any police encounter.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Warning Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-red-50 border-l-4 border-red-600 p-6 rounded-lg"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-bold text-red-900 mb-2">
                Critical Warning
              </h4>
              <p className="text-red-800">
                Anything you say to police can and will be used against you in
                court. Officers are legally allowed to lie and use deceptive
                tactics. The safest response is always: "I want my lawyer present"
                and then remain silent until legal counsel arrives.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
