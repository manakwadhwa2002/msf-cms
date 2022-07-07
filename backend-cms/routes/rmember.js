const express = require("express");
const router = express.Router();
const member = require("../modals/Member");

router.get("/member", async (req, res) => {
  try {
    const allMembers = await member.find();
    res.json(allMembers);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/addmember", async (req, res) => {
  const newmember = new member({
    name: req.body.name,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    department: req.body.department,
    userrole: req.body.userrole,
    password: member.hashPassword(req.body.password),
  });
  try {
    const savedMember = await newmember.save();
    res.json({ message: "Member created successfully !" });
    // res.json(savedMember);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/member/:memberId", async (req, res) => {
  try {
    const memberpass = await member.findOne({ _id: req.params.memberId });
    if (memberpass.password != req.body.password) {
      req.body.password = member.hashPassword(req.body.password);
    }
    const updateMember = await member.updateOne({ _id: req.params.memberId }, { $set: { name: req.body.name, email: req.body.email, phonenumber: req.body.phonenumber, department: req.body.department, password: req.body.password } });
    res.json(updateMember);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/member/:memberId", async (req, res) => {
  try {
    const deleteMember = await member.deleteOne({ _id: req.params.memberId });
    res.json(deleteMember);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
