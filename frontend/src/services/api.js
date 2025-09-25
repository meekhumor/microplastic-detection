// src/services/api.js (Mock Version)

// --- 1. Mock Data ---
// We'll define all our mock data in one place.
const mockData = {
  locations: [
    { id: 1, name: 'Bhayandar Creek', lat: 19.3011, lng: 72.8506, concentration: 245, status: 'high', lastUpdate: '2025-09-25 10:30' },
    { id: 2, name: 'Versova Beach', lat: 19.1347, lng: 72.8064, concentration: 180, status: 'medium', lastUpdate: '2025-09-25 09:15' },
    { id: 3, name: 'Juhu Beach', lat: 19.0990, lng: 72.8263, concentration: 320, status: 'critical', lastUpdate: '2025-09-25 11:00' },
    { id: 4, name: 'Mahim Bay', lat: 19.0418, lng: 72.8397, concentration: 290, status: 'high', lastUpdate: '2025-09-25 08:45' },
    { id: 5, name: 'Worli Sea Face', lat: 19.0276, lng: 72.8142, concentration: 95, status: 'low', lastUpdate: '2025-09-25 10:00' }
  ],
  latestReadings: [
    { date: '2025-09-01', concentration: 210, temperature: 28, ph: 7.2 },
    { date: '2025-09-05', concentration: 190, temperature: 29, ph: 7.1 },
    { date: '2025-09-10', concentration: 220, temperature: 27, ph: 7.3 },
    { date: '2025-09-15', concentration: 240, temperature: 30, ph: 7.0 },
    { date: '2025-09-20', concentration: 260, temperature: 28, ph: 7.2 },
    { date: '2025-09-25', concentration: 245, temperature: 29, ph: 7.1 }
  ],
};

// --- 2. Mock Request Helper ---
// This function simulates a network request with a delay.
const mockRequest = (data, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mock API returning:', data);
      resolve(data);
    }, delay);
  });
};


class ApiService {
  // We don't need a constructor or baseURL for the mock service

  // Test backend connection
  async testConnection() {
    console.log('Mock API: Testing connection...');
    // Always return true for a successful connection in mock mode.
    return mockRequest(true, 500);
  }

  // Get all monitoring locations
  async getLocations() {
    console.log('Mock API: Fetching locations...');
    return mockRequest(mockData.locations);
  }

  // Get latest readings for dashboard
  async getLatestReadings() {
    console.log('Mock API: Fetching latest readings...');
    return mockRequest(mockData.latestReadings);
  }

  // You can add mock responses for other methods as needed.
  // For now, they will just return a simple success message.

  async getReadings(filters = {}) {
    console.log('Mock API: Fetching readings with filters:', filters);
    return mockRequest(mockData.latestReadings.slice(0, 3)); // Return a subset
  }

  async getTrendData(locationId, days = 30) {
    console.log(`Mock API: Fetching trends for location ${locationId} for ${days} days`);
    return mockRequest(mockData.latestReadings);
  }

  async uploadCSV(formData) {
    console.log('Mock API: Simulating CSV upload...');
    return mockRequest({ status: 'success', message: 'File processed successfully', rows: 150 });
  }
  
  async generateReport(reportType, filters = {}) {
    console.log(`Mock API: Simulating report generation for ${reportType}`);
    const fakeBlob = new Blob(["This is a mock PDF report."], { type: 'application/pdf' });
    return mockRequest(fakeBlob);
  }
}

export default new ApiService();