const mongoose = require("mongoose");

const AssignDevice = mongoose.Schema({
  deviceid: {
    type: String,
    required: true,
  },
  assignedtomember: {
    // Id of Member
    type: String,
    required: true,
  },
  deviceip: {
    type: String,
    require: true,
  },
  assignstatus: {
    type: String,
    required: true,
    default: "YES",
  },
  assignedon: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AssignDevice", AssignDevice);
