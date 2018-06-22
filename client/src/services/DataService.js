import Api from "@/services/Api";

export default {
  loadData(key, config) {
    return Api().get("data/" + key, config);
  }
};
