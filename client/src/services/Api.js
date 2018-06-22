import axios from "axios";

export default () => {
  return axios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? `http://www.agridata.uz`
        : `http://localhost`
  });
};
