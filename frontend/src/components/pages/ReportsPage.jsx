// src/components/pages/ReportsPage.jsx

import React from 'react';
import { FileText, Download, Users } from 'lucide-react';

const recentReports = [
  { title: 'Mumbai Coastal Monitoring - September 2025', type: 'Monthly Report', date: '2025-09-25', size: '2.4 MB' },
  { title: 'Microplastic Hotspots Analysis', type: 'Research Report', date: '2025-09-20', size: '1.8 MB' },
  { title: 'Policy Recommendations for Marine Conservation', type: 'Policy Brief', date: '2025-09-15', size: '956 KB' }
];

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      {/* Generate Reports Section */}
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
              <button className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700">Generate PDF</button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <Download className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-medium mb-2">Data Export</h4>
              <button className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700">Export Excel</button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h4 className="font-medium mb-2">Policy Brief</h4>
              <button className="bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700">Generate Brief</button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {recentReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{report.title}</p>
                  <p className="text-sm text-gray-600">{report.type} • {report.date} • {report.size}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Download</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;