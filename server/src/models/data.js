const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
        require: true
    },
    temperature: {
        type: Number
    },
    humidity: {
        type: Number
    },
    wind_direction: {
        type: Number
    },
    wind_speed: {
        type: Number
    },
    rain_unit: {
        type: Number
    },
    status: {
        type: Number
    },
    wind_speed_max: {
        type: Number
    },
    soil_temp: {
        type: Number
    },
    soil_wat: {
        type: Number
    },
    soil_ec: {
        type: Number
    },
    sun_intensivity: {
        type: Number
    },
    created_at: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Data", dataSchema);