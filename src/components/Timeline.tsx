// src/components/Timeline.tsx
import React from 'react';

export interface TimelineEvent {
  id: string;
  type?: 'success' | 'warning' | 'error' | 'info';
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
  events = []
}) => {
  return (
    <div className="timeline card border-0 shadow-sm h-100">
      <div className="card-header bg-transparent border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-0">{title || '📅 Recent Activity'}</h5>
            {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="timeline-body">
        {events.length === 0 && (
          <div className="empty-state">
            No activity available
          </div>
        )}

        {events.map((event, index) => (
          <div key={event.id} className="timeline-row">

            {/* Left Line */}
            <div className="timeline-left">
              <div className={`timeline-dot ${event.type || 'info'}`}>
                {event.icon}
              </div>

              {index !== events.length - 1 && (
                <div className="timeline-connector" />
              )}
            </div>

            {/* Content */}
            <div className="timeline-box">
              <div className="timeline-top">
                <h6>{event.title}</h6>
                <span>{event.timestamp}</span>
              </div>

              <p>{event.description}</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Timeline;