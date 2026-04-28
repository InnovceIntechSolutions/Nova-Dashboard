
import React from 'react';

export interface ProgressMetric {
  label: string;
  current: number;
  total: number;
  displayCurrent: string;
  displayTotal: string;
  color: string;
}

export interface InfoCard {
  title: string;
  subtitle?: string;
  items: Array<{ label: string; value: string; color?: string }>;
}

export interface HighlightCard {
  label: string;
  value: string;
  valueColor?: string;
  footer: string;
  footerHighlight?: string;
  footerHighlightColor?: string;
}

export interface ProcurementSummaryProps {
  title?: string;
  subtitle?: string;
  progressMetrics?: ProgressMetric[];
  infoCard?: InfoCard;
  highlightCard?: HighlightCard;
  style?: React.CSSProperties;
}

const ProcurementSummary: React.FC<ProcurementSummaryProps> = ({
  title = 'PROCUREMENT SUMMARY',
  subtitle,
  progressMetrics = [],
  infoCard,
  highlightCard,
  style,
}) => {
  const hasSummaryData =
    progressMetrics.length > 0 || infoCard != null || highlightCard != null;

  return (
    <div
      className="card shadow-sm border-0 rounded-3 h-100"
      style={{ fontFamily: "'DM Sans', sans-serif", ...style }}
    >
      {/* Header */}
      <div style={{ padding: '16px 20px 10px', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* <span style={{ fontSize: 18 }}>📊</span> */}
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', letterSpacing: '-0.01em' }}>
            {title.toUpperCase()}
          </div>
        </div>
        {subtitle && (
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 3, marginLeft: 26 }}>
            {subtitle}
          </div>
        )}
      </div>

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {!hasSummaryData ? (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '200px' }}>
            No summary available
          </div>
        ) : (
          <>
            {/* Progress Metrics */}
            {progressMetrics.map((metric, idx) => {
              const pct = Math.min((metric.current / metric.total) * 100, 100);
              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
                      {metric.label}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: metric.color }}>
                      {metric.displayCurrent} / {metric.displayTotal}
                    </div>
                  </div>
                  {/* Track */}
                  <div
                    style={{
                      height: 7,
                      borderRadius: 99,
                      background: '#e5e7eb',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${pct}%`,
                        borderRadius: 99,
                        background: metric.color,
                        transition: 'width 0.6s ease',
                      }}
                    />
                  </div>
                </div>
              );
            })}

            {/* Info Card */}
            {infoCard && (
              <div
                style={{
                  background: '#f9fafb',
                  border: '1px solid #f0f0f0',
                  borderRadius: 10,
                  padding: '14px 16px',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 10 }}>
                  {infoCard.title}
                  {infoCard.subtitle && (
                    <span style={{ fontWeight: 400, color: '#6b7280', marginLeft: 6 }}>
                      {infoCard.subtitle}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {infoCard.items.map((item, i) => (
                    <div key={i}>
                      <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: item.color ?? '#111827' }}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlight Card */}
            {highlightCard && (
              <div
                style={{
                  background: '#f9fafb',
                  border: '1px solid #f0f0f0',
                  borderRadius: 10,
                  padding: '14px 16px',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 6 }}>
                  {highlightCard.label}
                </div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: highlightCard.valueColor ?? '#6366f1',
                    marginBottom: 6,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {highlightCard.value}
                </div>
                <div style={{ fontSize: 12, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4 }}>
                  {highlightCard.footer}
                  {highlightCard.footerHighlight && (
                    <span style={{ fontWeight: 700, color: highlightCard.footerHighlightColor ?? '#10b981' }}>
                      {highlightCard.footerHighlight}
                    </span>
                  )}
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default ProcurementSummary;