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
    default: "Yes",
  },
  vnc: {
    type: String,
    default: "Yes",
  },
  warrantyupto: {
    type: Number,
    required: true,
  },
  os: {
    type: String,
    default: "Windows 8.1 Pro",
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
    default: "N/A",
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
    default: "No",
  },
  multiuser: {
    type: String,
    required: true,
    default: "No",
  },
  msoffice: {
    type: String,
    default: "MS Office  2013 Std",
  },
  addedon: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("NewDevice", NewDeviceSchema);
