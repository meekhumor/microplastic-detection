const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class ApiService {
  async fetchLocations() {
    const response = await fetch(`${API_BASE_URL}/locations/`);
    return response.json();
  }

  async fetchReadings(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/readings/?${params}`);
    return response.json();
  }

  async uploadData(formData) {
    const response = await fetch(`${API_BASE_URL}/upload/`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  }

  async generateReport(reportType, filters) {
    const response = await fetch(`${API_BASE_URL}/reports/${reportType}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters),
    });
    return response.blob();
  }
}

export default new ApiService();