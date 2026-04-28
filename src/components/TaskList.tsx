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
}

const TaskList: React.FC<TaskListProps> = ({ title, subtitle, tasks = [], showCount = 5, viewAllLink }) => {
  const displayTasks = tasks.slice(0, showCount);

  return (
    <div className="task-list card border-0 shadow-sm h-100" style={{ minHeight: '200px' }}>
      <div className="card-header bg-transparent border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-0">{title || 'Action Required'}</h5>
            {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
          </div>
          {tasks.length > 0 && (
            <span className="badge bg-info">{tasks.length} Tasks</span>
          )}
        </div>
      </div>

      <div className="card-body p-0">
        {displayTasks.length > 0 ? (
          displayTasks.map((task) => (
            <div key={task.id} className="task-item d-flex justify-content-between align-items-start p-3 border-bottom">
              <div>
                <h6 className="task-title mb-1">{task.title}</h6>
                <p className="task-description text-muted mb-1">{task.description}</p>
                <p className="task-due-date small text-muted">Due: {task.dueDate}</p>
              </div>
              <div className="text-end">
                <span className={`badge rounded-pill bg-${task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warning' : 'success'}`}>
                  {task.badge}
                </span>
                {task.actions && task.actions.length > 0 && (
                  <div className="mt-2 d-flex gap-2 justify-content-end w-100">
                    {task.actions.map((action, idx) => (
                      <button
                        key={idx}
                        className={`btn btn-sm ${action.style === 'primary' ? 'btn-outline-primary' : 'btn-outline-secondary'} mb-1`}
                        onClick={() => window.location.href = action.action}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '200px' }}>
            <p className="text-center text-muted">No Actions available</p>
          </div>
        )}
      </div>

      {viewAllLink && tasks.length > showCount && (
        <div className="card-footer bg-transparent border-top text-center">
          <a href={viewAllLink} className="btn btn-link text-decoration-none">View All Tasks →</a>
        </div>
      )}
    </div>
  );
};

export default TaskList;