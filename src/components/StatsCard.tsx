// // src/components/StatsCard.tsx
// import React, { useEffect, useState } from 'react';

// export interface StatsCardProps {
//   title?: string;
//   value?: string | number;
//   subtitle?: string;
//   trend?: string;
//   icon?: string;
//   details?: Array<{ label: string; value: string }>;
//   style?: React.CSSProperties;
// }

// const StatsCard: React.FC<StatsCardProps> = ({
//   title,
//   value,
//   subtitle,
//   trend,
//   details,
// }) => {
//   const [animateValue, setAnimateValue] = useState(false);

//   useEffect(() => {
//     setAnimateValue(true); // trigger animation on mount
//   }, []);

//   return (
//     <div className="card shadow-sm border-0 rounded-3 stats-card">
//        <div className="card-body position-relative">
//         {/* Icon */}
//         {/* <div className="mb-3 fs-2">
//           {icon || '📋'}
//         </div>  */}

//         <div className="d-flex align-items-center">
//           <div>
//             <h6 className="card-title text-muted  mb-1">{title || 'Statistic'}</h6>
            
//           </div>
//         </div>

//         {/* Value with zoom/fade animation */}
//         <div className={`fs-1 text-dark value-zoom fw-bold ${animateValue ? 'active' : ''}`}>
//           {value ?? '—'}
//         </div>
//         {subtitle && <p className="card-subtitle text-muted ">{subtitle}</p>}
//         {trend && (
//           <p
//             className={`mb-0 text-${
//               trend.includes('↑') ? 'success' : trend.includes('↓') ? 'danger' : 'muted'
//             }`}
//           >
//             <strong>{trend}</strong>
//           </p>
//         )}

//         {details && details.length > 0 && (
//           <div className="mt-1 d-flex gap-2">
//             {details.map((detail: { label: string; value: string }, idx: number) => (
//               <div key={idx} className="d-flex flex-column">
//                 <span className="text-muted ">{detail.label}</span>
//                 <span className="text-dark">{detail.value}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StatsCard;


// // src/components/StatsCard.tsx
// import React, { useEffect, useState } from 'react';

// export interface StatsCardProps {
//   title?: string;
//   value?: string | number;
//   subtitle?: string;
//   trend?: string;
//   icon?: string;
//   details?: Array<{ label: string; value: string }>;
//   style?: React.CSSProperties;
// }

// const StatsCard: React.FC<StatsCardProps> = ({
//   title,
//   value,
//   subtitle,
//   trend,
//   details,
// }) => {
//   const [animateValue, setAnimateValue] = useState(false);

//   useEffect(() => {
//     setAnimateValue(true); // trigger animation on mount
//   }, []);

//   return (
//     <div className="card shadow-sm border-0 rounded-3 stats-card">
//        <div className="card-body position-relative">
//         {/* Icon */}
//         {/* <div className="mb-3 fs-2">
//           {icon || '📋'}
//         </div>  */}

//         <div className="d-flex align-items-center">
//           <div>
//             <h6 className="card-title text-muted  mb-1">{title || 'Statistic'}</h6>
            
//           </div>
//         </div>

//         {/* Value with zoom/fade animation */}
//         <div className={`fs-1 text-dark value-zoom fw-bold ${animateValue ? 'active' : ''}`}>
//           {value ?? '—'}
//         </div>
//         {subtitle && <p className="card-subtitle text-muted ">{subtitle}</p>}
//         {trend && (
//           <p
//             className={`mb-0 text-${
//               trend.includes('↑') ? 'success' : trend.includes('↓') ? 'danger' : 'muted'
//             }`}
//           >
//             <strong>{trend}</strong>
//           </p>
//         )}

//         {details && details.length > 0 && (
//           <div className="mt-1 d-flex gap-2">
//             {details.map((detail: { label: string; value: string }, idx: number) => (
//               <div key={idx} className="d-flex flex-column">
//                 <span className="text-muted ">{detail.label}</span>
//                 <span className="text-dark">{detail.value}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StatsCard;



// src/components/StatsCard.tsx
import React, { useEffect, useState } from "react";

export interface StatsCardProps {
  title?: string;
  value?: number;
  subtitle?: string;
  trend?: number; // use numeric for better control
  icon?: string;
  details?: Array<{ label: string; value: string }>;
  variant?: "primary" | "success" | "danger" | "warning";
  style?: React.CSSProperties;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title = "Metric",
  value = 0,
  subtitle,
  trend,
  icon = "📊",
  details,
  variant = "primary",
  style,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  // Smooth count-up animation
  useEffect(() => {
    let start = 0;
    const duration = 800;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  const colors = {
    primary: "#4facfe",
    success: "#22c55e",
    danger: "#ef4444",
    warning: "#f59e0b",
  };

  const color = colors[variant];

  return (
    <div
      className="stats-card position-relative overflow-hidden"
      style={{
        borderRadius: "18px",
        padding: "18px",
        background: "linear-gradient(145deg, #ffffff, #f8fafc)",
        boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
        transition: "all 0.35s ease",
        ...style,
      }}
    >
      {/* Soft Glow */}
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          background: color,
          opacity: 0.12,
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      />

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="text-muted fw-medium" style={{ fontSize: 13 }}>
          {title}
        </span>

        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "12px",
            background: `${color}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
          }}
        >
          {icon}
        </div>
      </div>

      {/* Value */}
      <div
        style={{
          fontSize: "32px",
          fontWeight: 700,
          letterSpacing: "-1px",
          color: "#111",
        }}
      >
        {displayValue.toLocaleString()}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div className="text-muted" style={{ fontSize: 12 }}>
          {subtitle}
        </div>
      )}

      {/* Trend */}
      {typeof trend === "number" && (
        <div
          className="mt-2 d-inline-flex align-items-center px-2 py-1"
          style={{
            fontSize: 12,
            borderRadius: 10,
            background: trend > 0 ? "#dcfce7" : "#fee2e2",
            color: trend > 0 ? "#16a34a" : "#dc2626",
            fontWeight: 500,
          }}
        >
          {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
        </div>
      )}

      {/* Divider */}
      {details && (
        <div
          style={{
            marginTop: 12,
            borderTop: "1px solid #f1f5f9",
            paddingTop: 10,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {details.map((d, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div className="text-muted" style={{ fontSize: 11 }}>
                {d.label}
              </div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>
                {d.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hover Effect */}
      <style>
        {`
        .stats-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 35px rgba(0,0,0,0.08);
        }
      `}
      </style>
    </div>
  );
};

export default StatsCard;