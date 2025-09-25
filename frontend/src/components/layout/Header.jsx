import React from 'react';
import { Droplets } from 'lucide-react';

const ConnectionStatus = ({ status }) => (
  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
    status === 'connected' ? 'bg-green-100 text-green-800' :
    status === 'disconnected' ? 'bg-red-100 text-red-800' :
    'bg-yellow-100 text-yellow-800 animate-pulse'
  }`}>
    Backend: {status}
  </div>
);

const Header = ({ connectionStatus, error }) => (
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
          <ConnectionStatus status={connectionStatus} />
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
);

export default Header;