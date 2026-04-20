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
       <div className="card-body position-relative">
        {/* Icon */}
        {/* <div className="mb-3 fs-2">
          {icon || '📋'}
        </div>  */}

        <div className="d-flex align-items-center">
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
//   icon,
//   details,
//   style,
// }) => {
//   const [animateValue, setAnimateValue] = useState(false);

//   useEffect(() => {
//     setAnimateValue(true);
//   }, []);

//   return (
//     <div
//       className="card shadow-sm border-0 rounded-4 stats-card position-relative overflow-hidden"
//       style={{
//         background: '#f5f6f7',
//         borderLeft: '4px solid #20c997',
//         minHeight: '220px',
//         ...style,
//       }}
//     >
//       {/* Top right soft circle */}
//       <div
//         style={{
//           position: 'absolute',
//           top: '-30px',
//           right: '-30px',
//           width: '110px',
//           height: '110px',
//           background: '#dfe8e4',
//           borderRadius: '50%',
//           opacity: 0.8,
//         }}
//       />

//       <div className="card-body position-relative">
//         {/* Icon */}
//         <div className="mb-3 fs-2">
//           {icon || '📋'}
//         </div>

//         {/* Title */}
//         <h6
//           className="text-uppercase fw-semibold text-secondary mb-2"
//           style={{ letterSpacing: '1px', fontSize: '14px' }}
//         >
//           {title || 'Statistic'}
//         </h6>

//         {/* Value */}
//         <div
//           className={`display-4 fw-bold text-dark value-zoom ${
//             animateValue ? 'active' : ''
//           }`}  
//         >
//           {value ?? '—'}
//         </div>

//         {/* Subtitle */}
//         {subtitle && (
//           <p className="text-dark fw-semibold mb-3">{subtitle}</p>
//         )}

//         {/* Divider */}
//         <hr className="my-3" />

//         {/* Trend */}
//         {trend && (
//           <p
//             className={`mb-2 text-${
//               trend.includes('↑')
//                 ? 'success'
//                 : trend.includes('↓')
//                 ? 'danger'
//                 : 'muted'
//             }`}
//           >
//             <strong>{trend}</strong>
//           </p>
//         )}

//         {/* Details */}
//         {details && details.length > 0 && (
//           <div className="d-flex justify-content-between mt-2">
//             {details.map((detail, idx) => (
//               <div key={idx} className="d-flex flex-column">
//                 <span
//                   className="text-muted"
//                   style={{ fontSize: '13px' }}
//                 >
//                   {detail.label}
//                 </span>
//                 <span className="fw-bold text-dark fs-5">
//                   {detail.value}
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StatsCard;