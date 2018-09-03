const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Station = require("../models/station");

exports.user_signup = (req, res, next) => {
  User.find({
    email: req.body.email
  })
    .exec()
    .then(users => {
      if (users.length > 0) {
        return res.status(409).json({
          message: "Mail Exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(() => {
                res.status(201).json({ message: "Successful" });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.find({
    email: req.body.email
  })
    .exec()
    .then(users => {
      if (users.length < 1) {
        return res.status(401).json({
          message: "Auth Failed"
        });
      }
      bcrypt.compare(req.body.password, users[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth Failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: users[0].username,
              email: users[0].email,
              userId: users[0]._id
            },
            process.env.JWT_KEY
          );
          return res.status(200).json({
            token: token
          });
        }
        return res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.add_station = (req, res, next) => {
  const userId = req.userData.userId;
  Station.find({
    r_key: req.body.r_key
  })
    .exec()
    .then(stations => {
      if (stations.length === 0) {
        res.status(404).json({
          message: "Station not found"
        });
      } else {
        let station = stations[0];
        if (station.users.indexOf(userId) > -1) {
          res.status(400).json({
            message: "Station exists"
          });
        } else {
          station.users.push(userId);
          station.save();
          res.status(200).json({
            message: "Station added"
          });
        }
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.load_stations = (req, res, next) => {
  let userId = req.userData.userId;
  Station.find(
    {
      users: {
        $in: [userId]
      }
    },
    {
      _id: 0,
      r_key: 1,
      data_interval: 1,
      image_interval: 1,
      longitude: 1,
      latitude: 1
    }
  )
    .exec()
    .then(stations => {
      res.status(200).json(stations);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.update_station = (req, res, next) => {
  Station.update(
    {
      r_key: req.body.r_key
    },
    {
      $set: {
        data_interval: req.body.data_interval,
        image_interval: req.body.image_interval
      }
    }
  )
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Updated successfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
