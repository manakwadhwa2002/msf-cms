import React from "react";

function Closedtickets() {
  return (
    <div className="ticketContainer container">
      <input class="form-control" type="search" placeholder="Search Ticket" />
      <br />
      <div className="ticket">
        <div className="row">
          <div className="col-sm-2 brdr">
            <div className="ticket-icon">
              <i className="fas fa-calendar"></i> 06-06-22
              {/* {data.createdondate[8] + data.createdondate[9]}-{data.createdondate[5] + data.createdondate[6]}-{data.createdondate[2] + data.createdondate[3]} */}
            </div>
            <br />
            <div className="ticket-icon-closed">
              <i className="fas fa-calendar"></i> 07-06-22
              {/* {data.createdondate[8] + data.createdondate[9]}-{data.createdondate[5] + data.createdondate[6]}-{data.createdondate[2] + data.createdondate[3]} */}
            </div>
          </div>
          <div className="col-sm-10 brdr">
            <div className="row">
              <div className="col-sm-3">Created By: Manak Wadhwa</div>
              <div className="col-sm-3">Created On Date: 31/05/2022</div>
              <div className="col-sm-3">Department: Manak Wadhwa</div>
              <div className="col-sm-3">Device ID: 246</div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-3">OS: Windows</div>
              <div className="col-sm-3">Device IP: 192.168.0.222</div>
              <div className="col-sm-3">Device Assigned On: 01/04/2022</div>
              <div className="col-sm-3">Anti-Virus: Updated</div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-3">VNC: Working</div>
              <div className="col-sm-3">Closed On: 01/06/2022</div>
              <div className="col-sm-3">Closed By: Abhi</div>
              <div className="col-sm-3">Issue: Iss</div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-12">Comments (by creator) : PC Not Working</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Closedtickets;
