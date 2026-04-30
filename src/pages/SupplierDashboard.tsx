import React, { useEffect, useState } from 'react';
import type { WidgetLayout } from '../constants/types';
import { fetchDashboardData } from '../services/dashboardapi'; // adjust path 
import { useSearch } from '../Context/SearchContext';
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
import IssuesDeviations from '../components/IssueDeviations';
import PaymentTrend from '../components/PaymentTrend';
import InvoiceBreakdown from '../components/Invoicebreakdown';
import { useParams, useSearchParams } from 'react-router-dom';
interface DashboardProps {
  layoutData: WidgetLayout[];
  title?: string;
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
  IssuesDeviations,
  PaymentTrend,
  InvoiceBreakdown
};

const SupplierDashboard: React.FC<DashboardProps> = ({ layoutData ,title}) => {
  const [dataMap, setDataMap] = useState<Record<string, any>>({});
  const { filters } = useSearch();
  const searchParams = useSearchParams();
  const name = searchParams[0].get('name') ?? undefined;
  // Re-fetch whenever filters change
  useEffect(() => {
    const loadData = async () => {
      const results: Record<string, any> = { ...dataMap };

      await Promise.all(
        layoutData.map(async (item) => {
          if (item.endpoint) {
            try {
              const type = item.apitype || 'Status Card';
              const data = await fetchDashboardData(
                type,
                item.endpoint,
                name,
                item.slotId,
                filters           // pass filters here
              );
                if (data !== undefined && data !== null) {

  results[item.id] = {
    ...results[item.id], // keeps original id
    ...data              // update everything else
  };
}else{
  results[item.id] = {
    id: item.id, // keeps original id
    title:item.title|| '',
    ...data              // update everything else
  };// set to null or undefined
}

            } catch (err) {
              console.error(`Error loading ${item.endpoint}`, err);
            }
          }
        })
      );

      setDataMap(results);
    };

    loadData();
  }, [layoutData, filters]);  // re-run when filters change

  const renderWidget = (item: WidgetLayout) => {
    const Component = componentMap[item.component];
    if (!Component) return <Shimmer />;

    const apiData = dataMap[item.id];

    if (item.endpoint && apiData === undefined) {
      return <Shimmer />;
    }

    if (item.component === 'Table' && apiData) {
      return <Component {...apiData} style={item.style || {}} />;
    }

    //  FIX FOR CHART
    if (item.component === "Chart" && apiData) {
      const chartData = apiData.data
        ? apiData.data //for bar-line
        : {
          labels: apiData.labels || [],
          datasets: apiData.datasets || [],
        }; // for bar
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
      <Header title={title} />
      <div className="container" style={{ maxWidth: '1600px' }}>
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

export default SupplierDashboard;