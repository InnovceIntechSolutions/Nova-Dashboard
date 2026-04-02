// src/components/StatsCard.tsx
import React from 'react';

export interface StatsCardProps {
  title?: string;
  value?: string | number;
  subtitle?: string;
  trend?: string;
  icon?: string;
  details?: Array<{ label: string; value: string }>;
  style?: React.CSSProperties;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle, trend, icon, details, style }) => {
  return (
    <div className="stats-card card card-body" >
      <div className="stats-header">
        {icon && <span className="stats-icon" role="img" aria-label="icon">{icon}</span>}
        <div>
          <h6 className="stats-title">{title || 'Statistic'}</h6>
          {subtitle && <p className="stats-subtitle">{subtitle}</p>}
        </div>
      </div>
      <p className="stats-value">{value || '—'}</p>
      {trend && <p className="stats-trend">{trend}</p>}
      {details && details.length > 0 && (
        <div className="stats-details">
          {details.map((detail, idx) => (
            <div key={idx} className="detail-row">
              <span className="detail-label">{detail.label}</span>
              <span className="detail-value">{detail.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatsCard;