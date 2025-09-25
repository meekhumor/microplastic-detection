// src/components/layout/Header.jsx

import React from 'react';
import { Droplets, ScreenShare, Search, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

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
  <header className="bg-white shadow-sm sticky top-0 z-20">
    {/* Top Bar (Orange) */}
    <div className="bg-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-8">
        <div className="flex items-center space-x-4 text-xs">
          <a href="#" className="hover:underline">Citizens</a>
          <a href="#" className="hover:underline">States</a>
          <a href="#" className="hover:underline">About Us</a>
        </div>
        <div className="flex items-center space-x-3">
          <a href="#" title="Facebook"><Facebook size={16} /></a>
          <a href="#" title="Twitter"><Twitter size={16} /></a>
          <a href="#" title="LinkedIn"><Linkedin size={16} /></a>
          <a href="#" title="YouTube"><Youtube size={16} /></a>
        </div>
      </div>
    </div>

    {/* Main Header (White) */}
    <div className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Side: Logo and Title */}
          <div className="flex items-center space-x-4">
            {/* Placeholder for Government Emblem */}
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs">
              Logo
            </div>
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

          {/* Right Side: Status and User Info */}
          <div className="flex items-center space-x-4">
            <ConnectionStatus status={connectionStatus} />
            {error && (
              <div className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded">
                {error}
              </div>
            )}
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-blue-600">R</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;