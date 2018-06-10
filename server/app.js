const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const routes = require("./src/routes");


mongoose.connect(
  "mongodb://avazalimov:" +
    process.env.MONGO_ATLAS_PASSWORD +
    "@app-shard-00-00-okl1f.mongodb.net:27017,app-shard-00-01-okl1f.mongodb.net:27017,app-shard-00-02-okl1f.mongodb.net:27017/test?ssl=true&replicaSet=app-shard-0&authSource=admin"
);
mongoose.Promise = global.Promise;

const app = express();

app.use("/uploads", express.static("uploads"));
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

routes(app);

app.use((res, req, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//Error 404
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error 500
if (app.get("env") === "development") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

module.exports = app;
