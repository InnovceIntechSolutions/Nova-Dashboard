
import React from 'react';

export interface IssueItem {
  label: string;
  count: number;
}

export interface IssuesDeviationsProps {
  title?: string;
  items?: IssueItem[];
  style?: React.CSSProperties;
}

const getCountColor = (count: number): string => {
  if (count >= 5) return '#f59e0b';
  if (count >= 3) return '#ef4444';
  return '#ef4444';
};

const IssuesDeviations: React.FC<IssuesDeviationsProps> = ({
  title = 'ISSUES & DEVIATIONS',
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
        {/* <span style={{ fontSize: 18 }}></span> */}
        <span style={{ fontSize: 15, fontWeight: 700, color: '#111827', letterSpacing: '-0.01em' }}>
          {title.toUpperCase()}
        </span>
      </div>

      {/* List */}
      <div style={{ padding: '8px 16px 8px' }}>
        {items.length === 0 ? (
          <div style={{ padding: '30px 20px', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
            No issues found 
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
                  fontSize: 16,
                  fontWeight: 700,
                  color: getCountColor(item.count),
                  minWidth: 24,
                  textAlign: 'right',
                }}
              >
                {item.count}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IssuesDeviations;