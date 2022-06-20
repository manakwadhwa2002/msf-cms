const express = require("express");
const router = express.Router();
const device = require("../modals/Newdevice");

router.get("/devices", async (req, res) => {
  try {
    const alldevices = await device.find();
    res.json(alldevices);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/adddevice", async (req, res) => {
  const newdevice = new device({
    devicetype: req.body.devicetype,
    make: req.body.make,
    modalyear: req.body.modalyear,
    macaddress: req.body.macaddress,
    antivirus: req.body.antivirus,
    vnc: req.body.vnc,
    warrantyupto: req.body.warrantyupto,
    os: req.body.os,
    usb: req.body.usb,
    vpn: req.body.vpn,
    ssdhdd: req.body.ssdhdd,
    ssdhddsize: req.body.ssdhddsize,
    serialno: req.body.serialno,
    onedrive: req.body.onedrive,
    dlov: req.body.dlov,
    ram: req.body.ram,
    cpuv: req.body.cpuv,
  });
  try {
    const savedDevice = await newdevice.save();
    res.json(savedDevice);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/devices/:deviceId", async (req, res) => {
  try {
    const singleDevice = await device.findById(req.params.deviceId);
    res.json(singleDevice);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/devices/:deviceId", async (req, res) => {
  try {
    const updateDevice = await device.updateOne(
      { _id: req.params.deviceId },
      {
        $set: {
          devicetype: req.body.devicetype,
          make: req.body.make,
          modalyear: req.body.modalyear,
          macaddress: req.body.macaddress,
          antivirus: req.body.antivirus,
          vnc: req.body.vnc,
          warrantyupto: req.body.warrantyupto,
          usb: req.body.usb,
          vpn: req.body.vpn,
          ssdhdd: req.body.ssdhdd,
          ssdhddsize: req.body.ssdhddsize,
          serialno: req.body.serialno,
          onedrive: req.body.onedrive,
          dlov: req.body.dlov,
          ram: req.body.ram,
          cpuv: req.body.cpuv,
        },
      }
    );
    res.json(updateDevice);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/devices/:deviceId", async (req, res) => {
  try {
    const deleteDevice = await device.deleteOne({ _id: req.params.deviceId });
    res.json(deleteDevice);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
