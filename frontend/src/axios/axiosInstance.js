import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("accessToken");
const mainInstance = axios.create({
  headers: {
    Authorization: "Bearer " + token,
  },
});

export default mainInstance;
