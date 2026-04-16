import React from 'react';
import type { WidgetLayout } from '../constants/types';

import Calendar from '../components/Calendar';
import Chart from '../components/Chart';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import StatsCard from '../components/StatsCard';
import Card from '../components/Card';
import Shimmer from '../components/Shimmer';
import TaskList from '../components/TaskList';
import Timeline from '../components/Timeline';
import IssuesSummary from '../components/IssuesSummary';
import FinancialSummary from '../components/FinancialSummary';
import QuickActions from '../components/QuickActions';
import HeatmapChart from '../components/Heatmap/HeatmapOnCartesian';

interface DashboardProps {
  layoutData: WidgetLayout[];
}

const componentMap: Record<string, React.ComponentType<any>> = {
  Chart,
  ProgressBar,
  StatsCard,
  Calendar,
  Header,
  Card,
  TaskList,
  Timeline,
  IssuesSummary,
  FinancialSummary,
  QuickActions,
  HeatmapChart
};

const Dashboard: React.FC<DashboardProps> = ({ layoutData }) => {
  
  // ✅ Render component safely
  const renderWidget = (item: WidgetLayout) => {
    const Component = componentMap[item.component];
    if (!Component) return <Shimmer />;

    return <Component {...item.props} style={item.style || {}}/>;
  };

  // ✅ Bootstrap column mapping
  const getColClass = (span: number) => {
    const safeSpan = Math.min(Math.max(span, 1), 12);
    return `col-12 col-md-${safeSpan}`;
  };

  // ✅ Group by row
  const groupedByRow = layoutData.reduce<Record<number, WidgetLayout[]>>(
    (acc, item) => {
      const row = item.position?.row ?? 0;

      if (!acc[row]) acc[row] = [];

      acc[row].push(item);
      return acc;
    },
    {}
  );

  // ✅ Sort rows
  const sortedRows = Object.keys(groupedByRow)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <>
    <Header />
    <div className="container">
      
      {sortedRows.map((row) => {
        const widgets = groupedByRow[row];

        // ✅ Sort columns inside row
        const sortedWidgets = widgets.sort(
          (a, b) => (a.position?.column ?? 0) - (b.position?.column ?? 0)
        );

        return (
          <div key={row} className="row g-3 mb-2">
            {sortedWidgets.map((item) => (
              <div
                key={item.id}
                className={getColClass(item.position?.span || 12)}
              >
                <div
                 
                  className="h-100"
                >
                  {renderWidget(item)}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>

    </>
  );
};

export default Dashboard;