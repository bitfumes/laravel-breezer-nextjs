import axios from "axios";
import cookie from "js-cookie";
// if (process.env.NODE_ENV !== "production") {
//   process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// }

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["accept"] = "application/json";
const token = cookie.get("user-session");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default axios;
