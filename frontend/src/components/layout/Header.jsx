// src/components/layout/Header.jsx

import React from 'react';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

const Header = ({error }) => (
  <header className="bg-white shadow-sm sticky top-0 z-20">
    {/* The top bar can be kept or removed based on your preference */}
     <div className="bg-orange-500 text-white h-8">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
        {/* Left side links */}
        <div className="flex items-center space-x-4 text-xs font-medium">
          <a href="#" className="hover:underline">Citizens Portal</a>
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
        {/* Right side social icons */}
        <div className="flex items-center space-x-3">
          <a href="#" title="Facebook" className="hover:opacity-80 transition-opacity"><Facebook size={16} /></a>
          <a href="#" title="Twitter" className="hover:opacity-80 transition-opacity"><Twitter size={16} /></a>
          <a href="#" title="LinkedIn" className="hover:opacity-80 transition-opacity"><Linkedin size={16} /></a>
          <a href="#" title="YouTube" className="hover:opacity-80 transition-opacity"><Youtube size={16} /></a>
        </div>
      </div>
    </div>

    {/* Main Header (White) - Redesigned */}
    <div className="border-b border-gray-200">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Left Side: Emblem and Title */}
          <div className="flex items-center space-x-4">
            {/* Official Government Emblem */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/1200px-Emblem_of_India.svg.png" 
              alt="Emblem of India"
              className="h-12 w-12 object-contain"
            />
            {/* Title */}
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">Ministry of Earth Science</h1>
              <p className="text-sm text-gray-600 leading-tight">Government of Maharashtra</p>
            </div>
          </div>

          {/* Right Side: Logos, Status, and User Info */}
          <div className="flex items-center space-x-6">
            
            {/* Partner Logos Section */}
            <div className="hidden md:flex items-center space-x-4">
              <img 
                src="img.png" 
                alt="Swachh Bharat Abhiyan Logo" 
                className="h-20 object-contain"
              />
            </div> 

          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;