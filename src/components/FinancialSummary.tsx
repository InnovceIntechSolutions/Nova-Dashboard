// src/components/FinancialSummary.tsx
import React from 'react';

export interface FinancialMetric {
  label: string;
  value: string;
  progress?: number;
  target?: string;
  subtitle?: string;
  breakdown?: Array<{ label: string; value: string }>;
  comparison?: { label: string; value: string; status: string };
  icon?: string;
  color?: string;
}

export interface FinancialSummaryProps {
  title?: string;
  subtitle?: string;
  metrics?: FinancialMetric[];
  downloadLink?: string;
  style?: React.CSSProperties;
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ title, subtitle, metrics = [], downloadLink, style }) => {
  return (
    <div className="financial-summary card card-body" >
      <div className="card-header-section">
        <h5 className="card-title">{title || 'Financial Summary'}</h5>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>

      <div className="financial-metrics">
        {metrics.length > 0 ? (
          metrics.map((metric, idx) => (
            <div key={idx} className="financial-row">
              <div className="metric-header">
                <span className="metric-label">
                  {metric.icon && <span className="metric-icon">{metric.icon}</span>}
                  {metric.label}
                </span>
                <span className="metric-value" style={{ color: metric.color }}>
                  {metric.value}
                </span>
              </div>

              {metric.subtitle && (
                <p className="metric-subtitle">{metric.subtitle}</p>
              )}

              {metric.progress !== undefined && (
                <div className="metric-progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${Math.min(metric.progress, 100)}%`,
                      backgroundColor: metric.color || 'var(--primary-color)',
                    }}
                  />
                </div>
              )}

              {metric.target && (
                <p className="metric-target">Target: {metric.target}</p>
              )}

              {metric.breakdown && metric.breakdown.length > 0 && (
                <div className="metric-breakdown">
                  {metric.breakdown.map((item, bidx) => (
                    <div key={bidx} className="breakdown-item">
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
              )}

              {metric.comparison && (
                <div className={`metric-comparison metric-comparison-${metric.comparison.status}`}>
                  {metric.comparison.label}: {metric.comparison.value} ({metric.comparison.status})
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-data">No financial data available</p>
        )}
      </div>

      {downloadLink && (
        <a href={downloadLink} className="download-btn">
          📥 Download Report
        </a>
      )}
    </div>
  );
};

export default FinancialSummary;
