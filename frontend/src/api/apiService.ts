import axios from "axios";

const API_BASE_URL = "http://localhost:5000/auth"; // Change to your API URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  return apiClient.post("/register", { username, email, password });
};

export const loginUser = async (email: string, password: string) => {
  return apiClient.post("/login", { email, password });
};

export const forgotPassword = async (email: string) => {
  return apiClient.post("/forgot-password", { email });
};

export const googleLogin = async (token: string) => {  
  return apiClient.post("/google", { token });
};
