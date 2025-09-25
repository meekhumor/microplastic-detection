import React, { useState, useEffect } from 'react';
import { MapPin, Upload, BarChart3, FileText, Settings, Bell, Download, Filter, Droplets, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

const MicroplasticPlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  const [concentrationFilter, setConcentrationFilter] = useState('all');

  // Mock data for demonstrations
  const locationData = [
    { id: 1, name: 'Bhayandar Creek', lat: 19.3011, lng: 72.8506, concentration: 245, status: 'high', lastUpdate: '2025-09-25 10:30' },
    { id: 2, name: 'Versova Beach', lat: 19.1347, lng: 72.8064, concentration: 180, status: 'medium', lastUpdate: '2025-09-25 09:15' },
    { id: 3, name: 'Juhu Beach', lat: 19.0990, lng: 72.8263, concentration: 320, status: 'critical', lastUpdate: '2025-09-25 11:00' },
    { id: 4, name: 'Mahim Bay', lat: 19.0418, lng: 72.8397, concentration: 290, status: 'high', lastUpdate: '2025-09-25 08:45' },
    { id: 5, name: 'Worli Creek', lat: 19.0176, lng: 72.8162, concentration: 150, status: 'medium', lastUpdate: '2025-09-25 10:00' }
  ];

  const trendData = [
    { date: '2025-09-01', concentration: 210, temperature: 28, ph: 7.2 },
    { date: '2025-09-05', concentration: 190, temperature: 29, ph: 7.1 },
    { date: '2025-09-10', concentration: 220, temperature: 27, ph: 7.3 },
    { date: '2025-09-15', concentration: 240, temperature: 30, ph: 7.0 },
    { date: '2025-09-20', concentration: 260, temperature: 28, ph: 7.2 },
    { date: '2025-09-25', concentration: 245, temperature: 29, ph: 7.1 }
  ];

  const concentrationDistribution = [
    { range: '0-50', count: 12, color: '#2E7D32' },
    { range: '50-100', count: 18, color: '#66BB6A' },
    { range: '100-200', count: 25, color: '#FFCC00' },
    { range: '200-300', count: 15, color: '#FF9800' },
    { range: '300+', count: 8, color: '#F44336' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const StatCard = ({ icon: Icon, title, value, change, color = "blue" }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600 mt-1`}>{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
              {change} from last week
            </p>
          )}
        </div>
        <div className={`p-3 bg-${color}-50 rounded-lg`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const MapView = () => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-blue-600" />
          Real-time Monitoring Locations
        </h3>
      </div>
      <div className="p-6">
        <div className="bg-gray-50 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
            {/* Simulated map with location pins */}
            {locationData.map((location, index) => (
              <div
                key={location.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer`}
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${30 + (index % 3) * 20}%`
                }}
                title={`${location.name}: ${location.concentration} μg/L`}
              >
                <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg animate-pulse ${
                  location.status === 'critical' ? 'bg-red-500' :
                  location.status === 'high' ? 'bg-orange-500' :
                  location.status === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}>
                </div>
                <div className="text-xs font-medium text-gray-700 mt-1 text-center whitespace-nowrap">
                  {location.name}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center z-10">
            <p className="text-gray-600 text-lg mb-2">Interactive Map View</p>
            <p className="text-sm text-gray-500">Leaflet.js / Mapbox integration would be implemented here</p>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Low (&lt;100 μg/L)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span>Medium (100-200 μg/L)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
            <span>High (200-300 μg/L)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span>Critical (&gt;300 μg/L)</span>
          </div>
        </div>
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
              <p className="text-gray-600 mb-4">Upload CSV or Excel files with microplastic measurements</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Choose File
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-8 text-center">
              <Settings className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Device API Configuration</h4>
              <p className="text-gray-600 mb-4">Configure automated uploads from monitoring devices</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                API Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Uploads</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {[
              { file: 'bhayandar_creek_sept_2025.csv', date: '2025-09-25 11:30', records: 150, status: 'processed' },
              { file: 'versova_beach_monitoring.xlsx', date: '2025-09-24 16:20', records: 89, status: 'processing' },
              { file: 'mumbai_coastal_survey.csv', date: '2025-09-23 09:15', records: 234, status: 'processed' }
            ].map((upload, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{upload.file}</p>
                  <p className="text-sm text-gray-600">{upload.records} records • {upload.date}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  upload.status === 'processed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {upload.status}
                </span>
              </div>
            ))}
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

      <div className="grid md:grid-cols-2 gap-6">
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

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Statistical Summary</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Average Concentration:</span>
              <span className="font-semibold">237 μg/L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Median:</span>
              <span className="font-semibold">245 μg/L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Maximum:</span>
              <span className="font-semibold text-red-600">320 μg/L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Minimum:</span>
              <span className="font-semibold text-green-600">150 μg/L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Locations Above Threshold:</span>
              <span className="font-semibold text-orange-600">3/5 (60%)</span>
            </div>
          </div>
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

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {[
              { title: 'Mumbai Coastal Monitoring - September 2025', type: 'Monthly Report', date: '2025-09-25', size: '2.4 MB' },
              { title: 'Microplastic Hotspots Analysis', type: 'Research Report', date: '2025-09-20', size: '1.8 MB' },
              { title: 'Policy Recommendations for Marine Conservation', type: 'Policy Brief', date: '2025-09-15', size: '956 KB' }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{report.title}</p>
                  <p className="text-sm text-gray-600">{report.type} • {report.date} • {report.size}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="all">All Locations</option>
                {locationData.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
              <select 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 3 Months</option>
              </select>
              <select 
                value={concentrationFilter} 
                onChange={(e) => setConcentrationFilter(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="all">All Concentrations</option>
                <option value="high">High Risk Only</option>
                <option value="critical">Critical Only</option>
              </select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              icon={Droplets} 
              title="Active Monitoring Sites" 
              value="5" 
              change="+2 new sites"
              color="blue" 
            />
            <StatCard 
              icon={TrendingUp} 
              title="Avg Concentration" 
              value="237 μg/L" 
              change="+12% from last week"
              color="orange" 
            />
            <StatCard 
              icon={AlertTriangle} 
              title="High Risk Locations" 
              value="3" 
              change="+1 from last week"
              color="red" 
            />
            <StatCard 
              icon={BarChart3} 
              title="Total Samples" 
              value="1,247" 
              change="+89 this week"
              color="green" 
            />
          </div>

          {/* Map and Alerts */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MapView />
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-red-600" />
                  Active Alerts
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
      case 'upload': return <DataUpload />;
      case 'analytics': return <Analytics />;
      case 'reports': return <Reports />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Droplets className="h-6 w-6 text-white" />
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-gray-900">Microplastic Monitoring Platform</h1>
                  <p className="text-sm text-gray-600">Government of Maharashtra - Environmental Monitoring Division</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Last Updated: Sept 25, 2025 11:30 AM
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">R</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 mr-6">
            <nav className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4">
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
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>

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
              <a href="#" className="hover:text-gray-900">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MicroplasticPlatform;