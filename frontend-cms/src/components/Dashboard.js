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
      <h2>Hey, We have got some guidelines for you !!!</h2>
    </>
  );
}

export default Dashboard;
