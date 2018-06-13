// const mongoose = require("mongoose");
const Station = require("../models/station");

exports.create_station = (req, res, next) => {
  Station.find({
    $or: [
      {
        w_key: req.body.w_key
      },
      {
        r_key: req.body.r_key
      }
    ]
  })
    .exec()
    .then(stations => {
      if (stations.length > 0) {
        res.status(409).json({
          message: "Read or Write key exists"
        });
      } else {
        const station = new Station({
          w_key: req.body.w_key,
          r_key: req.body.r_key
        });
        station
          .save()
          .then(result => {
            res.status(201).json({
              message: "Station created"
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      }
    });
};
