// src/components/TaskList.tsx
import React from 'react';

export interface Task {
  id: string;
  type: string;
  priority: string;
  title: string;
  description: string;
  dueDate: string;
  daysRemaining: number;
  badge: string;
  actions?: Array<{ label: string; action: string; style: string }>;
  metadata?: Record<string, any>;
}

export interface TaskListProps {
  title?: string;
  subtitle?: string;
  tasks?: Task[];
  showCount?: number;
  viewAllLink?: string;
  style?: React.CSSProperties;
}

const TaskList: React.FC<TaskListProps> = ({ title, subtitle, tasks = [], showCount = 5, viewAllLink, style }) => {
  const displayTasks = tasks.slice(0, showCount);

  return (
    <div className="task-list card card-body" >
      <div className="card-header-section">
        <h5 className="card-title">{title || 'Tasks'}</h5>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
      
      <div className="task-items">
        {displayTasks.length > 0 ? (
          displayTasks.map((task) => (
            <div key={task.id} className="task-item">
              <div className="task-content">
                <h6 className="task-title">{task.title}</h6>
                <p className="task-description">{task.description}</p>
                <p className="task-due-date">📅 {task.dueDate}</p>
              </div>
              <span className="task-badge">{task.badge}</span>
              {task.actions && task.actions.length > 0 && (
                <div className="task-actions">
                  {task.actions.map((action, idx) => (
                    <button
                      key={idx}
                      className={`action-btn ${action.style === 'primary' ? 'action-btn-primary' : 'action-btn-secondary'}`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-data">No tasks available</p>
        )}
      </div>

      {viewAllLink && tasks.length > showCount && (
        <a href={viewAllLink} className="view-all-link">View All Tasks →</a>
      )}
    </div>
  );
};

export default TaskList;

