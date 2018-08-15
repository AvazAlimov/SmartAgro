const mongoose = require("mongoose");
const Data = require("../models/data");
const Station = require("../models/station");
const json2xls = require('json2xls');
const fs = require("fs");
const path = require('path');

exports.insert_data = (req, res, next) => {
    const station = req.station;
    const fields = req.body.data.split(';');
    const data = new Data({
        _id: new mongoose.Types.ObjectId(),
        station: station._id,
        temperature: fields[0],
        humidity: fields[1],
        wind_direction: fields[2],
        wind_speed: fields[3],
        wind_speed_max: fields[4],
        rain_unit: fields[5],
        status: fields[6],
        soil_temp: fields[7],
        soil_wat: fields[8],
        soil_ec: fields[9],
        sun_intensivity: fields[10],
        created_at: new Date()
    });

    data
        .save()
        .then(() => {
            res.status(201).json({
                interval: req.station.data_interval
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.get_data_temp = (req, res, next) => {
    Data.find()
        .exec()
        .then(datas => {
            return res.status(200).json(datas);
        });
};

exports.get_data = (req, res, next) => {
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
                    $and: [
                        {station: station._id},
                        {
                            created_at: {
                                "$gte": req.params.s_date,
                                "$lte": req.params.e_date
                            }
                        }
                    ]
                }, {_id: 0, station: 0})
                    .sort({$natural: -1})
                    // .limit(50)
                    .exec()
                    .then(data => {
                        res.status(200).json(data.reverse());
                    })
            }
        })
};

exports.download_data = (req, res, next) => {
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
                    $and: [
                        {station: station._id},
                        {
                            created_at: {
                                "$gte": req.params.s_date,
                                "$lte": req.params.e_date
                            }
                        }
                    ]
                }, {_id: 0})
                    .sort({$natural: -1})
                    .exec()
                    .then(data => {
                        if (data.length !== 0) {
                            const xls = json2xls(data, {
                                fields: ["created_at", "temperature", "humidity", "wind_direction", "wind_speed", "rain_unit", "status"]
                            });
                            fs.writeFileSync("./uploads/data.xlsx", xls, 'binary');
                            res.download(path.join(__dirname, "../../uploads/data.xlsx"));
                        } else {
                            res.status(404).json({
                                message: "No available data"
                            });
                        }
                    })
            }
        });
};