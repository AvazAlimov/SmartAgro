const mongoose = require("mongoose");

const stationSchema = mongoose.Schema({
    w_key: {
        //f5OmXi9WpT
        type: String,
        unique: true,
        require: true
    },
    r_key: {
        //aGZ8Le0wI7
        type: String,
        unique: true,
        require: true
    },
    data_interval: {
        type: Number //5, 10, 20, 30, 60, 120
    },
    image_interval: {
        type: Number //15, 30, 60, 90, 120, 180
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

module.exports = mongoose.model("Station", stationSchema);
