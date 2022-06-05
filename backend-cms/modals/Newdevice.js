const mongoose = require("mongoose");

const NewDeviceSchema = mongoose.Schema({
  devicetype: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  modalyear: {
    type: Number,
    required: true,
  },
  macaddress: {
    type: String,
    required: true,
  },
  antivirus: {
    type: String,
    required: true,
  },
  vnc: {
    type: String,
    required: true,
  },
  warrantyupto: {
    type: Number,
    required: true,
  },
  os: {
    type: String,
    required: true,
  },
  addedon: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("NewDevice", NewDeviceSchema);
