const mongoose = require("mongoose");

const NewTicketSchema = mongoose.Schema({
  createdby: {
    // Id of Member
    type: String,
    required: true,
  },
  deviceid: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
  },
  assigntoperson: {
    // Id of IT Person
    type: String,
  },
  ticketstatus: {
    type: String,
    default: "OPEN",
  },
  createdon: {
    type: Date,
    default: Date.now,
  },
  issuecategory: {
    type: String,
  },
  issuesubcategory: {
    type: String,
  },
  supportcomments: {
    type: String,
  },
  closedon: {
    type: Date,
    // default: Date.now,
  },
});

module.exports = mongoose.model("NewTicket", NewTicketSchema);
