import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";
import { createBrowserHistory } from "history";
const axiosInterceptor = () => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      var status = error.response.status;
      if (status === 403) {
        Cookies.remove("accessToken");
        Cookies.remove("user");
        localStorage.removeItem("items");
        createBrowserHistory().push("/");
        window.location.reload();
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInterceptor;
