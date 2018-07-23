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
    created_at: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Data", dataSchema);