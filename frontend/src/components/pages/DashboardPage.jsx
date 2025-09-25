// src/components/pages/DashboardPage.jsx

import React from 'react';
import StatCard from '../common/StatCard';
import InteractiveMap from '../map/InteractiveMap';
import HeroSlider from '../common/HeroSlider'; 
import { Droplets, TrendingUp, AlertTriangle, BarChart3, Bell } from 'lucide-react';

const DashboardPage = ({ 
  locationData, 
  handleLocationClick,
}) => {
  // --- 1. Add the getStatusColor helper function here ---
  const getStatusColor = (status) => {
    switch(status) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  return (
    <div className="space-y-8">
      <HeroSlider />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Droplets} title="Monitoring Sites" value={locationData.length} color="blue" />
        <StatCard icon={TrendingUp} title="Avg Concentration" value="237 μg/L" change="+12%" color="orange" />
        <StatCard icon={AlertTriangle} title="High Risk Locations" value={locationData.filter(l => l.status === 'high' || l.status === 'critical').length} change="+1" color="red" />
        <StatCard icon={BarChart3} title="Total Samples" value="1,247" change="+89" color="green" />
      </div>

      {/* Map and Alerts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <InteractiveMap 
              locations={locationData} 
              onLocationClick={handleLocationClick} 
            />
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-red-600" /> Active Alerts
            </h3>
          </div>
          {/* --- 2. This is the section that uses the function --- */}
          <div className="p-6 space-y-4">
            {locationData
                .filter(loc => loc.status === 'critical' || loc.status === 'high')
                // Add this .sort() method to reorder the alerts
                .sort((a, b) => {
                const statusPriority = { critical: 1, high: 2 };
                return statusPriority[a.status] - statusPriority[b.status];
                })
                .map(location => (
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
                ))
            }
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;