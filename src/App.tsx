// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SupplierDashboard from './pages/SupplierDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import type { WidgetLayout } from './constants/types';
import dashboardConfig from './constants/dashboardConfig.json';
import SupplierdashboardConfig from './constants/SupplierdashboardConfig.json';
import BuyerdashboardConfig from './constants/BuyerdashboardConfig.json';
import { SearchProvider } from './Context/SearchContext';
// ─── Spinner 

const Spinner: React.FC = () => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f9fafb',
      zIndex: 9999,
      gap: 16,
    }}
  >
    {/* Ring */}
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: '50%',
        border: '4px solid #e5e7eb',
        borderTopColor: '#6366f1',
        animation: 'spin 0.75s linear infinite',
      }}
    />
    <div style={{ fontSize: 14, color: '#6b7280', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
      Loading dashboard...
    </div>

    {/* Keyframe injected inline */}
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// ─── App

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [layoutData, setLayoutData] = useState<WidgetLayout[]>([]);
  const [supplierLayoutData, setSupplierLayoutData] = useState<WidgetLayout[]>([]);
  const [buyerLayoutData, setBuyerLayoutData] = useState<WidgetLayout[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (dashboardConfig?.dashboard?.layout) {
        setLayoutData(dashboardConfig.dashboard.layout as WidgetLayout[]);
      } else {
        throw new Error('Invalid dashboard configuration structure');
      }

      if (SupplierdashboardConfig?.dashboard?.layout) {
        setSupplierLayoutData(SupplierdashboardConfig.dashboard.layout as WidgetLayout[]);
      }

      if (BuyerdashboardConfig?.dashboard?.layout) {
        setBuyerLayoutData(BuyerdashboardConfig.dashboard.layout as WidgetLayout[]);
      }

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f9fafb',
          gap: 12,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div style={{ fontSize: 36 }}>⚠️</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>Error Loading Dashboard</div>
        <div style={{ fontSize: 14, color: '#6b7280' }}>{error}</div>
      </div>
    );
  }

  return (
  <BrowserRouter basename="/dashboard">
    <SearchProvider>
      <Routes>
        <Route path="/"         element={<Dashboard         layoutData={layoutData}         />} />
        <Route path="/supplier" element={<SupplierDashboard layoutData={supplierLayoutData} />} />
        <Route path="/buyer"    element={<BuyerDashboard    layoutData={buyerLayoutData}    />} />
        <Route path="*"         element={<Navigate to="/" replace />} />
      </Routes>
    </SearchProvider>
  </BrowserRouter>
);

};

export default App;