import { motion } from 'framer-motion';
import { Phone, Mail, FileText, Shield } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export default function CallToAction() {
  const { content } = useSiteContent();

  return (
    <section id="contact" className="py-20 gradient-bg">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {content.contact.heading}
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {content.contact.subheading}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <ActionCard
            icon={<Phone className="w-8 h-8" />}
            title={content.contact.card1Title}
            description={content.contact.card1Description}
            link="#"
            delay={0.1}
          />
          <ActionCard
            icon={<Mail className="w-8 h-8" />}
            title={content.contact.card2Title}
            description={content.contact.card2Description}
            link="#"
            delay={0.2}
          />
          <ActionCard
            icon={<FileText className="w-8 h-8" />}
            title={content.contact.card3Title}
            description={content.contact.card3Description}
            link="#"
            delay={0.3}
          />
          <ActionCard
            icon={<Shield className="w-8 h-8" />}
            title={content.contact.card4Title}
            description={content.contact.card4Description}
            link="#"
            delay={0.4}
          />
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {content.contact.formTitle}
          </h3>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="John"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="john.doe@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                What Do You Need?
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Tell us what items or order details you need help with..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transform hover:scale-105 transition-all shadow-lg"
            >
              Send Message
            </button>

            <p className="text-sm text-gray-500 text-center">
              By submitting this form, you agree to our privacy policy. We will
              never share your information.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  delay: number;
}

function ActionCard({ icon, title, description, link, delay }: ActionCardProps) {
  return (
    <motion.a
      href={link}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
    >
      <div className="text-yellow-400 mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-blue-100 text-sm">{description}</p>
    </motion.a>
  );
}
