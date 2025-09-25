import React from 'react';
import { BarChart3, Upload, TrendingUp, FileText } from 'lucide-react';

const navItems = [
  { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
  { id: 'upload', icon: Upload, label: 'Data Upload' },
  { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
  { id: 'reports', icon: FileText, label: 'Reports' }
];

const Sidebar = ({ activeTab, setActiveTab }) => (
  <aside className="w-64 mr-6">
    <nav className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sticky top-24">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
      <div className="space-y-1">
        {navItems.map(({ id, icon: Icon, label }) => (
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
);

export default Sidebar;