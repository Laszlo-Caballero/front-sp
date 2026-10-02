import { ENV } from "@/config/env";
import axios from "axios";
import Cookies from "js-cookie";

export const instance = axios.create({
  baseURL: ENV.API_URL,
});

instance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
