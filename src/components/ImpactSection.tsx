import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Clock, AlertTriangle } from 'lucide-react';
import { LocationFilter } from '../types';
import { statisticsData } from '../data/statistics';
import StatsCounter from './StatsCounter';
import GeographicFilter from './GeographicFilter';

export default function ImpactSection() {
  const [activeFilter, setActiveFilter] = useState<LocationFilter>('unitedStates');

  const getFilteredCount = () => {
    return statisticsData.byLocation[activeFilter];
  };

  return (
    <section id="statistics" className="py-20 bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Impact Metrics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real numbers showing the devastating impact of police encounters
            without legal representation
          </p>
        </motion.div>

        {/* Geographic Filter */}
        <GeographicFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Main stats grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card text-center"
          >
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
            <StatsCounter
              end={getFilteredCount()}
              label="Preventable Cases"
              duration={2.5}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card text-center"
          >
            <div className="flex justify-center mb-4">
              <Users className="w-12 h-12 text-blue-600" />
            </div>
            <StatsCounter
              end={statisticsData.impactMetrics.livesAffected}
              label="Lives Directly Affected"
              duration={2.5}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card text-center"
          >
            <div className="flex justify-center mb-4">
              <Heart className="w-12 h-12 text-pink-600" />
            </div>
            <StatsCounter
              end={statisticsData.impactMetrics.familiesImpacted}
              label="Families Impacted"
              duration={2.5}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card text-center"
          >
            <div className="flex justify-center mb-4">
              <Clock className="w-12 h-12 text-orange-600" />
            </div>
            <div className="text-5xl sm:text-6xl font-bold text-primary-600 mb-2">
              {statisticsData.impactMetrics.averageYearsServed}
            </div>
            <div className="text-lg sm:text-xl text-gray-600">
              Avg Years Wrongfully Served
            </div>
          </motion.div>
        </div>

        {/* Before/After Scenarios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Without Lawyer */}
          <div className="card bg-red-50 border-2 border-red-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">✗</span>
              </div>
              <h3 className="text-2xl font-bold text-red-900">
                Without Legal Representation
              </h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Higher risk of self-incrimination during questioning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Potential for coerced confessions and false statements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Lack of understanding of constitutional rights</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Increased likelihood of wrongful conviction</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Average of 7.3 years lost to wrongful imprisonment</span>
              </li>
            </ul>
          </div>

          {/* With Lawyer */}
          <div className="card bg-green-50 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-green-900">
                With Legal Representation
              </h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Protection from self-incrimination and illegal tactics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Expert guidance through complex legal procedures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Clear understanding and enforcement of your rights</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Significantly reduced risk of wrongful conviction</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Your freedom and future properly protected</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
