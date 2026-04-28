
import React, { useState } from 'react';
import type { SupplierScorecardProps } from '../constants/types';

type BadgeLevel = 'good' | 'fair' | 'poor';

const getScoreLevel = (score: number): BadgeLevel => {
  if (score >= 85) return 'good';
  if (score >= 70) return 'fair';
  return 'poor';
};

const getPricingLevel = (label: string): BadgeLevel => {
  const normalized = label?.toUpperCase?.() ?? '';
  if (normalized === 'GOOD') return 'good';
  if (normalized === 'FAIR') return 'fair';
  return 'poor';
};

const isTextLabel = (val: string) => isNaN(parseFloat(val));

const getBadgeForValue = (val: string): { level: BadgeLevel; display: string } => {
  if (isTextLabel(val)) {
    const level = getPricingLevel(val);
    return {
      level,
      display: level.charAt(0).toUpperCase() + level.slice(1),
    };
  }
  const num = parseFloat(val);
  return {
    level: getScoreLevel(num),
    display: `${num.toFixed(0)}%`,
  };
};

const badgeStyles: Record<BadgeLevel, { wrapper: React.CSSProperties; dot: React.CSSProperties }> = {
  good: {
    wrapper: { backgroundColor: 'rgba(34,197,94,0.12)', color: '#16a34a' },
    dot:     { backgroundColor: '#22c55e', boxShadow: '0 0 0 2px rgba(34,197,94,0.12)' },
  },
  fair: {
    wrapper: { backgroundColor: 'rgba(245,158,11,0.12)', color: '#b45309' },
    dot:     { backgroundColor: '#f59e0b', boxShadow: '0 0 0 2px rgba(245,158,11,0.12)' },
  },
  poor: {
    wrapper: { backgroundColor: 'rgba(239,68,68,0.12)', color: '#dc2626' },
    dot:     { backgroundColor: '#ef4444', boxShadow: '0 0 0 2px rgba(239,68,68,0.12)' },
  },
};

interface BadgeProps {
  level: BadgeLevel;
  display: string;
}

const Badge: React.FC<BadgeProps> = ({ level, display }) => {
  const { wrapper, dot } = badgeStyles[level];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 12px',
        borderRadius: 20,
        fontWeight: 600,
        fontSize: 13,
        whiteSpace: 'nowrap',
        ...wrapper,
      }}
    >
      <span style={{ width: 9, height: 9, borderRadius: '50%', flexShrink: 0, ...dot }} />
      {display}
    </span>
  );
};

const SupplierScorecardGrid: React.FC<SupplierScorecardProps> = (props) => {
  const {
    Title,
    Subtitle,
    Icon,
    style,
    ...rest
  } = props;

  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // ── Dynamically collect all label/value pairs from props 
  // Picks up label1, label2, label3 ... labelN and value1, value2 ... valueN
  // in order, so adding more columns in the API response requires zero code changes.

  const labelKeys = Object.keys(rest)
    .filter((k) => /^label\d+$/.test(k))
    .sort((a, b) => parseInt(a.replace('label', '')) - parseInt(b.replace('label', '')));

  const valueKeys = Object.keys(rest)
    .filter((k) => /^value\d+$/.test(k))
    .sort((a, b) => parseInt(a.replace('value', '')) - parseInt(b.replace('value', '')));

  // label1 is always the "name" column (rendered as plain text, not a badge)
  const nameLabel = (rest[labelKeys[0]] as string) ?? 'Supplier';
  const dataLabelKeys = labelKeys.slice(1);   // label2, label3 ...
  const nameValues  = ((rest[valueKeys[0]] as string[]) ?? []).slice(0, 10); 
  const dataValueKeys = valueKeys.slice(1);   // value2, value3 ...

  const columns = [nameLabel, ...dataLabelKeys.map((k) => rest[k] as string), 'Actions'];
  const totalCols = columns.length;

  const rows = nameValues.map((_, i) =>
    dataValueKeys.map((k) => (rest[k] as string[])?.[i] ?? '0')
  );

  return (
    <div
      className="card shadow-sm border-0 rounded-3 h-100"
      style={{ overflow: 'hidden', fontFamily: "'DM Sans', sans-serif", ...style }}
    >
      {/* Header */}
      <div
        style={{
          padding: '18px 24px 14px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>{Icon}</span>
            <h5 style={{ margin: 0, fontWeight: 700, fontSize: 16, color: '#111827', letterSpacing: '-0.01em' }}>
              {(Title ?? '').toUpperCase()}
            </h5>
          </div>
          {Subtitle && (
            <p style={{ margin: '4px 0 0 28px', fontSize: 12, color: '#9ca3af' }}>{Subtitle}</p>
          )}
        </div>
        <button
          style={{
            background: 'none', border: 'none', color: '#2563eb',
            fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: 0,
          }}
        >
          {/* Download Report → */}
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  style={{
                    padding: '12px 20px', textAlign: 'left', fontSize: 11,
                    fontWeight: 700, color: '#6b7280', letterSpacing: '0.08em',
                    textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb',
                    whiteSpace: 'nowrap', background: '#fff',
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {nameValues.length === 0 ? (
              <tr>
                <td
                  colSpan={totalCols}
                  style={{ padding: '40px 20px', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}
                >
                  No supplier data available
                </td>
              </tr>
            ) : (
              nameValues.map((supplier, idx) => (
                <tr
                  key={idx}
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    borderBottom: '1px solid #f3f4f6',
                    background: hoveredRow === idx ? '#f9fafb' : '#fff',
                    transition: 'background 0.15s ease',
                  }}
                >
                  {/* Name column — plain text, never a badge */}
                  <td
                    style={{
                      padding: '14px 20px', fontSize: 14, fontWeight: 600,
                      color: '#111827', maxWidth: 220, whiteSpace: 'nowrap',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                    }}
                    title={supplier}
                  >
                    {supplier}
                  </td>

                  {/* Data columns — badge for each value */}
                  {rows[idx].map((val, colIdx) => {
                    const { level, display } = getBadgeForValue(val);
                    return (
                      <td key={colIdx} style={{ padding: '14px 20px' }}>
                        <Badge level={level} display={display} />
                      </td>
                    );
                  })}

                  {/* Actions */}
                  <td style={{ padding: '14px 20px' }}>
                    <button
                      style={{
                        background: 'none', border: 'none', color: '#2563eb',
                        fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0,
                      }}
                      onClick={() => console.log('View supplier:', supplier)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierScorecardGrid;