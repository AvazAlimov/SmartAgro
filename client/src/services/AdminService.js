import Api from "@/services/Api";

export default {
  check(params) {
    return Api().get("admin/check", params);
  },
  login(params) {
    return Api().post("admin/login", params);  
  }
};
