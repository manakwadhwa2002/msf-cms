const express = require("express");
const router = express.Router();
const issuecategory = require("../modals/Issuecategory");

router.get("/issuecategory", async (req, res) => {
  try {
    const allIssues = await issuecategory.find();
    res.json(allIssues);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/issuecategory", async (req, res) => {
  const newissuecategory = new issuecategory({
    name: req.body.name,
  });
  try {
    const savedIssueCategory = await newissuecategory.save();
    res.json({ message: "Issue Category created successfully !" });
    // res.json(savedMember);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/issuecategory/:catid", async (req, res) => {
  try {
    const nameParentCategory = await issuecategory.findOne({ _id: req.params.catid });
    const updateIssueCategory = await issuecategory.updateOne({ _id: req.params.catid }, { $set: { name: req.body.catname } });
    const updateIssueSubIsCategory = await issuesubcategory.updateMany({ parentcategory: nameParentCategory.name }, { $set: { parentcategory: req.body.catname } });
    res.json(updateIssueCategory);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/issuecategory/:catid", async (req, res) => {
  try {
    const nameParentCategory = await issuecategory.findOne({ _id: req.params.catid });
    const deleteIssueCategory = await issuecategory.deleteOne({ _id: req.params.catid });
    const deleteRelatedSubIssues = await issuesubcategory.deleteMany({ parentcategory: nameParentCategory.name });
    res.json(deleteIssueCategory);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
