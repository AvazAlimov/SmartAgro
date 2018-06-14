import axios from "axios";

export default () => {
  return axios.create({
    baseURL: `http://206.189.120.65:3000`
  });
};
