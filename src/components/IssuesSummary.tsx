// src/components/IssuesSummary.tsx
import React from 'react';

export interface IssueSummary {
  category: string;
  icon: string;
  count: number;
  severity: string;
  details?: Array<Record<string, any>>;
  action?: { label: string; link: string };
}

export interface IssuesSummaryProps {
  title?: string;
  subtitle?: string;
  issues?: IssueSummary[];
  trend?: { current: number; previous: number; changePercent: number; direction: string };
  style?: React.CSSProperties;
}

const IssuesSummary: React.FC<IssuesSummaryProps> = ({ title, subtitle, issues = [], trend, style }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity?.toUpperCase()) {
      case 'HIGH':
        return '#e74c3c';
      case 'MEDIUM':
        return '#f39c12';
      case 'LOW':
        return '#4caf50';
      default:
        return '#95a5a6';
    }
  };

  return (
    <div className="issues-summary card card-body" >
      <div className="card-header-section">
        <h5 className="card-title">{title || 'Issues'}</h5>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>

      {trend && (
        <div className="trend-indicator" style={{
          borderLeft: `3px solid ${trend.direction === 'up' ? '#e74c3c' : '#4caf50'}`,
        }}>
          Trend: {trend.direction === 'up' ? '📈' : '📉'} {Math.abs(trend.changePercent)}% change
          ({trend.previous} → {trend.current})
        </div>
      )}

      <div className="issues-list">
        {issues.length > 0 ? (
          issues.map((issue, idx) => (
            <div key={idx} className="issue-item" style={{
              borderLeft: `3px solid ${getSeverityColor(issue.severity)}`,
            }}>
              <div className="issue-header">
                <span className="issue-icon">{issue.icon}</span>
                <div className="issue-info">
                  <h6 className="issue-category">{issue.category}</h6>
                  <p className="issue-metadata">
                    <strong>{issue.count}</strong> item{issue.count !== 1 ? 's' : ''}
                    <span className="issue-severity" style={{ borderColor: getSeverityColor(issue.severity) }}>
                      {issue.severity}
                    </span>
                  </p>
                </div>
              </div>

              {issue.details && issue.details.length > 0 && (
                <div className="issue-details">
                  {issue.details.map((detail, didx) => (
                    <p key={didx} className="issue-detail-line">
                      • {Object.values(detail).join(': ')}
                    </p>
                  ))}
                </div>
              )}

              {issue.action && (
                <a href={issue.action.link} className="issue-action-link">
                  {issue.action.label} →
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="no-data">No issues found</p>
        )}
      </div>
    </div>
  );
};

export default IssuesSummary;
