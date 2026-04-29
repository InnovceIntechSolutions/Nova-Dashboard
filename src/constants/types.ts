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
  apitype: string; 
  endpoint?: string; // ADD THIS
  props?: WidgetProps; // make optional
  style?: React.CSSProperties; // optional
  position: LayoutPosition;
  slotId?: string; // optional
  chartType?: string;
  param?: string;  
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


 
export interface SupplierScorecardProps extends WidgetProps {
  Title?: string;       // Card heading e.g. "Supplier ScoreCard"
  Subtitle?: string;    // e.g. "Top 10 Suppliers - Last 6 Months"
  Icon?: string;        // e.g. "⭐"
  label1?: string;      // Column header: Supplier
  label2?: string;      // Column header: Quality
  label3?: string;      // Column header: On-Time
  label4?: string;      // Column header: Pricing
  label5?: string;      // Column header: Overall
  value1?: string[];    // Supplier names
  value2?: string[];    // Quality scores  (numeric strings e.g. "95.00")
  value3?: string[];    // On-Time scores  (numeric strings)
  value4?: string[];    // Pricing labels  ("GOOD" | "FAIR" | "POOR")
  value5?: string[];    // Overall scores  (numeric strings)
}