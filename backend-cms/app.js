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
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var MongoStore = require("connect-mongo");
const { application } = require("express");
require("./passportConfig");
// const deviceRoutes = require("./routes/devices");

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

// Login System

app.use(
  session({
    name: "msfl.uid",
    resave: false,
    saveUninitialized: false,
    secret: "msfl",
    cookie: {
      maxAge: 36000000, //10 Hours
      httpOnly: false,
      secure: false,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/msft",
      autoRemove: "native",
    }),
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(501).json(err);
    }
    if (!user) {
      return res.status(501).json(info);
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(501).json(err);
      }
      return res.status(200).json({ message: "Login Success" });
    });
  })(req, res, next);
});

app.get("/user", isValidUser, function (req, res, next) {
  return res.status(200).json(req.user);
});

app.get("/logout", isValidUser, function (req, res, next) {
  req.logout();
  return res.status(200).json({ message: "Logout Success" });
});

function isValidUser(req, res, next) {
  if (req.isAuthenticated()) next();
  else return res.status(401).json({ message: "Unauthorized Request" });
}

// API'S

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
    usb: req.body.usb,
    vpn: req.body.vpn,
    ssdhdd: req.body.ssdhdd,
    ssdhddsize: req.body.ssdhddsize,
    serialno: req.body.serialno,
    onedrive: req.body.onedrive,
    dlov: req.body.dlov,
    ram: req.body.ram,
    cpuv: req.body.cpuv,
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
      {
        $set: {
          devicetype: req.body.devicetype,
          make: req.body.make,
          modalyear: req.body.modalyear,
          macaddress: req.body.macaddress,
          antivirus: req.body.antivirus,
          vnc: req.body.vnc,
          warrantyupto: req.body.warrantyupto,
          usb: req.body.usb,
          vpn: req.body.vpn,
          ssdhdd: req.body.ssdhdd,
          ssdhddsize: req.body.ssdhddsize,
          serialno: req.body.serialno,
          onedrive: req.body.onedrive,
          dlov: req.body.dlov,
          ram: req.body.ram,
          cpuv: req.body.cpuv,
        },
      }
    );
    res.json(updatePost);
  } catch (err) {
    res.json({ message: err });
  }
});

app.get("/member", async (req, res) => {
  try {
    const allMembers = await member.find();
    res.json(allMembers);
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

app.patch("/member/:memberId", async (req, res) => {
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

app.get("/assignstatus/:deviceId", async (req, res) => {
  try {
    const assignstat = await assigndevice.find({ deviceid: req.params.deviceId, assignstatus: "YES" });
    // res.json(assignstat);
    if (assignstat.length > 0) {
      res.json({ assignstatus: "YES" });
    } else {
      res.json({ assignstat: "NO" });
    }
  } catch (err) {
    res.json(err);
  }
});

app.post("/assigndevice/:deviceId", async (req, res) => {
  const assignmentstatus = await assigndevice.find({ deviceid: req.params.deviceId, assignstatus: "YES" });
  const newassigndevice = new assigndevice({
    deviceid: req.params.deviceId,
    assignedtomember: req.body.assignedtomember, // Required Input as ID of Member
    deviceip: req.body.deviceip, //Required input
  });
  try {
    const updateassignstatus = await assigndevice.updateMany({ deviceid: req.params.deviceId, assignstatus: "YES" }, { $set: { assignstatus: "NO" } });
    if (updateassignstatus) {
      try {
        const savedAssignDevice = await newassigndevice.save();
        res.json(savedAssignDevice);
      } catch (err) {
        res.json({ message: err });
      }
    }
  } catch (err) {
    res.json(err);
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
      deviceid: assigneddevicedetails[0].deviceid,
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

//assigntoperson: req.body.assigntoperson,
app.patch("/openticket/assign/:ticketId", async (req, res) => {
  try {
    const updateOPenTicketAssign = await ticket.updateOne({ _id: req.params.ticketId }, { $set: { assigntoperson: req.body.assigntoperson } });
    res.json(updateOPenTicketAssign);
  } catch (err) {
    res.json(err);
  }
});

app.patch("/openticket/closeaticket/:deviceId", async (req, res) => {
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
        ticketstatus: ticketdetails[i].ticketstatus,
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

app.patch("/issuecategory/:catid", async (req, res) => {
  try {
    const updateIssueCategory = await issuecategory.updateOne({ _id: req.params.catid }, { $set: { name: req.body.catname } });
    // const nameParentCategory = await issuecategory.findOne({ _id: req.params.catid });
    // const updateIssueSubIsCategory = await issuesubcategory.updateMany({ parentcategory: nameParentCategory.name }, { $set: { parentcategory: `${req.body.catname}` } });
    res.json(updateIssueCategory);
  } catch (err) {
    res.json(err);
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

app.get("/issuesubcategory/:issparentcat", async (req, res) => {
  try {
    const filterSubIssues = await issuesubcategory.find({ parentcategory: req.params.issparentcat });
    res.json(filterSubIssues);
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

app.patch("/issuesubcategory/:subcatid", async (req, res) => {
  try {
    const updateIssueSubCategory = await issuesubcategory.updateOne({ _id: req.params.subcatid }, { $set: { parentcategory: req.body.parentcategory, name: req.body.subcatname } });
    res.json(updateIssueSubCategory);
  } catch (err) {
    res.json({ message: err });
  }
});

app.get("/checkstatus/:deviceId", async (req, res) => {
  try {
    const checkticketstatus = await ticket.find({ deviceid: req.params.deviceId, ticketstatus: "OPEN" });
    const checkdevice = await device.find({ _id: req.params.deviceId });
    const checkdeviceassignstatus = await assigndevice.find({ deviceid: req.params.deviceId, assignstatus: "YES" });
    var devassignstatus;
    if (checkdeviceassignstatus.length > 0) {
      devassignstatus = "YES";
    } else {
      devassignstatus = "NO";
    }

    const nooftickets = Object.keys(checkticketstatus).length;
    // res.json(checkdevice[0].make);
    if (devassignstatus === "YES") {
      res.json({
        nooftickets: nooftickets,
        deviceid: checkdevice[0]._id,
        macaddress: checkdevice[0].macaddress,
        assignstatus: devassignstatus,
        ipaddress: checkdeviceassignstatus[0].deviceip,
        assignedto: checkdeviceassignstatus[0].assignedtomember,
      });
    } else {
      res.json({
        nooftickets: nooftickets,
        deviceid: checkdevice[0]._id,
        macaddress: checkdevice[0].macaddress,
        assignstatus: devassignstatus,
      });
    }
  } catch (err) {
    res.json(err);
  }
});

app.get("/getsupportdata", async (req, res) => {
  try {
    const supportdata = await member.find({ userrole: "ADMIN" });
    res.json(supportdata);
  } catch (err) {
    res.json(err);
  }
});

//Starting server
app.listen(4000, () => {
  console.log("listning at port 4000");
});
