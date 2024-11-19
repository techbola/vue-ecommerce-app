import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("currentAuthTokens") || "{}");
  if (token) {
    config.headers = config.headers || {};
    const unprotectedURls = ["/users/login/", "/users/register/"];

    if (config.url && !unprotectedURls.includes(config.url)) {
      config.headers.Authorization = token ? `Bearer ${token.accessToken}` : "";
    }
  }
  return config;
});

export default axiosInstance;
