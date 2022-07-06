import axios from "axios";
export const API_URL = `https://solbaumanec.ru`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Basic ${localStorage.getItem(
    "dozor-token"
  )}`;
  return config;
});


export default $api;