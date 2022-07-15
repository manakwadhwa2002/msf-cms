const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const ticket = require("../modals/Ticket");
const assigndevice = require("../modals/Assigndevice");
const device = require("../modals/Newdevice");
const member = require("../modals/Member");

async function sendopenmail(uname, uemail, ucomments, ticketid) {
  let transporter = nodemailer.createTransport({
    host: "mail.maxmsp.com",
    port: 587,
    secure: false,
    auth: {
      user: "it_helpdesk@maxmsp.com",
      pass: "max@12345",
    },
  });

  const msg = {
    from: '"IT Helpdesk" <it_helpdesk@maxmsp.com>',
    to: "it_helpdesk@maxmsp.com",
    replyTo: `${uname} <${uemail}>`,
    cc: "parveenkumar@msfl.in",
    subject: `New Ticket - ${ticketid}`,
    text: `Hi, You have got a new ticket from ${uname} ! \n Problem Description: ${ucomments} \n\n Regards \n Team MSLF`,
  };

  const info = await transporter.sendMail(msg);
}

async function sendclosedmail(uname, uemail, scomments, ticketid) {
  let transporter = nodemailer.createTransport({
    host: "mail.maxmsp.com",
    port: 587,
    secure: false,
    auth: {
      user: "it_helpdesk@maxmsp.com",
      pass: "max@12345",
    },
  });

  const msg = {
    from: '"IT Helpdesk" <it_helpdesk@maxmsp.com>',
    to: `${uemail}`,
    replyTo: `it_helpdesk@maxmsp.com`,
    cc: "parveenkumar@msfl.in",
    subject: `Closed Ticket - ${ticketid}`,
    text: `Hi ${uname}, \n We have closed your ticked with ticket id: ${ticketid} ! \n Problem Comments from our end are : ${scomments}. \n\n Regards \n Team MSFL`,
  };

  const info = await transporter.sendMail(msg);
}

router.post("/createticket", async (req, res) => {
  if (!req.body.deviceId) {
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
        sendopenmail(req.body.membername, req.body.memberemail, req.body.comments, savedTicket._id);
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
        sendopenmail(req.body.membername, req.body.memberemail, req.body.comments, savedTicket._id);
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
        sendopenmail(req.body.membername, req.body.memberemail, req.body.comments, savedTicket._id);
      } catch (err) {
        res.json({ message: err });
      }
    }
  }
});

router.get("/opentickets", async (req, res) => {
  let fromdate = req.query.from;
  let todate = req.query.to;
  if (fromdate == "") {
    fromdate = "1990-01-01";
  }
  if (todate == "") {
    todate = "2090-12-31";
  }
  const ticketdetails = await ticket.find({ ticketstatus: "OPEN", createdon: { $gte: new Date(fromdate), $lt: new Date(todate) } });
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

router.patch("/openticket/closeaticket/:ticketId", async (req, res) => {
  try {
    const updateOpenTicket = await ticket.updateOne(
      { _id: req.params.ticketId },
      {
        $set: {
          issuecategory: req.body.issuecategory,
          issuesubcategory: req.body.isssubcategory,
          supportcomments: req.body.supportcomments,
          ticketstatus: "CLOSED",
          closedon: new Date(),
        },
      }
    );
    res.json(updateOpenTicket);
    // For Email Purpose
    const userticket = await ticket.findOne({ _id: req.params.ticketId });
    const userwithticket = await member.findOne({ _id: userticket.createdby });
    sendclosedmail(userwithticket.name, userwithticket.email, req.body.supportcomments, req.params.ticketId);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/closedtickets", async (req, res) => {
  let fromdate = req.query.from;
  let todate = req.query.to;
  if (fromdate == "") {
    fromdate = "1990-01-01";
  }
  if (todate == "") {
    todate = "2090-12-31";
  }
  const ticketdetails = await ticket.find({ ticketstatus: "CLOSED", createdon: { $gte: new Date(fromdate), $lt: new Date(todate) } });
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
          supportcomments: ticketdetails[i].supportcomments,
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
          closedon: ticketdetails[i].closedon,
          supportcomments: ticketdetails[i].supportcomments,
        });
      }
    }
    res.json(responsetickets);
  } else {
    res.json({ message: "No Closed Tickets Found !" });
  }
});

router.get("/alltickets", async (req, res) => {
  let fromdate = req.query.from;
  let todate = req.query.to;
  let tickstat = req.query.status;
  if (fromdate == "") {
    fromdate = "1990-01-01";
  }
  if (todate == "") {
    todate = "2090-12-31";
  }
  if (tickstat == "") {
    var allticket = await ticket.find({ createdon: { $gte: new Date(fromdate), $lt: new Date(todate) } });
  } else {
    var allticket = await ticket.find({ ticketstatus: tickstat, createdon: { $gte: new Date(fromdate), $lt: new Date(todate) } });
  }
  const nooftickets = Object.keys(allticket).length;
  const responsetickets = [];
  if (nooftickets > 0) {
    for (var i = 0; i < nooftickets; i++) {
      const assigneddevicedetails = await assigndevice.findOne({ assignedtomember: allticket[i].createdby, assignstatus: "YES" });
      const assigneddeviceid = assigneddevicedetails.deviceid;
      const devicedetails = await device.findOne({ _id: assigneddeviceid });
      const memberdetails = await member.findOne({ _id: allticket[i].createdby });
      const supportmemberdetails = await member.find({ _id: allticket[i].assigntoperson });
      if (Object.keys(supportmemberdetails).length > 0) {
        responsetickets.push({
          _id: allticket[i]._id,
          createdby: allticket[i].createdby,
          createdbyname: memberdetails.name,
          createdondate: allticket[i].createdon,
          department: memberdetails.department,
          deviceid: assigneddeviceid,
          devicetype: devicedetails.devicetype,
          os: devicedetails.os,
          deviceip: assigneddevicedetails.deviceip,
          assignedon: assigneddevicedetails.assignedon,
          antivirus: devicedetails.antivirus,
          vnc: devicedetails.vnc,
          ticketstatus: allticket[i].ticketstatus,
          comments: allticket[i].comments,
          assigntoperson: supportmemberdetails[0].name,
          issuecategory: allticket[i].issuecategory,
          issuesubcategory: allticket[i].issuesubcategory,
          closedon: allticket[i].closedon,
          supportcomments: allticket[i].supportcomments,
        });
      } else {
        responsetickets.push({
          _id: allticket[i]._id,
          createdby: allticket[i].createdby,
          createdbyname: memberdetails.name,
          createdondate: allticket[i].createdon,
          department: memberdetails.department,
          deviceid: assigneddeviceid,
          devicetype: devicedetails.devicetype,
          os: devicedetails.os,
          deviceip: assigneddevicedetails.deviceip,
          assignedon: assigneddevicedetails.assignedon,
          antivirus: devicedetails.antivirus,
          vnc: devicedetails.vnc,
          ticketstatus: allticket[i].ticketstatus,
          comments: allticket[i].comments,
          assigntoperson: "N/A",
          issuecategory: allticket[i].issuecategory,
          issuesubcategory: allticket[i].issuesubcategory,
          closedon: allticket[i].closedon,
          supportcomments: allticket[i].supportcomments,
        });
      }
    }
    res.json(responsetickets);
  } else {
    res.json({ message: "No Open Tickets Found !" });
  }
});

router.get("/ticketdevicecount", async (req, res) => {
  const devicecount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var count = 0;
  let fromdate = req.query.from;
  let todate = req.query.to;
  let tickstat = req.query.status;
  if (fromdate == "") {
    fromdate = "1990-01-01";
  }
  if (todate == "") {
    todate = "2090-12-31";
  }
  if (tickstat == "") {
    var allticket = await ticket.find({ createdon: { $gte: new Date(fromdate), $lt: new Date(todate) } });
  } else {
    var allticket = await ticket.find({ ticketstatus: tickstat, createdon: { $gte: new Date(fromdate), $lt: new Date(todate) } });
  }
  for (var i = 0; i < allticket.length; i++) {
    const devicedet = await device.findOne({ _id: allticket[i].deviceid });
    if (devicedet.devicetype == "Laptop") {
      devicecount[0]++;
    } else if (devicedet.devicetype == "Desktop") {
      devicecount[1]++;
    } else if (devicedet.devicetype == "Printer") {
      devicecount[2]++;
    } else if (devicedet.devicetype == "Access Point") {
      devicecount[3]++;
    } else if (devicedet.devicetype == "QA Desktop") {
      devicecount[4]++;
    } else if (devicedet.devicetype == "Scada Desktop") {
      devicecount[5]++;
    } else if (devicedet.devicetype == "Mouse") {
      devicecount[6]++;
    } else if (devicedet.devicetype == "Pendrive") {
      devicecount[7]++;
    } else if (devicedet.devicetype == "Keyboard") {
      devicecount[8]++;
    } else if (devicedet.devicetype == "Laptop Stand") {
      devicecount[9]++;
    }
  }
  res.json(devicecount);
});

module.exports = router;
