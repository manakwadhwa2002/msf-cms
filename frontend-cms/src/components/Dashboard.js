import React, { useState, useEffect } from "react";
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
import dishalogo from "./Dashboard Link Images/disha2.png";
import crmlogo from "./Dashboard Link Images/CRM.jpeg";
import timetracklogo from "./Dashboard Link Images/Timetrack.png";
import erplogo from "./Dashboard Link Images/ERP.png";
import ftmlogo from "./Dashboard Link Images/werardtlogo.jpeg";

import api from "../apiConfig";
import Alltickets from "./dashboardComponents/Alltickets";
import Specialnotification from "./dashboardComponents/Specialnotification";

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
  const [usremail, setUserEmail] = useState("");
  const [usrdepartment, setUserDepartment] = useState("");
  function isLoggedIn() {
    api.get("/user").then((res) => {
      if (res.data._id !== "") {
        setUserRole(res.data.userrole);
        setUserId(res.data._id);
        setUserName(res.data.name);
        setUserEmail(res.data.email);
        setUserDepartment(res.data.department);
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
              <Link to="all-tickets">
                <i className="fas fa-table"></i> All Tickets
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
                <i className="fas fa-database"></i> Assigned Data
              </Link>
              <Link to="monthly-tracking">
                <i className="fas fa-calendar"></i> Monthly Tracking
              </Link>
              <Link to="track-device-history">
                <i className="fas fa-history"></i> Track Device History
              </Link>
            </>
          ) : null}
          {usrrole === "DEPARTMENTHEAD" || usrrole === "ADMIN" ? (
            <Link to="special-notification">
              <i className="fas fa-bell"></i> Special Notification
            </Link>
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
          <Route path="create-ticket" element={<Createticket userId={usrid} userEmail={usremail} userName={usrname} />} />
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
            path="all-tickets"
            element={
              <DashPrivateRoutes>
                <Alltickets />
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
          <Route
            path="special-notification"
            element={
              <DashPrivateRoutes>
                <Specialnotification usrdepartment={usrdepartment} usrrole={usrrole} />
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
  const [usrrole, setUserRole] = useState("");
  const [usrdepartment, setDepartment] = useState("");
  const [noopentickets, setNoOpenTickets] = useState(0);
  const [noclosedtickets, setNoClosedTickets] = useState(0);
  const [notificationtext, setNotificationText] = useState("");
  const [notificationforall, setNotificationForAll] = useState([]);
  function isLoggedIn() {
    api.get("/user").then((res) => {
      if (res.data._id !== "") {
        setUserRole(res.data.userrole);
        setDepartment(res.data.department);
        fetchNotification(res.data.department);
      }
    });
  }
  // console.log(usrdepartment);
  function getNoTicketData() {
    api.get(`/opentickets?from=&to=`).then((res) => {
      setNoOpenTickets(res.data.length);
    });
    api.get("/closedtickets?from=&to=").then((res) => {
      setNoClosedTickets(res.data.length);
    });
  }
  isLoggedIn();
  getNoTicketData();

  function fetchNotification(dep) {
    api.get(`/specialnotification?department=${dep}`).then((res) => {
      if (res.data.length > 0) {
        setNotificationText(res.data[0].notificationtext);
      }
    });
  }

  const fetchNotificationForAll = () => {
    api.get(`/specialnotification?department=ALL`).then((res) => {
      setNotificationForAll(res.data[0].notificationtext);
    });
  };
  useEffect(() => {
    fetchNotificationForAll();
  }, []);
  return (
    <>
      {usrrole === "ADMIN" ? (
        <>
          <div className="row">
            <div className="col-lg-6 text-center">
              <h2>{noopentickets}</h2>
              <span>Open Tickets</span>
            </div>
            <div className="col-lg-6 text-center">
              <h2>{noclosedtickets}</h2>
              <span>Closed Tickets</span>
            </div>
          </div>
          <br />
          <br />
        </>
      ) : null}
      <div className="specialnotification mb-5">
        <marquee>{notificationforall ? notificationforall : null}</marquee>
        <marquee>{notificationtext ? notificationtext : null}</marquee>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="slide-right">
            <h2>Hey ✋, We have got some guidelines for you !!!</h2>
            <br />
            <h3>🦺 Safety Guidelines:</h3>
            As we know that Data is the electronic asset of company and we all have a responsibility to protect and safeguard company assets from loss, theft and misuse. MSFL- IT is regularly monitoring and safeguard users' data. It is strongly recommended to all users. <br />
            <br /> Please follow the given points to make IT asset more secure:
            <table className="table">
              <thead>
                <th>S. No.</th>
                <th>Recommendations</th>
                <th>Remarks</th>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Do not open email which is received from unknown IDs</td>
                  <td>User must inform to IT Dept. in case of suspected email and notification.</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Change desktop & e-mail password frequently</td>
                  <td>
                    <a href="https://support.office.com/en-us/article/video-change-your-office-365-for-business-password-df48c24e-d036-4d72-987f-b6197f618619">https://support.office.com/en-us/article/video-change-your-office-365-for-business-password-df48c24e-d036-4d72-987f-b6197f618619</a>{" "}
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Keep important data in particular/defined folder</td>
                  <td>MSFL Plant users are recommended to keep all important data in MSFLWORK folder in D/E/F Drive. Ask IT Deptt. to take Data backup if user is going on tour.</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Don't use USBs or other external devices unless you own them.</td>
                  <td>Don't use USBs or other external devices unless you own them</td>
                </tr>
              </tbody>
            </table>
            <h3>👨‍💻 Sitting Guidelines:</h3>
            <ol>
              <li className="text-primary">Maintain good posture when working at the keyboard. Utilize a chair with back support.</li>
              <li className="text-secondary">Keep your feet supported on the floor or on a footrest when you work to reduce pressure on your lower back.</li>
              <li className="text-success">Avoid twisting or bending your trunk or neck. Frequently used items should be positioned directly in front of you and angled upward on a copyholder when working.</li>
              <li className="text-danger">Keep your shoulders relaxed with your elbows close to your sides.</li>
              <li className="text-warning">Avoid resting your elbows on the hard surface or edge of your table. Pads can be used to protect your elbows if necessary.</li>
              <li className="text-info">
                Elbows should be positioned at 100 to 110 degrees when working in order to keep a relaxed position at the keyboard. This could require a slight negative tilt (front of keyboard higher than back) when working in upright positions. If reclined in your chair, the keyboard could be at a
                positive angle to maintain this relaxed position.
              </li>
              <li className="text-primary">
                Your wrists should be in a neutral or straight position when keying or using a pointing device or calculator. Wrist rests can assist you in maintaining a neutral position when used properly during pauses. Float your arms above the keyboard and wrist rest when keying. Avoid planting
                your wrists on the table or wrist rest. This can result in bending the wrists either up and down or side to side.
              </li>
              <li className="text-secondary">
                Take breaks. These breaks can be brief and should include stretches for optimal results. If possible, take a one or two-minute break every 15 to 20 minutes, or a five-minute break every hour. Every few hours, get up, move around, and do an alternative activity.
              </li>
            </ol>
          </div>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-4 dashboard-links">
          <div className="row">
            <div className="col-sm-6 col-lg-12 link-tab">
              <a href="https://disha2.darwinbox.in/" target="_blank">
                <img src={dishalogo} alt="" />
                <h6>HRMS (Disha 2)</h6>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 link-tab">
              <a href="http://172.16.0.39/timetrack/" target="_blank">
                <img src={timetracklogo} alt="" />
                <h6>Time Track</h6>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 link-tab">
              <a href="http://172.16.1.30/FTM/Login.aspx" target="_blank">
                <img src={ftmlogo} alt="" />
                <h6>FTM</h6>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 link-tab">
              <a href="https://prodapp.msfl.in:4542/OA_HTML/AppsLocalLogin.jsp" target="_blank">
                <img src={erplogo} alt="" />
                <h6>ERP</h6>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 link-tab">
              <a href="https://cask.login.ap1.oraclecloud.com/" target="_blank">
                <img src={crmlogo} alt="" />
                <h6>CRM</h6>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <br /> If there is no response on raised tickets within <strong>12 Hours</strong>. Then you can write us on IT_Helpdesk@maxmsp.com <br /> OR <br /> Contact on the mentioned numbers 01881462030, 01881462008 <br /> Mr. Vikas (For Networking) - 7696769500 <br />
          Mr. Sarbjit Singh (For Hardware) - +91-9855360944 <br />
          Mr Gurmukh (For Backup) - +91-9914986171 <br />
          Mr. Parveen (For any IT Related information) - +91-8427914428 <br />
          Mr. Yogender Sharma (For ERP Related issues/requirements) - +91-9878690404
          <br />
          <br />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
