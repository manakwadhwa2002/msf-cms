import React from 'react'
import Scanqr from './dashboardComponents/Scanqr';
import Addmember from './dashboardComponents/Addmember';
import Closedtickets from './dashboardComponents/Closedtickets';
import Issuecategory from './dashboardComponents/Issuecategory';
import Createticket from './dashboardComponents/Createticket';
import IssueSubCategory from './dashboardComponents/Issuesubcategory';
import Monthlytracking from './dashboardComponents/Monthlytracking';
import Opentickets from './dashboardComponents/Opentickets';
import TrackDeviceHistory from './dashboardComponents/Trackdevicehistory';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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
      <button className='btn btn-warning' onClick={openNav}>&#9776;</button>
      <div id="mySidenav" className="sidenav">
      <a className="closebtn" onClick={closeNav}>&times;</a>
      <Link to=''><i class="fas fa-chart-line"></i> Dashboard</Link>
      <Link to='scan-qr'><i class="fas fa-qrcode"></i> Scan QR</Link>
      <Link to='issue-category'><i class="fas fa-list"></i> Issue Category</Link>
      <Link to='issue-sub-category'><i class="fas fa-list-ol"></i> Issue Sub Catogory</Link>
      <Link to='open-tickets'><i class="fas fa-copy"></i> Open Tickets</Link>
      <Link to='monthly-tracking'><i class="fas fa-calendar"></i> Monthly Tracking</Link>
      <Link to='create-ticket'><i class="fas fa-file"></i> Create Ticket</Link>
      <Link to='closed-tickets'><i class="fas fa-check"></i> Closed Tickets</Link>
      <Link to='add-member'><i class="fas fa-users"></i> Add Member</Link>
      <Link to='track-device-history'><i class="fas fa-history"></i> Track Device History</Link>
      </div>
    </nav>
    <div id='main'>
    <Router>
      <Switch>
        <Route path="/dashboard/scan-qr">
          <Scanqr/>
        </Route>
        <Route exact path="/dashboard/issue-category">
          <Issuecategory/>
        </Route>
        <Route path="/dashboard/issue-sub-category">
          <IssueSubCategory/>
        </Route>
        <Route path="/dashboard/open-tickets">
          <Opentickets/>
        </Route>
        <Route path="/dashboard/monthly-tracking">
          <Monthlytracking/>
        </Route>
        <Route path="/dashboard/create-ticket">
          <Createticket/>
        </Route>
        <Route path="/dashboard/closed-tickets">
          <Closedtickets/>
        </Route>
        <Route path="/dashboard/add-member">
          <Addmember/>
        </Route>
        <Route path="/dashboard/track-device-history">
          <TrackDeviceHistory/>
        </Route>
      </Switch>   
    </Router>
    </div>
    </>
  )
}


export default Dashboard