import React from 'react';

export interface QuickAction {
  label: string;
  icon: string;
  action: string;
  style: string;
  description: string;
}

export interface QuickActionsProps {
  actions?: QuickAction[];
  style?: React.CSSProperties;
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions = [], style }) => {
  return (
    <div className="quick-actions card card-body" style={style}>
      <div className="actions-grid">
        {actions.length > 0 ? (
          actions.map((action, idx) => (
            <a
              key={idx}
              href={action.action}
              className={`action-btn ${action.style === 'primary' ? 'action-btn-primary' : 'action-btn-secondary'}`}
            >
              <span className="action-icon">{action.icon}</span>
              <div className="action-content">
                <p className="action-label">{action.label}</p>
                <p className="action-description">{action.description}</p>
              </div>
            </a>
          ))
        ) : (
          <p className="no-data" style={{ gridColumn: '1 / -1' }}>No actions available</p>
        )}
      </div>
    </div>
  );
};

export default QuickActions;