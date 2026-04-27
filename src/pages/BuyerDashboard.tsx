import React, { useEffect, useState } from 'react';
import type { WidgetLayout } from '../constants/types';
import { fetchDashboardData } from '../services/dashboardapi'; // adjust path 

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
import SupplierScorecardGrid from '../components/Grid';

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
  HeatmapChart,
  Table: SupplierScorecardGrid, 
};

const BuyerDashboard: React.FC<DashboardProps> = ({ layoutData }) => {
  const [dataMap, setDataMap] = useState<Record<string, any>>({});

  // ✅ Fetch API data for all widgets`
  useEffect(() => {
    const loadData = async () => {
      const results: Record<string, any> = {};

      await Promise.all(
        layoutData.map(async (item) => {
          if (item.endpoint) {
            try {
              let type = "Status Card";

              if (item.component === "TaskList") {
                type = "TaskList";
              }
                if (item.component === "Chart") {
  type = item.chartType || item.props?.chartType || "Bar";
}
// ✅ Table type: fetches scorecard data
              if (item.component === 'Table') {
                type = 'Table';
              }
              const data = await fetchDashboardData(type, item.endpoint,item.param, item.slotId);
              results[item.id] = data;
            } catch (err) {
              console.error(`Error loading ${item.endpoint}`, err);
            }
          }
        })
      );

      setDataMap(results);
    };

    loadData();
  }, [layoutData]);

 const renderWidget = (item: WidgetLayout) => {
  const Component = componentMap[item.component];
  if (!Component) return <Shimmer />;

  const apiData = dataMap[item.id];

  if (item.endpoint && !apiData) {
    return <Shimmer />;
  }

    if (item.component === 'Table' && apiData) {
      return <Component {...apiData} style={item.style || {}} />;
    }

  // ✅ FIX FOR CHART
  if (item.component === "Chart" && apiData) {
     const chartData = apiData.data
    ? apiData.data // ✅ for bar-line
    : {
        labels: apiData.labels || [],
        datasets: apiData.datasets || [],
      }; // ✅ for bar
    return (
      <Component
        title={apiData.title}
        subtitle={apiData.subtitle}
        chartType={apiData.chartType?.toLowerCase()}
        data={chartData}
      />
    );
  }

  return <Component {...apiData} style={item.style || {}} />;
};

  const getColClass = (span: number) => {
    const safeSpan = Math.min(Math.max(span, 1), 12);
    return `col-12 col-md-${safeSpan}`;
  };

  const groupedByRow = layoutData.reduce<Record<number, WidgetLayout[]>>(
    (acc, item) => {
      const row = item.position?.row ?? 0;
      if (!acc[row]) acc[row] = [];
      acc[row].push(item);
      return acc;
    },
    {}
  );

  const sortedRows = Object.keys(groupedByRow)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <>
      <Header />
      <div className="container">
        {sortedRows.map((row) => {
          const widgets = groupedByRow[row];

          const sortedWidgets = widgets.sort(
            (a, b) =>
              (a.position?.column ?? 0) - (b.position?.column ?? 0)
          );

          return (
            <div key={row} className="row g-3 mb-2">
              {sortedWidgets.map((item) => (
                <div
                  key={item.id}
                  className={getColClass(item.position?.span || 12)}
                >
                  <div className="h-100">{renderWidget(item)}</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BuyerDashboard;