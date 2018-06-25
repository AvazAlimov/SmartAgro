const mongoose = require("mongoose");
const Image = require("../models/image");
const Station = require("../models/station");

exports.upload_image = (req, res, next) => {
  Station.find({
    w_key: req.body.w_key
  })
    .exec()
    .then(stations => {
      if (stations.length === 0) {
        res.status(404).json({
          message: "Station not found"
        });
      } else {
        var station = stations[0];
        var image = new Image({
          _id: new mongoose.Types.ObjectId(),
          station: station._id,
          filename: req.file.path,
          created_at: new Date()
        });
        image
          .save()
          .then(result => {
            res.status(201).json({
              message: "Image uploaded"
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
      }
    });
};
