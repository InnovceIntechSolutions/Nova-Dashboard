import React from 'react';

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  userName?: string;
  style?: React.CSSProperties;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, userName, style }) => {
  // Hardcoded JSON configuration inside the Header component
  const config = {
    id: "header",
    type: "component",
    component: "Header",
    props: {
      title: "Supplier Portal - Welcome Back, ABC Suppliers Ltd",
      subtitle: "Last Login: March 26, 2026 - 10:45 AM",
      userName: "ABC Suppliers Ltd"
    },
    position: {
      row: 1,
      column: 1,
      span: 12
    }
  };

  // Destructure the props from the config if they are not passed
  const { title: configTitle, subtitle: configSubtitle, userName: configUserName } = config.props;

  return (
    <div className="page-header page-header-light shadow mb-4 position-sticky top-0 bg-white" style={{ zIndex: 1000}}>
      <div className="page-header-content d-lg-flex justify-content-between align-items-center">
        <div className="page-title mb-0">
          <h4>{title || configTitle}</h4>
        </div>
        {/* Optionally render subtitle and username */}
        {/* {subtitle || configSubtitle ? <div className="fw-normal">{subtitle || configSubtitle}</div> : null}
        {userName || configUserName ? <div className="header-user">{userName || configUserName}</div> : null} */}
      </div>
    </div>
  );
};

export default Header;