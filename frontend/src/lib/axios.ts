import axios from "axios";
import { env } from "../env";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
});

api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${env.VITE_API_TOKEN}`
  config.headers["Content-Type"] = 'application/json'
  return config
})

