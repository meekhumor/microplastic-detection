// src/MicroplasticPlatform.jsx

import React, { useState, useEffect } from 'react';
import ApiService from './services/api';

// Import the new, separated components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import DashboardPage from './components/pages/DashboardPage';
import AnalyticsPage from './components/pages/AnalyticsPage';
import DataUploadPage from './components/pages/DataUploadPage';
import ReportsPage from './components/pages/ReportsPage';

const MicroplasticPlatform = () => {
  // --- STATE MANAGEMENT ---
  const [locationData, setLocationData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMapLocation, setSelectedMapLocation] = useState(null);

  // --- DATA FETCHING ---
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        const isConnected = await ApiService.testConnection();
        setConnectionStatus(isConnected ? 'connected' : 'disconnected');
        
        if (isConnected) {
          const [locations, readings] = await Promise.all([
            ApiService.getLocations(),
            ApiService.getLatestReadings()
          ]);
          setLocationData(locations);
          setTrendData(readings);
        } else {
          throw new Error("Backend disconnected");
        }
      } catch (err) {
        setError('Failed to load data. Displaying mock data.');
        // You can call a loadMockData() function here if you have one
      } finally {
        setLoading(false);
      }
    };
    loadAllData();
  }, []);

  // --- EVENT HANDLERS ---
  const handleLocationClick = (location) => {
    setSelectedMapLocation(location);
  };

  // --- RENDER LOGIC ---
  const renderContent = () => {
    if (loading) {
      return <div className="text-center py-20 text-gray-600">Loading data...</div>;
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardPage 
            locationData={locationData}
            trendData={trendData}
            handleLocationClick={handleLocationClick}
            selectedMapLocation={selectedMapLocation}
          />
        );
      case 'analytics':
        return <AnalyticsPage trendData={trendData} />;
      case 'upload':
        return <DataUploadPage />;
      case 'reports':
        return <ReportsPage />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header connectionStatus={connectionStatus} error={error} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MicroplasticPlatform;