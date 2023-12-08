import axios from "axios";
import Cookies from "js-cookie";

const ERROR_CODE = {
  UNAUTHORIZED: 401,
};

const axiosInstance = axios.create({
  baseURL: "http:localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === ERROR_CODE.UNAUTHORIZED) {
      return { data: null };
    }

    if (
      error.response?.status === ERROR_CODE.UNAUTHORIZED &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/reissue"
    ) {
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.post("/auth/refresh", {
          accessToken: accessToken,
        });
        const accessToken = response.data.accessToken;

        Cookies.set("accessToken", accessToken);

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        Cookies.remove("accessToken");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
