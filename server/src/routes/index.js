const user = require("./user");
const admin = require("./admin");
const station = require("./station");
const data = require("./data");
const image = require("./image");

module.exports = app => {
  app.use("/admin", admin);
  app.use("/user", user);
  app.use("/station", station);
  app.use("/data", data);
  app.use("/image", image);
};
