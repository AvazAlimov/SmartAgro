const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  login: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('Admin', adminSchema);