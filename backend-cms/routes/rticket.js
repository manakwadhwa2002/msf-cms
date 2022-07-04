const express = require("express");
const router = express.Router();
const ticket = require("../modals/Ticket");
const assigndevice = require("../modals/Assigndevice");
const device = require("../modals/Newdevice");
const member = require("../modals/Member");

router.post("/createticket", async (req, res) => {
  if (req.body.deviceId === null) {
    const assigneddevicedetails = await assigndevice.find({ assignedtomember: req.body.memberId, assignstatus: "YES" });
    const devicecount = Object.keys(assigneddevicedetails).length;
    if (devicecount > 0) {
      const newticket = new ticket({
        createdby: req.body.memberId,
        deviceid: assigneddevicedetails[0].deviceid,
        comments: req.body.comments,
      });
      try {
        const savedTicket = await newticket.save();
        res.json(savedTicket);
      } catch (err) {
        res.json({ message: err });
      }
    } else {
      res.json({ message: "Please link a device first" });
    }
  } else {
    const assigneddevicedetails = await assigndevice.find({ deviceid: req.body.deviceId, assignstatus: "YES" });
    const devicecount = Object.keys(assigneddevicedetails).length;
    if (devicecount > 0) {
      const newticket = new ticket({
        createdby: assigneddevicedetails[0].assignedtomember,
        deviceid: req.body.deviceId,
        comments: req.body.comments,
      });
      try {
        const savedTicket = await newticket.save();
        res.json(savedTicket);
      } catch (err) {
        res.json({ message: err });
      }
    } else {
      const newticket = new ticket({
        createdby: req.body.memberId,
        deviceid: req.body.deviceId,
        comments: req.body.comments,
      });
      try {
        const savedTicket = await newticket.save();
        res.json(savedTicket);
      } catch (err) {
        res.json({ message: err });
      }
    }
  }
});

router.get("/opentickets", async (req, res) => {
  const ticketdetails = await ticket.find({ ticketstatus: "OPEN" });
  const nooftickets = Object.keys(ticketdetails).length;
  const responsetickets = [];
  if (nooftickets > 0) {
    for (var i = 0; i < nooftickets; i++) {
      const assigneddevicedetails = await assigndevice.findOne({ assignedtomember: ticketdetails[i].createdby, assignstatus: "YES" });
      const assigneddeviceid = assigneddevicedetails.deviceid;
      const devicedetails = await device.findOne({ _id: assigneddeviceid });
      const memberdetails = await member.findOne({ _id: ticketdetails[i].createdby });
      const supportmemberdetails = await member.find({ _id: ticketdetails[i].assigntoperson });
      if (Object.keys(supportmemberdetails).length > 0) {
        responsetickets.push({
          _id: ticketdetails[i]._id,
          createdby: ticketdetails[i].createdby,
          createdbyname: memberdetails.name,
          createdondate: ticketdetails[i].createdon,
          department: memberdetails.department,
          deviceid: assigneddeviceid,
          os: devicedetails.os,
          deviceip: assigneddevicedetails.deviceip,
          assignedon: assigneddevicedetails.assignedon,
          antivirus: devicedetails.antivirus,
          vnc: devicedetails.vnc,
          ticketstatus: ticketdetails[i].ticketstatus,
          comments: ticketdetails[i].comments,
          assigntoperson: supportmemberdetails[0].name,
        });
      } else {
        responsetickets.push({
          _id: ticketdetails[i]._id,
          createdby: ticketdetails[i].createdby,
          createdbyname: memberdetails.name,
          createdondate: ticketdetails[i].createdon,
          department: memberdetails.department,
          deviceid: assigneddeviceid,
          os: devicedetails.os,
          deviceip: assigneddevicedetails.deviceip,
          assignedon: assigneddevicedetails.assignedon,
          antivirus: devicedetails.antivirus,
          vnc: devicedetails.vnc,
          ticketstatus: ticketdetails[i].ticketstatus,
          comments: ticketdetails[i].comments,
          assigntoperson: "N/A",
        });
      }
    }
    res.json(responsetickets);
  } else {
    res.json({ message: "No Open Tickets Found !" });
  }
});

router.get("/tickethistory/:deviceId", async (req, res) => {
  const ticketdetails = await ticket.find({ deviceid: req.params.deviceId });
  const nooftickets = Object.keys(ticketdetails).length;
  const responsetickets = [];
  if (nooftickets > 0) {
    for (var i = 0; i < nooftickets; i++) {
      const assigneddevicedetails = await assigndevice.findOne({ assignedtomember: ticketdetails[i].createdby, assignstatus: "YES" });
      const assigneddeviceid = assigneddevicedetails.deviceid;
      const devicedetails = await device.findOne({ _id: assigneddeviceid });
      const memberdetails = await member.findOne({ _id: ticketdetails[i].createdby });
      const supportmemberdetails = await member.findOne({ _id: ticketdetails[i].assigntoperson });
      responsetickets.push({
        _id: ticketdetails[i]._id,
        createdby: ticketdetails[i].createdby,
        createdbyname: memberdetails.name,
        createdondate: ticketdetails[i].createdon,
        department: memberdetails.department,
        deviceid: assigneddeviceid,
        os: devicedetails.os,
        deviceip: assigneddevicedetails.deviceip,
        assignedon: assigneddevicedetails.assignedon,
        antivirus: devicedetails.antivirus,
        vnc: devicedetails.vnc,
        ticketstatus: ticketdetails[i].ticketstatus,
        comments: ticketdetails[i].comments,
        assigntoperson: supportmemberdetails.name,
      });
    }
    res.json(responsetickets);
  } else {
    res.json({ message: "No Open Tickets Found !" });
  }
});

router.patch("/openticket/assign/:ticketId", async (req, res) => {
  try {
    const updateOPenTicketAssign = await ticket.updateOne({ _id: req.params.ticketId }, { $set: { assigntoperson: req.body.assigntoperson } });
    res.json(updateOPenTicketAssign);
  } catch (err) {
    res.json(err);
  }
});

router.patch("/openticket/closeaticket/:deviceId", async (req, res) => {
  try {
    const updateOpenTicket = await ticket.updateOne(
      { deviceid: req.params.deviceId },
      {
        $set: {
          issuecategory: req.body.issuecategory, // Required Input as ID of Member
          issuesubcategory: req.body.isssubcategory,
          ticketstatus: "CLOSED",
          closedon: new Date(),
        },
      }
    );
    res.json(updateOpenTicket);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/closedtickets", async (req, res) => {
  const ticketdetails = await ticket.find({ ticketstatus: "CLOSED" });
  const nooftickets = Object.keys(ticketdetails).length;
  const responsetickets = [];
  if (nooftickets > 0) {
    for (var i = 0; i < nooftickets; i++) {
      const assigneddevicedetails = await assigndevice.findOne({ assignedtomember: ticketdetails[i].createdby, assignstatus: "YES" });
      const assigneddeviceid = assigneddevicedetails.deviceid;
      const devicedetails = await device.findOne({ _id: assigneddeviceid });
      const memberdetails = await member.findOne({ _id: ticketdetails[i].createdby });
      const supportmemberdetails = await member.find({ _id: ticketdetails[i].assigntoperson });
      if (Object.keys(supportmemberdetails).length > 0) {
        responsetickets.push({
          _id: ticketdetails[i]._id,
          createdby: ticketdetails[i].createdby,
          createdbyname: memberdetails.name,
          createdondate: ticketdetails[i].createdon,
          department: memberdetails.department,
          deviceid: assigneddeviceid,
          os: devicedetails.os,
          deviceip: assigneddevicedetails.deviceip,
          assignedon: assigneddevicedetails.assignedon,
          antivirus: devicedetails.antivirus,
          vnc: devicedetails.vnc,
          ticketstatus: ticketdetails[i].ticketstatus,
          comments: ticketdetails[i].comments,
          assigntoperson: supportmemberdetails[0].name,
          closedon: ticketdetails[i].closedon,
        });
      } else {
        responsetickets.push({
          _id: ticketdetails[i]._id,
          createdby: ticketdetails[i].createdby,
          createdbyname: memberdetails.name,
          createdondate: ticketdetails[i].createdon,
          department: memberdetails.department,
          deviceid: assigneddeviceid,
          os: devicedetails.os,
          deviceip: assigneddevicedetails.deviceip,
          assignedon: assigneddevicedetails.assignedon,
          antivirus: devicedetails.antivirus,
          vnc: devicedetails.vnc,
          ticketstatus: ticketdetails[i].ticketstatus,
          comments: ticketdetails[i].comments,
          assigntoperson: "N/A",
        });
      }
    }
    res.json(responsetickets);
  } else {
    res.json({ message: "No Open Tickets Found !" });
  }
});

module.exports = router;
