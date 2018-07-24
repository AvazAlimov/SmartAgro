const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
        require: true
    },
    filename: {
        type: String,
        require: true
    },
    comment: {
        type: String
    },
    created_at: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Image", imageSchema);