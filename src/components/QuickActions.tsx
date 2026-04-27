import React from "react";

export interface QuickAction {
  label: string;
  icon: string;
  action: string;
  style: string; // 'primary' | 'success' | 'warning' | 'danger'
  description: string;
}

export interface QuickActionsProps {
  actions?: QuickAction[];
  style?: React.CSSProperties;
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions = [], style }) => {
  return (
    <div className="card border-0 shadow-sm h-100" style={style}>
      <div className="card-body">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0 fw-bold text-dark"> ⚡ Quick Actions</h6>
        </div>

        {/* Grid */}
        <div className="row g-3">
          {actions.length > 0 ? (
            actions.map((action, idx) => {
              const color =
                action.style === "primary"
                  ? "primary"
                  : action.style === "success"
                  ? "success"
                  : action.style === "warning"
                  ? "warning"
                  : action.style === "danger"
                  ? "danger"
                  : "secondary";

              return (
                <div key={idx} className="col-12 col-md-6 col-lg-4">
                  <a href={action.action} className="text-decoration-none">
                    <div className="p-3 border rounded-3 h-100 bg-white d-flex align-items-start gap-3">

                      {/* Icon Circle */}
                      <div
                        className={`d-flex align-items-center justify-content-center rounded-circle bg-${color} bg-opacity-10`}
                        style={{ width: "48px", height: "48px" }}
                      >
                        <i className={`${action.icon} text-${color} fs-5`}></i>
                      </div>

                      {/* Content */}
                      <div className="flex-grow-1">
                        <div className="fw-semibold text-dark">
                          {action.label}
                        </div>
                        <div className="small text-muted">
                          {action.description}
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="text-muted">
                        <i className="fa-solid fa-chevron-right"></i>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center text-muted py-4">
              No actions available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;