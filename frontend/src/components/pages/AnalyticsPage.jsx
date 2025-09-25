// src/components/pages/AnalyticsPage.jsx

import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

// Mock data for the distribution chart, this could also be passed as a prop
const concentrationDistribution = [
  { range: '0-50', count: 12 },
  { range: '50-100', count: 18 },
  { range: '100-200', count: 25 },
  { range: '200-300', count: 15 },
  { range: '300+', count: 8 }
];

const AnalyticsPage = ({ trendData }) => {
  return (
    <div className="space-y-6">
      {/* Concentration Trends Chart */}
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
        {/* Concentration Distribution Chart */}
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
                <Bar dataKey="count" fill="#004080" name="Sample Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Statistical Summary Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Statistical Summary</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between"><span className="text-gray-600">Average Concentration:</span><span className="font-semibold">237 μg/L</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Median:</span><span className="font-semibold">245 μg/L</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Maximum:</span><span className="font-semibold text-red-600">320 μg/L</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Minimum:</span><span className="font-semibold text-green-600">150 μg/L</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Locations Above Threshold:</span><span className="font-semibold text-orange-600">3/5 (60%)</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;