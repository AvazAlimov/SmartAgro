const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

exports.admin_signup = (req, res, next) => {
    Admin.find({
        login: req.body.login
    })
        .exec()
        .then(admins => {
            if (admins.length > 0) {
                return res.status(409).json({
                    message: "Login Exists"
                });
            } else if (req.body.key === process.env.ADMIN_KEY) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const admin = new Admin({
                            _id: new mongoose.Types.ObjectId(),
                            login: req.body.login,
                            password: hash
                        });
                        admin
                            .save()
                            .then(result => {
                                res.status(201).json({
                                    message: "Admin created"
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
            }
        });
};

exports.admin_login = (req, res, next) => {
    Admin.find({
        login: req.body.login
    })
        .exec()
        .then(admins => {
            if (admins.length < 1) {
                return res.status(401).json({
                    message: "Auth Failed"
                });
            }
            bcrypt.compare(req.body.password, admins[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth Failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            login: admins[0].login,
                            userId: admins[0]._id
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
