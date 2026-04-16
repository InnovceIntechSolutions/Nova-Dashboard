// src/components/Timeline.tsx
import React from 'react';

export interface TimelineEvent {
  id: string;
  type: string;
  icon: string;
  title: string;
  description: string;
  timestamp: string;
  details?: Record<string, any>;
}

export interface TimelineProps {
  title?: string;
  subtitle?: string;
  events?: TimelineEvent[];
  showCount?: number;
  loadMoreLink?: string;
}

const Timeline: React.FC<TimelineProps> = ({ title, subtitle, events = [], showCount = 6, loadMoreLink }) => {
  const displayEvents = events.slice(0, showCount);

  return (
    <div className="timeline card border-0 shadow-sm h-100">
      <div className="card-header bg-transparent border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-0">{title || 'Activity'}</h5>
            {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
          </div>
        </div>
      </div>

      <div className="card-body">
        {displayEvents.length > 0 ? (
          <div className="timeline-wrapper">
            {displayEvents.map((event, index) => (
              <div key={event.id} className="timeline-event d-flex align-items-start mb-4">
                <div className="timeline-dot bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3 p-1" style={{width:"30px", height:"30px"}}>
                  {event.icon}
                </div>
                <div className="timeline-content flex-grow-1">
                  <h6 className="timeline-title mb-1">{event.title}</h6>
                  <p className="timeline-description text-muted mb-2">{event.description}</p>
                  <p className="timeline-timestamp small text-muted">⏱️ {event.timestamp}</p>
                </div>
                {index < displayEvents.length - 1 && <div className="timeline-line border-start border-2 ms-4" />}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">No activity available</p>
        )}
      </div>

      {loadMoreLink && events.length > showCount && (
        <div className="card-footer bg-transparent border-top text-center">
          <a href={loadMoreLink} className="btn btn-link text-decoration-none">View More Activity →</a>
        </div>
      )}
    </div>
  );
};

export default Timeline;