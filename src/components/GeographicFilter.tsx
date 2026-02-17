import { motion } from 'framer-motion';
import { LocationFilter } from '../types';
import { locationLabels } from '../data/statistics';

interface GeographicFilterProps {
  activeFilter: LocationFilter;
  onFilterChange: (filter: LocationFilter) => void;
}

export default function GeographicFilter({
  activeFilter,
  onFilterChange,
}: GeographicFilterProps) {
  const filters: Array<{ value: LocationFilter; label: string }> = [
    { value: 'sanDiego', label: locationLabels.sanDiego },
    { value: 'california', label: locationLabels.california },
    { value: 'unitedStates', label: locationLabels.unitedStates },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
      <span className="text-gray-700 font-semibold text-lg">Filter by:</span>
      <div className="flex flex-wrap gap-3 justify-center">
        {filters.map((filter) => (
          <motion.button
            key={filter.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange(filter.value)}
            className={`
              px-6 py-3 rounded-lg font-semibold transition-all
              ${
                activeFilter === filter.value
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            {filter.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
