// src/MicroplasticPlatform.js

import React, { useState, useEffect } from 'react';
import { MapPin, Upload, BarChart3, FileText, Settings, Bell, Download, Filter, Droplets, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ApiService from './services/api'; // Import the API service
import InteractiveMap from './components/InteractiveMap'; // Adjust the path if needed

const MicroplasticPlatform = () => {

  const [selectedMapLocation, setSelectedMapLocation] = useState(null);

  const handleLocationClick = (location) => {
    setSelectedMapLocation(location);
  };

  // UI State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  const [concentrationFilter, setConcentrationFilter] = useState('all');

  // Data and API State
  const [locationData, setLocationData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  
  // Static data (can also be fetched from API if needed)
  const concentrationDistribution = [
    { range: '0-50', count: 12 },
    { range: '50-100', count: 18 },
    { range: '100-200', count: 25 },
    { range: '200-300', count: 15 },
    { range: '300+', count: 8 }
  ];

  // Load data on component mount
  useEffect(() => {
    checkBackendConnection();
    loadInitialData();
  }, []);

  const checkBackendConnection = async () => {
    try {
      const isConnected = await ApiService.testConnection();
      setConnectionStatus(isConnected ? 'connected' : 'disconnected');
    } catch (error) {
      setConnectionStatus('error');
      console.error('Backend connection failed:', error);
    }
  };

  const loadInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch real data from the backend in parallel
      const [locations, readings] = await Promise.all([
        ApiService.getLocations(),
        ApiService.getLatestReadings()
      ]);
      
      setLocationData(locations);
      setTrendData(readings);
    } catch (err) {
      console.error('Failed to load data:', err);
      setError('Failed to load data from backend. Displaying mock data.');
      // Fall back to mock data on error
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = () => {
    // This is the fallback if the API fails
    setLocationData([
      { id: 1, name: 'Bhayandar Creek', lat: 19.3011, lng: 72.8506, concentration: 245, status: 'high', lastUpdate: '2025-09-25 10:30' },
      { id: 2, name: 'Versova Beach', lat: 19.1347, lng: 72.8064, concentration: 180, status: 'medium', lastUpdate: '2025-09-25 09:15' },
      { id: 3, name: 'Juhu Beach', lat: 19.0990, lng: 72.8263, concentration: 320, status: 'critical', lastUpdate: '2025-09-25 11:00' },
    ]);
    setTrendData([
      { date: '2025-09-01', concentration: 210 },
      { date: '2025-09-10', concentration: 220 },
      { date: '2025-09-20', concentration: 260 },
      { date: '2025-09-25', concentration: 245 },
    ]);
  };

  // Helper function for status colors
  const getStatusColor = (status) => {
    switch(status) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // --- Reusable UI Components ---

  const ConnectionStatus = () => (
    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
      connectionStatus === 'connected' ? 'bg-green-100 text-green-800' :
      connectionStatus === 'disconnected' ? 'bg-red-100 text-red-800' :
      'bg-yellow-100 text-yellow-800 animate-pulse'
    }`}>
      Backend: {connectionStatus}
    </div>
  );
  
  const StatCard = ({ icon: Icon, title, value, change, color = "blue" }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600 mt-1`}>{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 bg-${color}-50 rounded-lg`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  // --- Main View Components (Tabs) ---
  
const MapView = () => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-blue-600" />
          Real-time Monitoring Locations
        </h3>
      </div>
      <div className="p-4">
        {/* Render the real InteractiveMap component */}
        <InteractiveMap 
          locations={locationData} 
          onLocationClick={handleLocationClick} 
        />
        
        {/* Display details of the clicked location below the map */}
        {selectedMapLocation && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-bold text-blue-800">{selectedMapLocation.name}</h4>
            <p className="text-sm text-gray-700">
              Concentration: 
              <span className="font-semibold"> {selectedMapLocation.concentration} μg/L</span>
            </p>
            <p className="text-xs text-gray-500">
              Status: 
              <span className="font-medium">{selectedMapLocation.status}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const DataUpload = () => (
     <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Upload className="h-5 w-5 mr-2 text-blue-600" />
            Data Upload Center
          </h3>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <Upload className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Manual Data Upload</h4>
              <p className="text-gray-600 mb-4">Upload CSV or Excel files with measurements</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Choose File
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-8 text-center">
              <Settings className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Device API Configuration</h4>
              <p className="text-gray-600 mb-4">Configure automated uploads from devices</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                API Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Analytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Concentration Trends
          </h3>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="concentration" stroke="#004080" strokeWidth={3} name="Concentration (μg/L)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
       <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Concentration Distribution</h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={concentrationDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#004080" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
    </div>
  );
  
  const Reports = () => (
     <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            Generate Reports
          </h3>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-medium mb-2">Weekly Summary</h4>
              <button className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                Generate PDF
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <Download className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-medium mb-2">Data Export</h4>
              <button className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors">
                Export Excel
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h4 className="font-medium mb-2">Policy Brief</h4>
              <button className="bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700 transition-colors">
                Generate Brief
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="px-3 py-1 border border-gray-300 rounded text-sm">
            <option value="all">All Locations</option>
            {locationData.map(loc => (<option key={loc.id} value={loc.id}>{loc.name}</option>))}
          </select>
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="px-3 py-1 border border-gray-300 rounded text-sm">
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Droplets} title="Monitoring Sites" value={locationData.length} change="+2 new sites" color="blue" />
        <StatCard icon={TrendingUp} title="Avg Concentration" value="237 μg/L" change="+12%" color="orange" />
        <StatCard icon={AlertTriangle} title="High Risk Locations" value={locationData.filter(l => l.status === 'high' || l.status === 'critical').length} change="+1" color="red" />
        <StatCard icon={BarChart3} title="Total Samples" value="1,247" change="+89 this week" color="green" />
      </div>

      {/* Map and Alerts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><MapView /></div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-red-600" /> Active Alerts
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {locationData.filter(loc => loc.status === 'critical' || loc.status === 'high').map(location => (
              <div key={location.id} className={`p-3 rounded-lg border ${getStatusColor(location.status)}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{location.name}</p>
                    <p className="text-sm opacity-75">{location.concentration} μg/L</p>
                    <p className="text-xs opacity-60 mt-1">{location.lastUpdate}</p>
                  </div>
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Concentration Trends (Last 30 Days)</h3>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="concentration" stroke="#004080" fill="#E3F2FD" strokeWidth={2} name="Concentration (μg/L)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
  
  // Renders the content based on the active tab
  const renderContent = () => {
    if (loading) {
      return <div className="text-center py-20 text-gray-600">Loading data...</div>;
    }
    
    switch(activeTab) {
      case 'dashboard': return renderDashboard();
      case 'upload': return <DataUpload />;
      case 'analytics': return <Analytics />;
      case 'reports': return <Reports />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Droplets className="h-6 w-6 text-white" />
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-gray-900">Microplastic Monitoring</h1>
                  <p className="text-sm text-gray-600">Government of Maharashtra</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
               <ConnectionStatus />
               {error && (
                <div className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded">
                  {error}
                </div>
              )}
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">R</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 mr-6">
            <nav className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
              <div className="space-y-1">
                {[
                  { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
                  { id: 'upload', icon: Upload, label: 'Data Upload' },
                  { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
                  { id: 'reports', icon: FileText, label: 'Reports' }
                ].map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === id 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {label}
                  </button>
                ))}
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
            <div>
              © 2025 Government of Maharashtra - Environmental Monitoring Division
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MicroplasticPlatform;