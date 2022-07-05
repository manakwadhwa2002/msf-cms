const express = require("express");
const router = express.Router();
const assigndevice = require("../modals/Assigndevice");
const device = require("../modals/Newdevice");

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
    res.json(assignstat);
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
