// src/components/pages/DataUploadPage.jsx

import React from 'react';
import { Upload, Settings } from 'lucide-react';

const recentUploads = [
  { file: 'bhayandar_creek_sept_2025.csv', date: '2025-09-25 11:30', records: 150, status: 'processed' },
  { file: 'versova_beach_monitoring.xlsx', date: '2025-09-24 16:20', records: 89, status: 'processing' },
  { file: 'mumbai_coastal_survey.csv', date: '2025-09-23 09:15', records: 234, status: 'processed' }
];

const DataUploadPage = () => {
  return (
    <div className="space-y-6">
      {/* Data Upload Center */}
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

      {/* Recent Uploads List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Uploads</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {recentUploads.map((upload, index) => (
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
};

export default DataUploadPage;