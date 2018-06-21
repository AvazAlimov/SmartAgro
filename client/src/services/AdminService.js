import Api from "@/services/Api";

export default {
  check(params) {
    return Api().get("admin/check", params);
  },
  login(params) {
    return Api().post("admin/login", params);
  },

  insertStation(params, config) {
    return Api().post("station", params, config);
  },
  loadStations(params) {
    return Api().get("station", params);
  },
  deleteStation(id, config) {
    return Api().delete("station/" + id, config);
  }
};
