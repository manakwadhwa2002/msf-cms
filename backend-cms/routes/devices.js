const express = require("express");
const app = express();
const router = express.Router();

app.get("/devices", async (req, res) => {
  try {
    const alldevices = await device.find();
    res.json(alldevices);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/adddevice", async (req, res) => {
  const newdevice = new device({
    devicetype: req.body.devicetype,
    make: req.body.make,
    modalyear: req.body.modalyear,
    macaddress: req.body.macaddress,
    antivirus: req.body.antivirus,
    vnc: req.body.vnc,
    warrantyupto: req.body.warrantyupto,
    os: req.body.os,
  });
  try {
    const savedDevice = await newdevice.save();
    res.json(savedDevice);
  } catch (err) {
    res.json({ message: err });
  }
});

app.get("/devices/:deviceId", async (req, res) => {
  try {
    const singleDevice = await device.findById(req.params.deviceId);
    res.json(singleDevice);
  } catch (err) {
    res.json({ message: err });
  }
});

app.patch("/devices/:deviceId", async (req, res) => {
  try {
    const updatePost = await device.updateOne(
      { _id: req.params.deviceId },
      { $set: { devicetype: req.body.devicetype, make: req.body.make, modalyear: req.body.modalyear, macaddress: req.body.macaddress, antivirus: req.body.antivirus, vnc: req.body.vnc, warrantyupto: req.body.warrantyupto, department: req.body.department } }
    );
    res.json(updatePost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
