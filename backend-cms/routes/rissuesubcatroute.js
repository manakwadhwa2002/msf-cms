const express = require("express");
const router = express.Router();
const issuesubcategory = require("../modals/Issuesubcategory");

router.get("/issuesubcategory", async (req, res) => {
  try {
    const allSubIssues = await issuesubcategory.find();
    res.json(allSubIssues);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/issuesubcategory/:issparentcat", async (req, res) => {
  try {
    const filterSubIssues = await issuesubcategory.find({ parentcategory: req.params.issparentcat });
    res.json(filterSubIssues);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/issuesubcategory", async (req, res) => {
  const newissuesubcategory = new issuesubcategory({
    parentcategory: req.body.parentcategory,
    name: req.body.name,
  });
  try {
    const savedIssueSubCategory = await newissuesubcategory.save();
    res.json({ message: "Issue Sub Category created successfully !" });
    // res.json(savedMember);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/issuesubcategory/:subcatid", async (req, res) => {
  try {
    const updateIssueSubCategory = await issuesubcategory.updateOne({ _id: req.params.subcatid }, { $set: { parentcategory: req.body.parentcategory, name: req.body.subcatname } });
    res.json(updateIssueSubCategory);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/issuesubcategory/:subcatid", async (req, res) => {
  try {
    const deleteIssueSubCategory = await issuesubcategory.deleteOne({ _id: req.params.subcatid });
    res.json(deleteIssueSubCategory);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
