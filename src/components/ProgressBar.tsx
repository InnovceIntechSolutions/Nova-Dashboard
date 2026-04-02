import React, { useEffect, useState } from 'react';

export interface ProgressBarProps {
  percentage?: number;
  title?: string;
  style?: React.CSSProperties;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, title, style }) => {
  const [progress, setProgress] = useState<number>(0);
  const progressValue = percentage || 0;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (progress < progressValue) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= progressValue) {
            clearInterval(interval);
            return progressValue;
          }
          return prev + 1;
        });
      }, 10);
    }
    return () => clearInterval(interval);
  }, [progressValue]);

  const getProgressColor = (value: number) => {
    if (value > 80) return 'var(--success-color)';
    if (value > 60) return 'var(--warning-color)';
    return 'var(--danger-color)';
  };

  return (
    <div className="progress-container card card-body" >
      <div className="progress-label">{title || 'Progress'}</div>
      <div className="progress-bar-wrapper">
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{
              width: `${progress}%`,
              backgroundColor: getProgressColor(progress),
            }}
          />
        </div>
      </div>
      <div className="progress-percentage">{progress}%</div>
    </div>
  );
};

export default ProgressBar;
