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
}

export interface TaskListProps {
  title?: string;
  subtitle?: string;
  tasks?: Task[];
  showCount?: number;
  viewAllLink?: string;
}

const TaskList: React.FC<TaskListProps> = ({
  title,
  subtitle,
  tasks = [],
  showCount = 5,
  viewAllLink,
}) => {
  const displayTasks = tasks.slice(0, showCount);

  const getPriorityColor = (priority: string) => {
    if (priority === 'High') return 'var(--danger)';
    if (priority === 'Medium') return 'var(--warning)';
    return 'var(--success)';
  };

  const getDueText = (task: Task) => {
    if (task.daysRemaining < 0)
      return `Overdue by ${Math.abs(task.daysRemaining)} days`;
    if (task.daysRemaining === 0) return 'Due Today';
    return `${task.daysRemaining} days remaining`;
  };

  return (
    <div className="corp-card h-100">
      {/* Header */}
      <div className="p-3 border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div className="corp-title">
              {title || 'Work Queue'}
            </div>
            {subtitle && (
              <div className="corp-subtext">{subtitle}</div>
            )}
          </div>

          {tasks.length > 0 && (
            <span
              className="corp-badge"
              style={{
                background: '#eef2ff',
                color: 'var(--primary)',
              }}
            >
              {tasks.length}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-2">
        {displayTasks.length > 0 ? (
          displayTasks.map((task) => {
            const color = getPriorityColor(task.priority);

            return (
              <div
                key={task.id}
                className="corp-hover"
                style={{
                  padding: 12,
                  borderRadius: 8,
                  border: '1px solid var(--border)',
                  marginBottom: 8,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {/* LEFT */}
                <div style={{ maxWidth: '70%' }}>
                  <div className="corp-title">
                    {task.title}
                  </div>

                  <div className="corp-subtext">
                    {task.description}
                  </div>

                  <div
                    style={{
                      fontSize: 11,
                      color:
                        task.daysRemaining < 0
                          ? 'var(--danger)'
                          : task.daysRemaining === 0
                          ? 'var(--warning)'
                          : 'var(--text-secondary)',
                    }}
                  >
                    {getDueText(task)}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-end">
                  {/* Badge */}
                  <div
                    className="corp-badge"
                    style={{
                      background: `${color}15`,
                      color: color,
                      marginBottom: 6,
                    }}
                  >
                    {task.badge}
                  </div>

                  {/* Actions */}
                  <div className="d-flex gap-1 justify-content-end">
                    {task.actions?.map((a, i) => (
                      <div
                        key={i}
                        className="corp-chip"
                        onClick={() =>
                          (window.location.href = a.action)
                        }
                      >
                        {a.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center corp-subtext p-4">
            No Actions available
          </div>
        )}
      </div>

      {/* Footer */}
      {viewAllLink && tasks.length > showCount && (
        <div className="text-center border-top p-2">
          <a
            href={viewAllLink}
            style={{
              fontSize: 13,
              color: 'var(--primary)',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            View All →
          </a>
        </div>
      )}
    </div>
  );
};

export default TaskList;