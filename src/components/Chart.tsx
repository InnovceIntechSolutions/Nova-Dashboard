
// Chart.tsx  –  Orchestrator: picks the right chart component

import LineChart     from '../components/charts/Linechart/LineChart';
import BarChart      from '../components/charts/Barchart/BarChart';
import PieChart      from '../components/charts/Piechart/PieChart';
import DoughnutChart from '../components/charts/DoughnutChart/DoughnutChart';
import HalfDoughnutChart from '../components/charts/Halfdoughnutchart/HalfDoughnutChart';
import GaugeChart       from '../components/charts/Gaugechart/GaugeChart';
import RadarChart   from '../components/charts/Radarchart/RadarChart';
import type { ChartProps } from '../Types/types';

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '400px'
  },
  header: {
    marginBottom: 8,
  },
  title: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: '#111827',
  },
  subtitle: {
    margin: '2px 0 0',
    fontSize: 13,
    color: '#6b7280',
  },
  chartWrapper: {
    flex: 1,
    minHeight: 0,
  },
  statsRow: {
    display: 'flex',
    gap: 16,
    marginTop: 12,
    flexWrap: 'wrap',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: '1 1 80px',
  },
  statLabel: {
    fontSize: 11,
    color: '#9ca3af',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 700,
    color: '#111827',
  },
  noData: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    color: '#9ca3af',
    fontSize: 14,
  },
};

const Chart: React.FC<ChartProps> = ({
  title = 'Chart',
  subtitle,
  chartType = 'line',
  data,
  options = {},
  stats,
}) => {
  if (!data) {
    return (
      <div className="card card-body chart-container" style={styles.noData}>
        No data available
      </div>
    );
  }

  const renderChart = () => {
    const sharedProps = { data, options };
    switch (chartType) {
      case 'bar':      return <BarChart      {...sharedProps} />;
      case 'pie':      return <PieChart      {...sharedProps} />;
      case 'doughnut': return <DoughnutChart {...sharedProps} />;
      case 'radar':    return <RadarChart    {...sharedProps} />;
      case 'halfDoughnut':  return <HalfDoughnutChart {...sharedProps} />;
      case 'gauge':         return <GaugeChart        {...sharedProps} />;
      case 'line':
      default:         return <LineChart     {...sharedProps} />;
    }
  };

  return (
    <div className="card card-body chart-container" style={styles.container}>
      <div style={styles.header}>
        <h5 style={styles.title}>{title}</h5>
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
      </div>

      <div className="chart-wrapper" style={styles.chartWrapper}>
        {renderChart()}
      </div>

      {stats && stats.length > 0 && (
        <div style={styles.statsRow}>
          {stats.map((stat, idx) => (
            <div key={idx} style={styles.statItem}>
              <span style={styles.statLabel}>{stat.label}</span>
              <span style={styles.statValue}>{stat.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chart;