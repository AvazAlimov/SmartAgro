const mongoose = require("mongoose");

const stationSchema = mongoose.Schema({
  w_key: { //f5OmXi9WpT
    type: String,
    unique: true,
    require: true
  },
  r_key: {//aGZ8Le0wI7
    type: String,
    unique: true,
    require: true
  }
});

module.exports = mongoose.model('Station', stationSchema);