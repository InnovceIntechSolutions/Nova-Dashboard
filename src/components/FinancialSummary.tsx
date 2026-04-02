// src/components/FinancialSummary.tsx
import React from "react";

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
}

const getStatusBadge = (status?: string) => {
  switch (status) {
    case "good":
      return "success";
    case "warning":
      return "warning";
    case "bad":
      return "danger";
    default:
      return "secondary";
  }
};

const FinancialSummary: React.FC<FinancialSummaryProps> = ({
  title,
  subtitle,
  metrics = [],
  downloadLink,
}) => {
  return (
    <div className="card shadow-sm border-0 h-100">
      
      {/* Header */}
      <div className="card-header border-bottom d-flex justify-content-between align-items-center">
        <div>
          <h5 className="fw-bold mb-1">{title || "Financial Summary"}</h5>
          {subtitle && <small className="text-muted">{subtitle}</small>}
        </div>

        {downloadLink && (
          <a href={downloadLink} className="btn btn-outline-primary btn-sm">
            <i className="fas fa-download me-1"></i> Download
          </a>
        )}
      </div>

      {/* List Body */}
      <div className="list-group list-group-flush card-body p-0">
        {metrics.length > 0 ? (
          metrics.map((metric, idx) => (
            <div key={idx} className="list-group-item py-3">

              {/* Top Row */}
              <div className="d-flex justify-content-between align-items-center">
                <div className="fw-semibold">
                  {metric.icon && (
                    <i className={`${metric.icon} me-2 text-primary`} />
                  )}
                  {metric.label}
                </div>

                <div
                  className="fw-bold"
                  style={{ color: metric.color || "#0d6efd" }}
                >
                  {metric.value}
                </div>
              </div>

              {/* Subtitle */}
              {metric.subtitle && (
                <div className="text-muted small mt-1">
                  {metric.subtitle}
                </div>
              )}

              {/* Progress */}
              {metric.progress !== undefined && (
                <div className="progress mt-2" style={{ height: "6px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${Math.min(metric.progress, 100)}%`,
                      backgroundColor: metric.color || "#0d6efd",
                    }}
                  />
                </div>
              )}

              {/* Target + Comparison */}
              <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
                
                {metric.target && (
                  <small className="text-muted">
                    Target: <span className="fw-semibold">{metric.target}</span>
                  </small>
                )}

                {metric.comparison && (
                  <span
                    className={`badge bg-${getStatusBadge(
                      metric.comparison.status
                    )}`}
                  >
                    {metric.comparison.label}: {metric.comparison.value}
                  </span>
                )}
              </div>

              {/* Breakdown */}
              {metric.breakdown && metric.breakdown.length > 0 && (
                <div className="mt-2">
                  {metric.breakdown.map((item, bidx) => (
                    <div
                      key={bidx}
                      className="d-flex justify-content-between small text-muted"
                    >
                      <span>{item.label}</span>
                      <span className="fw-semibold text-dark">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))
        ) : (
          <div className="text-center text-muted py-4">
            No financial data available
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialSummary;