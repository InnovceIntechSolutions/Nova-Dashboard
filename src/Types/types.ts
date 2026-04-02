
// Shared interfaces & constants for all chart components

export type ChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'heatmap';

export interface ChartDataset {
  label?: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  fill?: boolean;
  tension?: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface StatItem {
  label: string;
  value: string;
}

/** Props shared by every individual chart component */
export interface BaseChartProps {
  data: ChartData;
  options?: Record<string, any>;
}

/** Full props for the top-level <Chart /> orchestrator */
export interface ChartProps {
  title?: string;
  subtitle?: string;
  chartType?: ChartType;
  data?: ChartData;
  options?: Record<string, any>;
  stats?: StatItem[];
}

// ─── Shared colour palette 
export const COLORS = [
  '#6366f1', '#f59e0b', '#10b981', '#ef4444',
  '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6',
  '#f97316', '#06b6d4',
];

export const BASE_TEXT_STYLE = {
  color: '#6b7280',
  fontSize: 12,
  fontWeight: '500',
} as const;

export const TOOLTIP_STYLE = {
  backgroundColor: 'rgba(0,0,0,0.85)',
  borderRadius: 8,
  padding: 10,
  textStyle: { color: '#fff', fontSize: 12 },
} as const;

export const LEGEND_STYLE = {
  bottom: 0,
  textStyle: BASE_TEXT_STYLE,
  icon: 'circle',
} as const;

