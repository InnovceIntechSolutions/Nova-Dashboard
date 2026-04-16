// src/components/StatsCard.tsx
import React, { useEffect, useState } from 'react';

export interface StatsCardProps {
  title?: string;
  value?: string | number;
  subtitle?: string;
  trend?: string;
  icon?: string;
  details?: Array<{ label: string; value: string }>;
  style?: React.CSSProperties;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  details,
  style,
}) => {
  const [animateValue, setAnimateValue] = useState(false);

  useEffect(() => {
    setAnimateValue(true); // trigger animation on mount
  }, []);

  return (
    <div className="card shadow-sm border-0 rounded-3 stats-card">
      <div className="card-body">
        <div className="d-flex align-items-center">
          {/* {icon && <span className="fs-2 me-3 text-primary">{icon}</span>} */}
          <div>
            <h6 className="card-title text-muted  mb-1">{title || 'Statistic'}</h6>
            
          </div>
        </div>

        {/* Value with zoom/fade animation */}
        <div className={`fs-1 text-dark value-zoom fw-bold ${animateValue ? 'active' : ''}`}>
          {value ?? '—'}
        </div>
        {subtitle && <p className="card-subtitle text-muted ">{subtitle}</p>}
        {trend && (
          <p
            className={`mb-0 text-${
              trend.includes('↑') ? 'success' : trend.includes('↓') ? 'danger' : 'muted'
            }`}
          >
            <strong>{trend}</strong>
          </p>
        )}

        {details && details.length > 0 && (
          <div className="mt-1 d-flex gap-2">
            {details.map((detail: { label: string; value: string }, idx: number) => (
              <div key={idx} className="d-flex flex-column">
                <span className="text-muted ">{detail.label}</span>
                <span className="text-dark">{detail.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;