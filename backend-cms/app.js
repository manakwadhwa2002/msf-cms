const express = require("express");
const app = express();
const mongoose = require("mongoose");
const deviceRoute = require("./routes/rdevices");
const memberRoute = require("./routes/rmember");
const assigndeviceRoute = require("./routes/rassigndevice");
const ticketRoute = require("./routes/rticket");
const issueCatRoute = require("./routes/rissuecatroute");
const issueSubCatRoute = require("./routes/rissuesubcatroute");
const bodyParser = require("body-parser");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var MongoStore = require("connect-mongo");
require("./passportConfig");

app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
//
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

app.use("/", deviceRoute);
app.use("/", memberRoute);
app.use("/", assigndeviceRoute);
app.use("/", ticketRoute);
app.use("/", issueCatRoute);
app.use("/", issueSubCatRoute);

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

app.get("/checkmultiusr/:memberId", async (req, res) => {
  try {
    const assigndata = await assigndevice.find({ assignedtomember: req.params.memberId, assignstatus: "YES" });
    const deviceiddata = assigndata[0].deviceid;
    const singleDevice = await device.findById(deviceiddata);
    res.json(singleDevice.multiuser);
  } catch (err) {
    res.json(err);
  }
});

//Starting server
app.listen(4000, () => {
  console.log("listning at port 4000");
});
