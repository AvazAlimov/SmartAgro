const mongoose = require("mongoose");
const Station = require("../models/station");
const Data = require("../models/data");

exports.insert_data = (req, res, next) => {
  const station = req.station;
  const data = new Data({
    _id: new mongoose.Types.ObjectId(),
    station: station._id,
    temperature: req.body.temperature,
    humidity: req.body.humidity,
    created_at: new Date()
  });
  data
    .save()
    .then(result => {
      res.status(201).json({
        message: "Data inserted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
