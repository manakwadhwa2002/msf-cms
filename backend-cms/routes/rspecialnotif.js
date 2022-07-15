const express = require("express");
const router = express.Router();
const snotification = require("../modals/Specialnotification");

router.get("/specialnotification", async (req, res) => {
  var departmentquery = req.query.department;
  try {
    if (departmentquery == "") {
      var allnotifications = await snotification.find({ activestatus: "YES" });
    } else {
      var allnotifications = await snotification.find({ department: departmentquery, activestatus: "YES" });
    }
    res.json(allnotifications);
  } catch (err) {
    res.json(err);
  }
});

router.post("/specialnotification", async (req, res) => {
  const specialnotification = new snotification({
    department: req.body.department,
    notificationtext: req.body.notificationtext,
    activestatus: "YES",
  });
  try {
    const updatesamedepartnotif = await snotification.updateMany({ department: req.body.department }, { $set: { activestatus: "NO" } });
    const saveddepartnotif = await specialnotification.save();
    res.json(saveddepartnotif);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/specialnotification/:notifid", async (req, res) => {
  try {
    const deleteSpecialNotification = await snotification.deleteOne({ _id: req.params.notifid });
    res.json(deleteSpecialNotification);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
