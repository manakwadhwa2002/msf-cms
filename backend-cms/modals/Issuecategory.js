const mongoose = require("mongoose");

const IssueCategory = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdon: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("IssueCategory", IssueCategory);
