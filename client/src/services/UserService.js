import Api from "@/services/Api";

export default {
  check(params) {
    return Api().get("user/check", params);
  },
  signUp(params) {
    return Api().post("user/signup", params);
  },
  login(params) {
    return Api().post("user/login", params);
  },

  addStation(params, config) {
    return Api().post("user/addstation", params, config);
  },
  loadStations(params) {
    return Api().get("user/loadstations", params);
  }
};
