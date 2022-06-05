const express = require("express");
const app = express();
const mongoose = require("mongoose");
const device = require("./modals/Newdevice");
const member = require("./modals/Member");
const ticket = require("./modals/Ticket");
const issuecategory = require("./modals/Issuecategory");
const issuesubcategory = require("./modals/Issuesubcategory");
const assigndevice = require("./modals/Assigndevice");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://localhost:27017/msft",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);

app.get("/devices", async (req, res) => {
  try {
    const alldevices = await device.find();
    res.json(alldevices);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/adddevice", async (req, res) => {
  const newdevice = new device({
    devicetype: req.body.devicetype,
    make: req.body.make,
    modalyear: req.body.modalyear,
    macaddress: req.body.macaddress,
    antivirus: req.body.antivirus,
    vnc: req.body.vnc,
    warrantyupto: req.body.warrantyupto,
    os: req.body.os,
  });
  try {
    const savedDevice = await newdevice.save();
    res.json(savedDevice);
  } catch (err) {
    res.json({ message: err });
  }
});

app.get("/devices/:deviceId", async (req, res) => {
  try {
    const singleDevice = await device.findById(req.params.deviceId);
    res.json(singleDevice);
  } catch (err) {
    res.json({ message: err });
  }
});

app.patch("/devices/:deviceId", async (req, res) => {
  try {
    const updatePost = await device.updateOne(
      { _id: req.params.deviceId },
      { $set: { devicetype: req.body.devicetype, make: req.body.make, modalyear: req.body.modalyear, macaddress: req.body.macaddress, antivirus: req.body.antivirus, vnc: req.body.vnc, warrantyupto: req.body.warrantyupto, department: req.body.department } }
    );
    res.json(updatePost);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/addmember", async (req, res) => {
  const newmember = new member({
    name: req.body.name,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    department: req.body.department,
    password: req.body.password,
  });
  try {
    const savedMember = await newmember.save();
    res.json({ message: "Member created successfully !" });
    // res.json(savedMember);
  } catch (err) {
    res.json({ message: err });
  }
});

app.patch("/member/:memberId", async (req, res) => {
  try {
    const updateMember = await member.updateOne({ _id: req.params.memberId }, { $set: { name: req.body.name, email: req.body.email, phonenumber: req.body.phonenumber, department: req.body.department, password: req.body.password } });
    res.json(updateMember);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/assigndevice/:deviceId", async (req, res) => {
  const newassigndevice = new assigndevice({
    deviceid: req.params.deviceId,
    assignedtomember: req.body.assignedtomember, // Required Input as ID of Member
    deviceip: req.body.deviceip, //Required input
  });
  try {
    const savedAssignDevice = await newassigndevice.save();
    res.json(savedAssignDevice);
  } catch (err) {
    res.json({ message: err });
  }
});

app.patch("/assigndevice/:deviceId", async (req, res) => {
  try {
    const updateAssignedDevice = await assigndevice.updateOne(
      { _id: req.params.deviceId },
      {
        $set: {
          assignedtomember: req.body.assignedtomember, // Required Input as ID of Member
          deviceip: req.body.deviceip,
          assignstatus: req.body.assignstatus,
        },
      }
    );
    res.json(updateAssignedDevice);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/createticket", async (req, res) => {
  const assigneddevicedetails = await assigndevice.find({ assignedtomember: req.body.memberId, assignstatus: "YES" });
  const devicecount = Object.keys(assigneddevicedetails).length;
  if (devicecount > 0) {
    const newticket = new ticket({
      createdby: req.body.memberId, // Get from Login Cookie only
      assigntoperson: req.body.assigntoperson,
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
});

app.get("/opentickets", async (req, res) => {
  const ticketdetails = await ticket.find({ ticketstatus: "OPEN" });
  const nooftickets = Object.keys(ticketdetails).length;
  const responsetickets = [];
  if (nooftickets > 0) {
    for (var i = 0; i < nooftickets; i++) {
      const assigneddevicedetails = await assigndevice.findOne({ assignedtomember: ticketdetails[i].createdby, assignstatus: "YES" });
      const assigneddeviceid = assigneddevicedetails.deviceid;
      const devicedetails = await device.findOne({ _id: assigneddeviceid });
      const memberdetails = await member.findOne({ _id: ticketdetails[i].createdby });
      responsetickets.push({
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
        comments: ticketdetails[i].comments,
      });
    }
    res.json(responsetickets);
  } else {
    res.json({ message: "No Open Tickets Found !" });
  }
});

app.get("/closedtickets", async (req, res) => {
  const ticketdetails = await ticket.find({ ticketstatus: "CLOSED" });
  const nooftickets = Object.keys(ticketdetails).length;
  if (nooftickets > 0) {
    for (var i = 0; i < nooftickets; i++) {
      const assigneddevicedetails = await assigndevice.findOne({ assignedtomember: ticketdetails[i].createdby, assignstatus: "YES" });
      const assigneddeviceid = assigneddevicedetails.deviceid;
      const devicedetails = await device.findOne({ _id: assigneddeviceid });
      const memberdetails = await member.findOne({ _id: ticketdetails[i].createdby });
      res.json({
        createdby: ticketdetails[i].createdby,
        createdondate: ticketdetails[i].createdon,
        department: memberdetails.department,
        deviceid: assigneddeviceid,
        os: devicedetails.os,
        deviceip: assigneddevicedetails.deviceip,
        assignedon: assigneddevicedetails.assignedon,
        antivirus: devicedetails.antivirus,
        vnc: devicedetails.vnc,
        comments: ticketdetails[i].comments,
        closedon: ticketdetails[i].closedon,
      });
    }
  } else {
    res.json({ message: "No Closed Tickets Available" });
  }
});

app.get("/issuecategory", async (req, res) => {
  try {
    const allIssues = await issuecategory.find();
    res.json(allIssues);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/issuecategory", async (req, res) => {
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

app.get("/issuesubcategory", async (req, res) => {
  try {
    const allSubIssues = await issuesubcategory.find();
    res.json(allSubIssues);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/issuesubcategory", async (req, res) => {
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

//Starting server
app.listen(4000, () => {
  console.log("listning at port 4000");
});
