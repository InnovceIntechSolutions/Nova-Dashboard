// src/App.tsx
import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import type { WidgetLayout } from './constants/types';  // Use type-only import for WidgetLayout
import dashboardConfig from './constants/dashboardConfig.json'; // JSON import

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [layoutData, setLayoutData] = useState<WidgetLayout[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      console.log('Dashboard Config loaded:', dashboardConfig);
      
      // Load dashboard configuration from JSON
      if (dashboardConfig && dashboardConfig.dashboard && dashboardConfig.dashboard.layout) {
        const layout = dashboardConfig.dashboard.layout as WidgetLayout[];
        console.log('Layout data:', layout);
        console.log('Number of widgets:', layout.length);
        
        setLayoutData(layout);
        setError(null);
      } else {
        throw new Error('Invalid dashboard configuration structure');
      }
    } catch (err) {
      console.error('Error loading dashboard config:', err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    } finally {
      // Remove artificial delay for faster rendering
      setLoading(false);
    }
  }, []);

  if (error) {
    return (
      <div style={{ padding: '20px', color: '#d32f2f', textAlign: 'center' }}>
        <h2>Error Loading Dashboard</h2>
        <p>{error}</p>
        <details style={{ marginTop: '20px', textAlign: 'left' }}>
          <summary>Debug Info</summary>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
            {JSON.stringify(dashboardConfig, null, 2)}
          </pre>
        </details>
      </div>
    );
  }

  return (
    <div className="app">
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', fontSize: '18px' }}>
          <p>Loading dashboard...</p>
        </div>
      ) : layoutData.length > 0 ? (
        <Dashboard layoutData={layoutData} />
      ) : (
        <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
          <p>No dashboard data available</p>
        </div>
      )}
    </div>
  );
};

export default App;