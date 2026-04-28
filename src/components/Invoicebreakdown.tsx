
import React from 'react';

export interface FinancialItem {
  label: string;
  value: string;
  color?: 'default' | 'green' | 'amber' | 'red';
}

export interface FinancialSummaryProps {
  title?: string;
  items?: FinancialItem[];
  style?: React.CSSProperties;
}

const colorMap: Record<string, string> = {
  default: '#111827',
  green:   '#10b981',
  amber:   '#f59e0b',
  red:     '#ef4444',
};

const InvoiceBreakdown: React.FC<FinancialSummaryProps> = ({
  title = ' INVOICE STATUS BREAKDOWN',
  items = [],
  style,
}) => {
  return (
    <div
      className="card shadow-sm border-0 rounded-3"
      style={{ fontFamily: "'DM Sans', sans-serif", ...style }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 20px 12px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {/* <span style={{ fontSize: 18 }}>📊</span> */}
        <span style={{ fontSize: 15, fontWeight: 700, color: '#111827', letterSpacing: '-0.01em' }}>
          {title.toUpperCase()}
        </span>
      </div>

      {/* List */}
      <div style={{ padding: '8px 16px 8px' }}>
        {items.length === 0 ? (
          <div style={{ padding: '30px 20px', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
            No invoice data available
          </div>
        ) : (
          items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 4px',
                borderBottom: idx < items.length - 1 ? '1px solid #f3f4f6' : 'none',
              }}
            >
              <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>
                {item.label}
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: colorMap[item.color ?? 'default'],
                  letterSpacing: '0.01em',
                }}
              >
                {item.value}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InvoiceBreakdown;