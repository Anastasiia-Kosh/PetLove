import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const apiInstance = axios.create({
  baseURL: baseURL,
});

apiInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
