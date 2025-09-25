// src/components/layout/Navbar.jsx

import React from 'react';
import { Home, BarChart3, Upload, TrendingUp, FileText } from 'lucide-react';

const navItems = [
  { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
  { id: 'upload', icon: Upload, label: 'Data Upload' },
  { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
  { id: 'reports', icon: FileText, label: 'Reports' }
];

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="bg-blue-900 text-white shadow-md sticky top-[112px] z-10">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-12 space-x-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            title="Dashboard"
            className="p-3 hover:bg-black transition-colors"
          >
            <Home size={20} />
          </button>
          
          <div className="h-6 border-l border-black"></div>

          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-5 py-3 text-sm font-medium transition-colors ${
                activeTab === id 
                  ? 'bg-black' 
                  : 'hover:bg-black'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;