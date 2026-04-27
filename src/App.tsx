
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SupplierDashboard from './pages/SupplierDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import type { WidgetLayout } from './constants/types';
import dashboardConfig from './constants/dashboardConfig.json';
import SupplierdashboardConfig from './constants/SupplierdashboardConfig.json';
import BuyerdashboardConfig from './constants/BuyerdashboardConfig.json';
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
        console.log('Supplier Dashboard Config:', SupplierdashboardConfig);
        setSupplierLayoutData(SupplierdashboardConfig.dashboard.layout as WidgetLayout[]);
      }

      if (BuyerdashboardConfig?.dashboard?.layout) {
        console.log('Buyer Dashboard Config:', BuyerdashboardConfig);
        setBuyerLayoutData(BuyerdashboardConfig.dashboard.layout as WidgetLayout[]);
      }

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontSize: '18px' }}>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: '#d32f2f', textAlign: 'center' }}>
        <h2>Error Loading Dashboard</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <BrowserRouter basename="/dashboard">
      <Routes>
        <Route path="/" element={<Dashboard layoutData={layoutData} />} />
        <Route path="/supplier" element={<SupplierDashboard layoutData={supplierLayoutData} />} />
        <Route path="/buyer" element={<BuyerDashboard layoutData={buyerLayoutData} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;