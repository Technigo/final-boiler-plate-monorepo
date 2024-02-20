import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API;
const withEndpoint = (endpoint) => `${API_BASE_URL}/api/auth/${endpoint}`;

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  register: async (username, password, email) => {
    try {
      const response = await axios.post(withEndpoint("register"), {
        username,
        password,
        email,
      });
      set({ user: response.data.user });
    } catch (error) {
      console.error("Signup error:", error);
    }
  },
  login: async (credentials) => {
    try {
      const response = await axios.post(withEndpoint("login"), credentials, {
        withCredentials: true,
      });
      const token = response.data.token;
      set({ isAuthenticated: true, user: response.data.user });
    } catch (error) {
      console.error(error.response.data);
      set({ isAuthenticated: false, user: null });
    }
  },
  logout: async () => {
    try {
      await axios.post(withEndpoint("logout"), {}, { withCredentials: true });
      set({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error(error.response.data);
    }
  },
}));

