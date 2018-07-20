const mongoose = require("mongoose");
const Data = require("../models/data");
const Station = require("../models/station");

exports.insert_data = (req, res, next) => {
    const station = req.station;
    const data = new Data({
        _id: new mongoose.Types.ObjectId(),
        station: station._id,
        temperature: req.body.temperature,
        humidity: req.body.humidity,
        wind_direction: req.body.wind_direction,
        wind_speed: req.body.wind_speed,
        rain_unit: req.body.rain_unit,
        status: req.body.status,
        created_at: new Date()
    });
    data
        .save()
        .then(() => {
            res.status(201).json({
                interval: 3
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.get_data = (req, res, next) => {
    Data.find()
        .exec()
        .then(datas => {
            return res.status(200).json(datas);
        });
};

exports.get_temperature = (req, res, next) => {
    Station.find({
        r_key: req.params.r_key
    })
        .exec()
        .then(stations => {
            if (stations.length === 0) {
                res.status(404).json({
                    message: "Station not found"
                });
            } else {
                let station = stations[0];
                Data.find({
                    station: station._id
                }, {temperature: 1, created_at: 1, _id: 0})
                    .sort({$natural: -1})
                    .limit(15)
                    .exec()
                    .then(data => {
                        res.status(200).json(data.reverse());
                    });
            }
        });
};

exports.get_humidity = (req, res, next) => {
    Station.find({
        r_key: req.params.r_key
    })
        .exec()
        .then(stations => {
            if (stations.length === 0) {
                res.status(404).json({
                    message: "Station not found"
                });
            } else {
                let station = stations[0];
                Data.find({
                    station: station._id
                }, {humidity: 1, created_at: 1, _id: 0})
                    .sort({$natural: -1})
                    .limit(15)
                    .exec()
                    .then(data => {
                        res.status(200).json(data.reverse());
                    });
            }
        });
};

exports.get_windspeed = (req, res, next) => {
    Station.find({
        r_key: req.params.r_key
    })
        .exec()
        .then(stations => {
            if (stations.length === 0) {
                res.status(404).json({
                    message: "Station not found"
                });
            } else {
                let station = stations[0];
                Data.find({
                    station: station._id
                }, {wind_speed: 1, created_at: 1, _id: 0})
                    .sort({$natural: -1})
                    .limit(15)
                    .exec()
                    .then(data => {
                        res.status(200).json(data.reverse());
                    });
            }
        });
};

exports.get_winddirection = (req, res, next) => {
    Station.find({
        r_key: req.params.r_key
    })
        .exec()
        .then(stations => {
            if (stations.length === 0) {
                res.status(404).json({
                    message: "Station not found"
                });
            } else {
                let station = stations[0];
                Data.find({
                    station: station._id
                }, {wind_direction: 1, created_at: 1, _id: 0})
                    .sort({$natural: -1})
                    .limit(15)
                    .exec()
                    .then(data => {
                        res.status(200).json(data.reverse());
                    });
            }
        });
};

exports.get_rainunit = (req, res, next) => {
    Station.find({
        r_key: req.params.r_key
    })
        .exec()
        .then(stations => {
            if (stations.length === 0) {
                res.status(404).json({
                    message: "Station not found"
                });
            } else {
                let station = stations[0];
                Data.find({
                    station: station._id
                }, {rain_unit: 1, created_at: 1, _id: 0})
                    .sort({$natural: -1})
                    .limit(15)
                    .exec()
                    .then(data => {
                        res.status(200).json(data.reverse());
                    });
            }
        });
};

exports.get_status = (req, res, next) => {
    Station.find({
        r_key: req.params.r_key
    })
        .exec()
        .then(stations => {
            if (stations.length === 0) {
                res.status(404).json({
                    message: "Station not found"
                });
            } else {
                let station = stations[0];
                Data.find({
                    station: station._id
                }, {status: 1, created_at: 1, _id: 0})
                    .sort({$natural: -1})
                    .limit(15)
                    .exec()
                    .then(data => {
                        res.status(200).json(data.reverse());
                    });
            }
        });
};