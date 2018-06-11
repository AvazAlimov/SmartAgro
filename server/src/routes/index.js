const user = require("./user");
const admin = require("./admin");

module.exports = app => {
  app.use("/admin", admin);
  app.use("/user", user);
};
