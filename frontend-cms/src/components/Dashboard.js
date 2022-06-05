import React from "react";
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

import { Link, Routes, Route } from "react-router-dom";

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "270px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function Dashboard() {
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
          <Link to="">
            <i className="fas fa-chart-line"></i> Dashboard
          </Link>
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
          <Link to="monthly-tracking">
            <i className="fas fa-calendar"></i> Monthly Tracking
          </Link>
          <Link to="create-ticket">
            <i className="fas fa-file"></i> Create Ticket
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
          <Link to="track-device-history">
            <i className="fas fa-history"></i> Track Device History
          </Link>
        </div>
      </nav>
      <div id="main">
        <Routes>
          <Route path="scan-qr" element={<Scanqr />} />
          <Route path="issue-category" element={<Issuecategory />} />
          <Route path="issue-sub-category" element={<IssueSubCategory />} />
          <Route path="open-tickets" element={<Opentickets />} />
          <Route path="monthly-tracking" element={<Monthlytracking />} />
          <Route path="create-ticket" element={<Createticket />} />
          <Route path="closed-tickets" element={<Closedtickets />} />
          <Route path="add-member" element={<Addmember />} />
          <Route path="track-device-history" element={<TrackDeviceHistory />} />
          <Route path="add-new-device" element={<Adddevice />} />
          <Route path="manage-devices" element={<Managedevices />} />
        </Routes>
      </div>
    </>
  );
}

export default Dashboard;
