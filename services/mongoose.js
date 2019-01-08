const mongoose = require("mongoose");
const keys = require("../config/keys");

//Models
require("./../models/User");
require("./../models/Sensor");

mongoose.connect(
  keys.mongoURI,
  {
    useNewUrlParser: true
  }
);
