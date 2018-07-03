import Api from "@/services/Api";

export default {
  loadTemperature(key, config) {
    return Api().get("data/temperature/" + key, config);
  },
  loadHumidity(key, config) {
    return Api().get("data/humidity/" + key, config);
  },
  loadWindSpeed(key, config) {
    return Api().get("data/windspeed/" + key, config);
  },
  loadWindDirection(key, config) {
    return Api().get("data/winddirection/" + key, config);
  },
  loadRainUnit(key, config) {
    return Api().get("data/rainunit/" + key, config);
  },
  loadStatus(key, config) {
    return Api().get("data/status/" + key, config);
  },
  loadImages(key, config) {
    return Api().get("image/" + key, config);  
  }
};
