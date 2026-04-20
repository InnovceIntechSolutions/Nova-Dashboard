// src/constants/types.ts
export type TextAlign = 'left' | 'right' | 'center' | 'justify';  // Ensure these values are correct

export interface LayoutPosition {
  row: number;
  column: number;
  span: number;
}

export interface WidgetProps {
  title?: string;
  subtitle?: string;
  userName?: string;
  slotId?: string;
  selectedDate?: string;
  data?: any;
  chartType?: string;
  style?: React.CSSProperties & { textAlign?: string };
  value?: string | number;
  trend?: any;
  icon?: string;
 details?: Array<{ label: string; value: string | number }>;
  options?: any;
  stats?: Array<{ label: string; value: string }>;
  [key: string]: any; // Allow any additional props
}

export interface WidgetLayout {
  id: string;
  type: string;
  component: string;
  endpoint?: string; // ADD THIS
  props?: WidgetProps; // make optional
  style?: React.CSSProperties; // optional
  position: LayoutPosition;
  slotId?: string; // optional
  chartType?: string;
}
export interface DashboardConfig {
  dashboard: {
    layout: WidgetLayout[];
  };
}

export interface SupplierDashboardConfig  {
  dashboard: {
    layout: WidgetLayout[];
  };
}

// src/constants/types.ts
export interface CalendarProps {
  selectedDate?: string;
  style?: React.CSSProperties;
}