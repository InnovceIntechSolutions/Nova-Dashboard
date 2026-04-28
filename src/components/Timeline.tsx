// // src/components/Timeline.tsx
// import React from 'react';

// export interface TimelineEvent {
//   id: string;
//   type?: 'success' | 'warning' | 'error' | 'info';
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   timestamp: string;
// }

// interface Props {
//   title?: string;
//   subtitle?: string;
//   events?: TimelineEvent[];
// }

// const Timeline: React.FC<Props> = ({
//   title = "Activity",
//   subtitle,
//   events = []
// }) => {
//   return (
//     <div className="timeline card border-0 shadow-sm h-100"style={{ minHeight: '200px' }}>
//       <div className="card-header bg-transparent border-bottom">
//         <div className="d-flex justify-content-between align-items-center">
//           <div>
//             <h5 className="mb-0">{title || ' Recent Activity'}</h5>
//             {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
//           </div>
//         </div>
//       </div>

//       {/* Body */}
//       <div className="timeline-body">
//         {events.length === 0 && (
          
//           <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '200px' }}>
//             <p className="text-center text-muted">No activity available</p>
//           </div>
//         )}

//         {events.map((event, index) => (
//           <div key={event.id} className="timeline-row">

//             {/* Left Line */}
//             <div className="timeline-left">
//               <div className={`timeline-dot ${event.type || 'info'}`}>
//                 {event.icon}
//               </div>

//               {index !== events.length - 1 && (
//                 <div className="timeline-connector" />
//               )}
//             </div>

//             {/* Content */}
//             <div className="timeline-box">
//               <div className="timeline-top">
//                 <h6>{event.title}</h6>
//                 <span>{event.timestamp}</span>
//               </div>

//               <p>{event.description}</p>
//             </div>

//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default Timeline;

// src/components/Timeline.tsx
import React, { useEffect, useState } from "react";

export interface TimelineEvent {
  id: string;
  type?: "success" | "warning" | "error" | "info";
  icon: React.ReactNode;
  title: string;
  description: string;
  timestamp: string;
}

interface Props {
  title?: string;
  subtitle?: string;
  events?: TimelineEvent[];
}

const Timeline: React.FC<Props> = ({
  title = "Activity",
  subtitle,
  events = [],
}) => {
  const [visible, setVisible] = useState<number[]>([]);

  // stagger animation
  useEffect(() => {
    events.forEach((_, i) => {
      setTimeout(() => {
        setVisible((prev) => [...prev, i]);
      }, i * 80);
    });
  }, [events]);

  const getBg = (type?: string) => {
    switch (type) {
      case "success":
        return "#dcfce7";
      case "warning":
        return "#fef3c7";
      case "error":
        return "#fee2e2";
      default:
        return "#eef2ff";
    }
  };

  const getColor = (type?: string) => {
    switch (type) {
      case "success":
        return "#16a34a";
      case "warning":
        return "#d97706";
      case "error":
        return "#dc2626";
      default:
        return "#4f46e5";
    }
  };

  return (
    <div
      className="card border-0 shadow-sm h-100"
      style={{ borderRadius: 14 }}
    >
      {/* Header */}
      <div className="card-header bg-transparent border-bottom py-3">
        <h6 className="mb-0 fw-semibold">
          {title || "Recent Activity"}
        </h6>
        {subtitle && (
          <p className="text-muted small mb-0">{subtitle}</p>
        )}
      </div>

      {/* Body */}
      <div className="p-3">
        {events.length === 0 && (
          <div
            className="d-flex align-items-center justify-content-center text-muted"
            style={{ minHeight: 150 }}
          >
            No activity available
          </div>
        )}

        {events.map((event, index) => {
          const show = visible.includes(index);
          const bg = getBg(event.type);
          const color = getColor(event.type);

          return (
            <div
              key={event.id}
              className="feed-item d-flex"
              style={{
                gap: 12,
                marginBottom: 16,
                opacity: show ? 1 : 0,
                transform: show
                  ? "translateY(0)"
                  : "translateY(6px)",
                transition: "all 0.3s ease",
              }}
            >
              {/* Icon / Avatar */}
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: bg,
                  color: color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                {event.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                {/* Title Row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 2,
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    {event.title}
                  </div>

                  <div
                    style={{
                      fontSize: 11,
                      color: "#9ca3af",
                    }}
                  >
                    {event.timestamp}
                  </div>
                </div>

                {/* Description */}
                <div
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                  }}
                >
                  {event.description}
                </div>
              </div>

              {/* Hover */}
              <style>
                {`
                  .feed-item:hover {
                    transform: translateY(-1px);
                  }
                `}
              </style>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;