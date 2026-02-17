import { ConvictionStats } from '../types';

// Mock statistical data for demonstration purposes
// Note: These are sample numbers for demonstration only
export const statisticsData: ConvictionStats = {
  totalCases: 2847,
  preventableWithLawyer: 2104,
  breakdown: {
    trafficStops: 892,
    illegalSearches: 624,
    abuseOfBadge: 413,
    other: 175,
  },
  byLocation: {
    sanDiego: 347,
    california: 1256,
    unitedStates: 2104,
  },
  yearlyTrend: [
    { year: 2018, cases: 287 },
    { year: 2019, cases: 312 },
    { year: 2020, cases: 298 },
    { year: 2021, cases: 341 },
    { year: 2022, cases: 389 },
    { year: 2023, cases: 477 },
  ],
  impactMetrics: {
    livesAffected: 2104,
    familiesImpacted: 6312,
    averageYearsServed: 7.3,
  },
};

export const incidentTypeColors = {
  trafficStops: '#3b82f6',
  illegalSearches: '#ef4444',
  abuseOfBadge: '#f59e0b',
  other: '#8b5cf6',
};

export const locationLabels = {
  sanDiego: 'San Diego',
  california: 'California',
  unitedStates: 'United States',
};
