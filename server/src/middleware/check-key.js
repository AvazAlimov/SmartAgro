const Station = require("../models/station");

exports.write_key = (req, res, next) => {
  Station.find({
    w_key: req.body.w_key
  })
    .exec()
    .then(stations => {
      if (stations.length === 0) {
        return res.status(401).json({
          message: "Key not found"
        });
      }
      req.station = stations[0];
      next();
    });
};
