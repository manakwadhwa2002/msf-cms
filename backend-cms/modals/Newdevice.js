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
    type: String,
    required: true,
  },
  macaddress: {
    type: String,
  },
  antivirus: {
    type: String,
  },
  vnc: {
    type: String,
  },
  warrantyupto: {
    type: Number,
    required: true,
  },
  os: {
    type: String,
  },
  usb: {
    type: String,
    default: "Disabled",
  },
  vpn: {
    type: String,
    default: "Enabled",
  },
  ssdhdd: {
    type: String,
  },
  ssdhddsize: {
    type: Number,
  },
  serialno: {
    type: String,
  },
  onedrive: {
    type: String,
    default: "Enabled",
  },
  dlov: {
    type: String,
  },
  ram: {
    type: Number,
  },
  cpuv: {
    type: String,
  },
  printertype: {
    type: String,
  },
  networkusbshared: {
    type: String,
  },
  multiuser: {
    type: String,
    required: true,
    default: "No",
  },
  addedon: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("NewDevice", NewDeviceSchema);
