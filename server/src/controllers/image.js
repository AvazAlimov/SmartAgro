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
                return res.status(401).json({
                    message: "Key not found"
                });
            } else {
                const station = stations[0];
                new Image({
                    _id: new mongoose.Types.ObjectId(),
                    station: station._id,
                    filename: req.file.path,
                    created_at: new Date()
                })
                    .save()
                    .then(() => {
                        res.status(201).json({
                            interval: station.image_interval
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

exports.update_image = (req, res, next) => {
    Image.update({
        filename: req.body.filename
    }, {
        $set: {
            comment: req.body.comment
        }
    }).exec().then(() => {
        res.status(200).json({
            message: "Updated successfully"
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.get_images = (req, res, next) => {
    Station.find({
        r_key: req.params.r_key
    })
        .exec()
        .then(stations => {
            if (stations.length === 0) {
                return res.status(401).json({
                    message: "Key not found"
                });
            } else {
                const station = stations[0];
                Image.find({
                    station: station._id
                }, {filename: 1, created_at: 1, comment: 1, _id: 0})
                    .sort({$natural: -1})
                    .then(images => {
                        res.status(200).json(images);
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        });
};