// src/components/Header.tsx
import React from 'react';

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  userName?: string;
  style?: React.CSSProperties;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, userName, style }) => {
  return (
    <div className="header-container" >
      <div className="header-content">
        <div className="header-text">
          <h1 className="header-title">{title || 'Dashboard'}</h1>
          {subtitle && <p className="header-subtitle">{subtitle}</p>}
        </div>
        {userName && <p className="header-user">👤 {userName}</p>}
      </div>
    </div>
  );
};

export default Header;