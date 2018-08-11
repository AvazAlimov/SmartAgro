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
                    name: req.body.name,
                    longitude: req.body.longitude,
                    latitude: req.body.latitude,
                    w_key: req.body.w_key,
                    r_key: req.body.r_key,
                    data_interval: 5,
                    image_interval: 15,
                });
                station
                    .save()
                    .then(() => {
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

exports.get_stations = (req, res, next) => {
    Station.find()
        .exec()
        .then(stations => {
            return res.status(200).json(stations);
        });
};

exports.delete_station = (req, res, next) => {
    Station.find({
        _id: req.params.id
    })
        .remove()
        .exec()
        .then(() => {
            res.status(200).json({
                message: "Station deleted"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
