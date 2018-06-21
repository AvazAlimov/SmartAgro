import axios from "axios";

export default () => {
  // axios.defaults.headers.post["Content-Type"] = "application/json";
  return axios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? `http://www.agridata.uz`
        : `http://localhost`
  });
};
