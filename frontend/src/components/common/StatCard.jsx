import React from 'react';

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

export default StatCard;