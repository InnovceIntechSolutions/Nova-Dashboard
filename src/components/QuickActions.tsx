import React,{useState} from "react";

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
const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  return (
    <div className="card border-0 shadow-sm h-100" style={style}>
      <div className="card-body">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0 fw-bold text-dark">  Quick Actions</h6>
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
              <div
  key={idx}
  className="col-12 col-md-6 col-lg-3"
  onMouseEnter={() => setHoveredIdx(idx)}
  onMouseLeave={() => setHoveredIdx(null)}
>
  <a href={action.action} className="text-decoration-none">
    <div
      className="p-3 border rounded-3 h-100 d-flex align-items-start gap-3"
      style={{
        borderColor: '#3b82f6',
        borderBottomWidth: '3px',
        borderBottomStyle: 'solid',
        backgroundColor: hoveredIdx === idx ? '#f3f3f3' : '#ffffff',
        transition: 'background-color 0.2s ease',
      }}
    >

                      {/* Icon Circle */}

<div
  className={`d-flex align-items-center justify-content-center rounded-circle bg-${color} bg-opacity-10`}
  style={{ width: "48px", height: "48px" }}
>
  {action.icon ? (
    <span className="fs-5">{action.icon}</span>
  ) : (
    <i className={`fa-solid fa-bolt text-${color} fs-5`}></i> 
  )}
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
           <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '200px' }}>
              No actions available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;