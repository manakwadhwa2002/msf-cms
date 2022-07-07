import React, { useState } from "react";
import Scanqr from "./dashboardComponents/Scanqr";
import Addmember from "./dashboardComponents/Addmember";
import Closedtickets from "./dashboardComponents/Closedtickets";
import Issuecategory from "./dashboardComponents/Issuecategory";
import Createticket from "./dashboardComponents/Createticket";
import IssueSubCategory from "./dashboardComponents/Issuesubcategory";
import Monthlytracking from "./dashboardComponents/Monthlytracking";
import Opentickets from "./dashboardComponents/Opentickets";
import TrackDeviceHistory from "./dashboardComponents/Trackdevicehistory";
import Adddevice from "./dashboardComponents/Adddevice";
import Managedevices from "./dashboardComponents/Managedevices";
import Assigndevice from "../components/dashboardComponents/Assigndevice";
import Editdevice from "./dashboardComponents/Editdevice";
import Assigndata from "./dashboardComponents/Assigndata";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import DashPrivateRoutes from "./DashPrivateRoutes";
import logo from "../msfl-logo.png";

import api from "../apiConfig";

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "270px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function Dashboard() {
  const nav = useNavigate();
  const [usrrole, setUserRole] = useState("");
  const [usrid, setUserId] = useState("");
  const [usrname, setUserName] = useState("");
  function isLoggedIn() {
    api.get("/user").then((res) => {
      if (res.data._id !== "") {
        setUserRole(res.data.userrole);
        setUserId(res.data._id);
        setUserName(res.data.name);
      }
    });
  }
  isLoggedIn();

  function logoutfn() {
    api.get("/logout").then((res) => {
      if (res.data.message === "Logout Success") {
        nav("/login");
      }
    });
  }
  return (
    <>
      <nav>
        <button className="btn btn-warning" onClick={openNav}>
          &#9776;
        </button>
        <div id="mySidenav" className="sidenav">
          <a className="closebtn" onClick={closeNav}>
            &times;
          </a>
          <div className="logo-circular-image">
            <img src={logo} alt="MSFL Logo" />
          </div>
          <h4>Hi, {usrname}</h4>
          {usrrole === "MEMBER" || usrrole === "ADMIN" ? (
            <>
              <Link to="">
                <i className="fas fa-chart-line"></i> Dashboard
              </Link>
              <Link to="create-ticket">
                <i className="fas fa-file"></i> Create Ticket
              </Link>
            </>
          ) : null}
          {usrrole === "ADMIN" ? (
            <>
              <Link to="scan-qr">
                <i className="fas fa-qrcode"></i> Scan QR
              </Link>
              <Link to="issue-category">
                <i className="fas fa-list"></i> Issue Category
              </Link>
              <Link to="issue-sub-category">
                <i className="fas fa-list-ol"></i> Issue Sub Catogory
              </Link>
              <Link to="open-tickets">
                <i className="fas fa-copy"></i> Open Tickets
              </Link>
              <Link to="closed-tickets">
                <i className="fas fa-check"></i> Closed Tickets
              </Link>
              <Link to="add-member">
                <i className="fas fa-users"></i> Add Member
              </Link>
              <Link to="add-new-device">
                <i className="fas fa-laptop"></i> Add Device
              </Link>
              <Link to="manage-devices">
                <i className="fas fa-cogs"></i> Manage Devices
              </Link>
              <Link to="assign-device-data">
                <i className="fas fa-database"></i> Assign Data
              </Link>
              <Link to="monthly-tracking">
                <i className="fas fa-calendar"></i> Monthly Tracking
              </Link>
              <Link to="track-device-history">
                <i className="fas fa-history"></i> Track Device History
              </Link>
            </>
          ) : null}
          {usrrole === "MEMBER" || usrrole === "ADMIN" ? (
            <Link to="" onClick={() => logoutfn()}>
              <i className="fa fa-sign-out"></i> Logout
            </Link>
          ) : null}
        </div>
      </nav>
      <div id="main">
        <Routes>
          <Route path="create-ticket" element={<Createticket userId={usrid} />} />
          <Route
            path="scan-qr"
            element={
              <DashPrivateRoutes>
                <Scanqr userId={usrid} />
              </DashPrivateRoutes>
            }
          />
          <Route
            path="issue-category"
            element={
              <DashPrivateRoutes>
                <Issuecategory />
              </DashPrivateRoutes>
            }
          />
          <Route
            path="issue-sub-category"
            element={
              <DashPrivateRoutes>
                <IssueSubCategory />
              </DashPrivateRoutes>
            }
          />
          <Route
            path="open-tickets"
            element={
              <DashPrivateRoutes>
                <Opentickets />
              </DashPrivateRoutes>
            }
          />
          <Route
            path="monthly-tracking"
            element={
              <DashPrivateRoutes>
                <Monthlytracking />
              </DashPrivateRoutes>
            }
          />
          <Route
            path="closed-tickets"
            element={
              <DashPrivateRoutes>
                <Closedtickets />
              </DashPrivateRoutes>
            }
          />
          <Route
            path="add-member"
            element={
              <DashPrivateRoutes>
                <Addmember />
              </DashPrivateRoutes>
            }
          />
          <Route
            path="track-device-history"
            element={
              <DashPrivateRoutes>
                <TrackDeviceHistory />
              </DashPrivateRoutes>
            }
          />
          <Route
            path="track-device-history/:deviceId"
            element={
              <DashPrivateRoutes>
                <TrackDeviceHistory />
              </DashPrivateRoutes>
            }
          />
          <Route
            path="add-new-device"
            element={
              <DashPrivateRoutes>
                <Adddevice />
              </DashPrivateRoutes>
            }
          />
          <Route
            path="assign-device-data"
            element={
              <DashPrivateRoutes>
                <Assigndata />
              </DashPrivateRoutes>
            }
          />
          <Route
            path="manage-devices"
            element={
              <DashPrivateRoutes>
                <Managedevices userId={usrid} />
              </DashPrivateRoutes>
            }
          />
          <Route
            path="assign-device/:deviceId"
            element={
              <DashPrivateRoutes>
                <Assigndevice />
              </DashPrivateRoutes>
            }
          />
          <Route
            path="edit-device/:deviceId"
            element={
              <DashPrivateRoutes>
                <Editdevice />
              </DashPrivateRoutes>
            }
          />
          <Route exact path="/" element={<Guidelines />} />
        </Routes>
      </div>
    </>
  );
}

function Guidelines() {
  return (
    <>
      <h2>Hey ✋, We have got some guidelines for you !!!</h2>
      <br />
      <h3>🦺 Safety Guidelines:</h3>
      <ol>
        <li className="text-primary">Use a firewall</li>
        <li className="text-secondary">Keep all software up to date</li>
        <li className="text-success">Use antivirus software and keep it current</li>
        <li className="text-danger">Make sure your passwords are well-chosen and protected</li>
        <li className="text-warning">Don’t open suspicious attachments or click unusual links in messages.</li>
        <li className="text-info">Browse the web safely</li>
        <li>Stay away from pirated material</li>
        <li className="text-primary">Don't use USBs or other external devices unless you own them</li>
      </ol>
      <h3>🧑‍💻 Sitting Guidelines:</h3>
      <ol>
        <li>Maintain good posture when working at the keyboard. Utilize a chair with back support.</li>
        <li>Keep your feet supported on the floor or on a footrest when you work to reduce pressure on your lower back.</li>
        <li>Avoid twisting or bending your trunk or neck. Frequently used items should be positioned directly in front of you and angled upward on a copyholder when working.</li>
        <li>Keep your shoulders relaxed with your elbows close to your sides.</li>
        <li>Avoid resting your elbows on the hard surface or edge of your table. Pads can be used to protect your elbows if necessary.</li>
        <li>
          Elbows should be positioned at 100 to 110 degrees when working in order to keep a relaxed position at the keyboard. This could require a slight negative tilt (front of keyboard higher than back) when working in upright positions. If reclined in your chair, the keyboard could be at a
          positive angle to maintain this relaxed position.
        </li>
        <li>
          Your wrists should be in a neutral or straight position when keying or using a pointing device or calculator. Wrist rests can assist you in maintaining a neutral position when used properly during pauses. Float your arms above the keyboard and wrist rest when keying. Avoid planting your
          wrists on the table or wrist rest. This can result in bending the wrists either up and down or side to side.
        </li>
        <li>Take breaks. These breaks can be brief and should include stretches for optimal results. If possible, take a one or two-minute break every 15 to 20 minutes, or a five-minute break every hour. Every few hours, get up, move around, and do an alternative activity.</li>
      </ol>
    </>
  );
}

export default Dashboard;
