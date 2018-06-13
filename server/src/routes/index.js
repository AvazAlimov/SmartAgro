const user = require("./user");
const admin = require("./admin");
const station = require("./station");
const data = require("./data");

module.exports = app => {
  app.use("/admin", admin);
  app.use("/user", user);
  app.use("/station", station);
  app.use("/data", data);
};
