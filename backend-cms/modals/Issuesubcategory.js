const mongoose = require("mongoose");

const IssueSubCategory = mongoose.Schema({
  parentcategory: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdon: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("IssueSubCategory", IssueSubCategory);
