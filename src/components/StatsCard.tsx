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
    <div className="card shadow-sm border-0 rounded-3" >
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          {icon && <span className="fs-2 me-3 text-primary">{icon}</span>}
          <div>
            <h6 className="card-title mb-1 text-muted">{title || 'Statistic'}</h6>
            {subtitle && <p className="card-subtitle mb-2 text-muted">{subtitle}</p>}
          </div>
        </div>
        <p className="display-6 mb-2 text-dark">{value || '—'}</p>
        {trend && <p className={`mb-0 text-${trend.includes('↑') ? 'success' : trend.includes('↓') ? 'danger' : 'muted'}`}><strong>{trend}</strong></p>}
        {details && details.length > 0 && (
          <div className="mt-3">
            {details.map((detail, idx) => (
              <div key={idx} className="d-flex justify-content-between mb-2">
                <span className="text-muted">{detail.label}</span>
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