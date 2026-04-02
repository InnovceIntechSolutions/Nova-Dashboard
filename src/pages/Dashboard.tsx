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

interface DashboardProps {
  layoutData: WidgetLayout[];
}

const componentMap: { [key: string]: React.ComponentType<any> } = {
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
};

const Dashboard: React.FC<DashboardProps> = ({ layoutData }) => {
  const renderWidget = (item: WidgetLayout) => {
    const Component = componentMap[item.component];
    return Component ? <Component {...item.props} /> : <Shimmer />;
  };

  const getGridColSpan = (span: number) => {
    return `span ${Math.min(span, 12)}`;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        {layoutData.map((item: WidgetLayout) => (
          <div
            key={item.id}
            className="dashboard-widget"
            style={{
              gridColumn: getGridColSpan(item.position.span || 3),
                gridRow: `span ${item.position.row || 1}`,
            }}
          >
            {renderWidget(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;