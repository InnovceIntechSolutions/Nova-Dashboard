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
  style?: React.CSSProperties;
}

const Timeline: React.FC<TimelineProps> = ({ title, subtitle, events = [], showCount = 6, loadMoreLink, style }) => {
  const displayEvents = events.slice(0, showCount);

  return (
    <div className="timeline card card-body" >
      <div className="card-header-section">
        <h5 className="card-title">{title || 'Activity'}</h5>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>

      <div className="timeline-wrapper">
        {displayEvents.length > 0 ? (
          displayEvents.map((event, index) => (
            <div key={event.id} className="timeline-event">
              {index < displayEvents.length - 1 && <div className="timeline-line" />}
              <div className="timeline-dot">{event.icon}</div>
              <div className="timeline-content">
                <h6 className="timeline-title">{event.title}</h6>
                <p className="timeline-description">{event.description}</p>
                <p className="timeline-timestamp">⏱️ {event.timestamp}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No activity available</p>
        )}
      </div>

      {loadMoreLink && events.length > showCount && (
        <a href={loadMoreLink} className="view-all-link">View More Activity →</a>
      )}
    </div>
  );
};

export default Timeline;
