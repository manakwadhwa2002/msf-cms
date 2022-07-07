const express = require("express");
const router = express.Router();
const assigndevice = require("../modals/Assigndevice");
const device = require("../modals/Newdevice");
const member = require("../modals/Member");

router.get("/assigndevices", async (req, res) => {
  try {
    const assignstat = await assigndevice.find({ assignstatus: "YES" });
    const noofdevices = Object.keys(assignstat).length;
    const responsedevices = [];
    if (noofdevices > 0) {
      for (var i = 0; i < noofdevices; i++) {
        const devicestat = await device.findOne({ _id: assignstat[i].deviceid });
        const memberstat = await member.findOne({ _id: assignstat[i].assignedtomember });
        responsedevices.push({
          _id: assignstat[i]._id,
          deviceid: assignstat[i].deviceid,
          devicetype: devicestat.devicetype,
          make: devicestat.make,
          modalyear: devicestat.modalyear,
          serialno: devicestat.serialno,
          warrantyupto: devicestat.warrantyupto,
          assignedtomember: assignstat[i].assignedtomember,
          assignedtomembername: memberstat.name,
          assignedtomemberemail: memberstat.email,
          assignedtomemberdepartment: memberstat.department,
          deviceip: assignstat[i].deviceip,
          hddssd: devicestat.ssdhdd,
          assignedon: assignstat[i].assignedon,
          ssdhddsize: devicestat.ssdhddsize,
          ram: devicestat.ram,
          os: devicestat.os,
          vnc: devicestat.vnc,
          antivirus: devicestat.antivirus,
          usb: devicestat.usb,
          msoffice: devicestat.msoffice,
          accnumbers: devicestat.accnumbers,
        });
      }
    }
    res.json(responsedevices);
  } catch (err) {
    res.json(err);
  }
});

router.get("/assignstatus/:deviceId", async (req, res) => {
  try {
    const assignstat = await assigndevice.find({ deviceid: req.params.deviceId, assignstatus: "YES" });
    // res.json(assignstat);
    if (assignstat.length > 0) {
      res.json({ assignstatus: "YES" });
    } else {
      res.json({ assignstat: "NO" });
    }
  } catch (err) {
    res.json(err);
  }
});

router.get("/assignstatus/member/:memberId", async (req, res) => {
  try {
    const assignstat = await assigndevice.find({ assignedtomember: req.params.memberId, assignstatus: "YES" });
    const noofdevices = Object.keys(assignstat).length;
    const responsedevices = [];
    if (noofdevices > 0) {
      for (var i = 0; i < noofdevices; i++) {
        const devicestat = await device.findOne({ _id: assignstat[i].deviceid });
        responsedevices.push({
          _id: assignstat[i]._id,
          deviceid: assignstat[i].deviceid,
          assignedtomember: assignstat[i].assignedtomember,
          deviceip: assignstat[i].deviceip,
          assignstatus: assignstat[i].assignstatus,
          assignedon: assignstat[i].assignedon,
          devicetype: devicestat.devicetype,
          make: devicestat.make,
          modalyear: devicestat.modalyear,
        });
      }
    }
    res.json(responsedevices);
  } catch (err) {
    res.json(err);
  }
});

router.get("/assigndevicehistory/:deviceId", async (req, res) => {
  try {
    const assignhistory = await assigndevice.find({ deviceid: req.params.deviceId });
    res.json(assignhistory);
  } catch (err) {
    res.json(err);
  }
});

router.post("/assigndevice/:deviceId", async (req, res) => {
  const devicedetails = await device.findOne({ _id: req.params.deviceId });
  const newassigndevice = new assigndevice({
    deviceid: req.params.deviceId,
    assignedtomember: req.body.assignedtomember, // Required Input as ID of Member
    deviceip: req.body.deviceip, //Required input
  });
  if (devicedetails.multiuser.toLowerCase() == "no") {
    try {
      const updateassignstatus = await assigndevice.updateMany({ deviceid: req.params.deviceId, assignstatus: "YES" }, { $set: { assignstatus: "NO" } });
      if (updateassignstatus) {
        try {
          const savedAssignDevice = await newassigndevice.save();
          res.json(savedAssignDevice);
        } catch (err) {
          res.json({ message: err });
        }
      }
    } catch (err) {
      res.json(err);
    }
  } else {
    try {
      const savedAssignDevice = await newassigndevice.save();
      res.json(savedAssignDevice);
    } catch (err) {
      res.json({ message: err });
    }
  }
});

router.patch("/assigndevice/:deviceId", async (req, res) => {
  try {
    const updateAssignedDevice = await assigndevice.updateOne(
      { _id: req.params.deviceId },
      {
        $set: {
          assignedtomember: req.body.assignedtomember, // Required Input as ID of Member
          deviceip: req.body.deviceip,
          assignstatus: req.body.assignstatus,
        },
      }
    );
    res.json(updateAssignedDevice);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
