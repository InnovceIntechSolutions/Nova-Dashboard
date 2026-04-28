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
}

const IssuesSummary: React.FC<IssuesSummaryProps> = ({ title, subtitle, issues = [], trend }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity?.toUpperCase()) {
      case 'HIGH':
        return 'bg-danger text-white';
      case 'MEDIUM':
        return 'bg-warning text-dark';
      case 'LOW':
        return 'bg-success text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  return (
    <div className="issues-summary card shadow-sm border-0 h-100">
      <div className="card-header bg-transparent border-bottom">
        <h5 className="card-title mb-0">{title || 'Issues'}</h5>
        {subtitle && <p className="card-subtitle text-muted">{subtitle}</p>}
      </div>

      {trend && (
        <div className={`trend-indicator p-3 ${trend.direction === 'up' ? 'bg-light' : 'bg-success'}`}>
          <strong>Trend:</strong> {trend.direction === 'up' ? '📈' : '📉'}
          {Math.abs(trend.changePercent)}% change ({trend.previous} → {trend.current})
        </div>
      )}

      <div className="card-body p-0">
        {issues.length > 0 ? (
          <ul className="list-unstyled">
            {issues.map((issue, idx) => (
              <li key={idx} className="issue-item  border-bottom d-flex align-items-start p-3" style={{ borderColor: getSeverityColor(issue.severity) }}>
                <div className='w-100'>
                  <div className="d-flex align-items-center">
                    {/* <div className="issue-icon me-1">
                      <span className="fs-4">{issue.icon}</span>
                    </div> */}
                    <div className="issue-info flex-grow-1">
                      <h6 className="issue-category mb-1">{issue.category}</h6>
                      <p className="issue-metadata text-muted">
                        <strong>{issue.count}</strong> item{issue.count !== 1 ? 's' : ''}{' '}
                        <span className={`badge ${getSeverityColor(issue.severity)} ms-2`}>
                          {issue.severity}
                        </span>
                      </p>
                    </div>
                  </div>

                  {issue.details && issue.details.length > 0 && (
                    <div className="issue-details">
                      {issue.details.map((detail, didx) => (
                        <p key={didx} className="text-muted">
                          • {Object.values(detail).join(': ')}
                        </p>
                      ))}
                    </div>
                  )}

                </div>

                {issue.action && (
                  <a href={issue.action.link} className="btn btn-link p-0 d-flex w-100 justify-content-end">
                    {issue.action.label} →
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '200px' }}>
            <p className="text-center text-muted">No issues found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuesSummary;