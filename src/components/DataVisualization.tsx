import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { statisticsData, incidentTypeColors } from '../data/statistics';

export default function DataVisualization() {
  // Prepare data for incident breakdown pie chart
  const incidentData = [
    {
      name: 'Traffic Stops',
      value: statisticsData.breakdown.trafficStops,
      color: incidentTypeColors.trafficStops,
    },
    {
      name: 'Illegal Searches',
      value: statisticsData.breakdown.illegalSearches,
      color: incidentTypeColors.illegalSearches,
    },
    {
      name: 'Abuse of Badge',
      value: statisticsData.breakdown.abuseOfBadge,
      color: incidentTypeColors.abuseOfBadge,
    },
    {
      name: 'Other',
      value: statisticsData.breakdown.other,
      color: incidentTypeColors.other,
    },
  ];

  // Prepare data for yearly trend line chart
  const trendData = statisticsData.yearlyTrend;

  return (
    <section className="py-20 bg-gray-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            The Data Behind The Crisis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visual breakdown of wrongful convictions that could have been
            prevented with proper legal representation
          </p>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Pie Chart - Incident Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Breakdown by Incident Type
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incidentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {incidentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {incidentData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-700">
                    {item.name}: {item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bar Chart - Incident Types */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Cases by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incidentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {incidentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Line Chart - Yearly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Trend Over Time (2018-2023)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="cases"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: '#ef4444', r: 6 }}
                activeDot={{ r: 8 }}
                name="Preventable Cases"
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-center text-gray-600 mt-4">
            <span className="text-red-600 font-bold">
              ↑ {Math.round(((477 - 287) / 287) * 100)}% increase
            </span>{' '}
            in preventable wrongful convictions over 5 years
          </p>
        </motion.div>
      </div>
    </section>
  );
}
