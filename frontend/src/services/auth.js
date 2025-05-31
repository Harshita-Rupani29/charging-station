import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const authService = {
  async login(email, password) {
    const response = await axios.post(`${API_URL}/auth`, {
      email,
      password,
    });

    if (response.data.data) {
      localStorage.setItem("token", response.data.data);
    }

    return response.data;
  },

  async register(firstName, lastName, email, password) {
    const response = await axios.post(`${API_URL}/users`, {
      firstName,
      lastName,
      email,
      password,
    });

    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
  },

  getToken() {
    return localStorage.getItem("token");
  },
};
