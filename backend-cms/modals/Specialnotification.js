const mongoose = require("mongoose");

const SpecialnotificationSchema = mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  notificationtext: {
    type: String,
    required: true,
  },
  activestatus: {
    type: String,
    required: true,
  },
  createdon: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SpecialNotification", SpecialnotificationSchema);
