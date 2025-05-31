import axios from "axios";
const API_URL = "http://localhost:8080/api/services";

// attach JWT token to every request
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const stationService = {
  async getAllStations(filters = {}) {
    const query = {};

    if (filters.status) query.status = filters.status.toLowerCase();
    if (filters.connectorType) query.connectorType = filters.connectorType;
    if (filters.minPower) query.powerOutput = Number(filters.minPower);

    const queryParams = new URLSearchParams(query).toString();

    const response = await axios.get(
      `${API_URL}/stations${queryParams ? `?${queryParams}` : ""}`
    );
    return response.data;
  },

  async getStationById(id) {
    const response = await axios.get(`${API_URL}/stations/${id}`);
    return response.data;
  },

  async createStation(stationData) {
    const response = await axios.post(`${API_URL}/stations`, stationData);
    return response.data;
  },

  async updateStation(id, stationData) {
    const response = await axios.put(`${API_URL}/stations/${id}`, stationData);
    return response.data;
  },

  async deleteStation(id) {
    const response = await axios.delete(`${API_URL}/stations/${id}`);
    return response.data;
  },
};
