export interface ConvictionStats {
  totalCases: number;
  preventableWithLawyer: number;
  breakdown: {
    trafficStops: number;
    illegalSearches: number;
    abuseOfBadge: number;
    other: number;
  };
  byLocation: {
    sanDiego: number;
    california: number;
    unitedStates: number;
  };
  yearlyTrend: Array<{
    year: number;
    cases: number;
  }>;
  impactMetrics: {
    livesAffected: number;
    familiesImpacted: number;
    averageYearsServed: number;
  };
}

export type LocationFilter = 'sanDiego' | 'california' | 'unitedStates';

export interface IncidentType {
  name: string;
  count: number;
  percentage: number;
  color: string;
}
