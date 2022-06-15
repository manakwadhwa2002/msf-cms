import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:4000`,
});
function Closedtickets() {
  const [ticket, setTicket] = useState([]);
  const fetchData = () => {
    api.get("/closedtickets").then((res) => {
      setTicket(res.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="ticketContainer container">
      <input class="form-control" type="search" placeholder="Search Ticket" />
      <br />
      {ticket.map((data) => (
        <div className="ticket" key={data._id}>
          <div className="row">
            <div className="col-sm-2 brdr">
              <div className="ticket-icon">
                <i className="fas fa-calendar"></i> {data.createdondate[8] + data.createdondate[9]}-{data.createdondate[5] + data.createdondate[6]}-{data.createdondate[2] + data.createdondate[3]}
              </div>
              <div className="ticket-icon-closed">
                <i className="fas fa-calendar"></i> 07-06-22
                {/* {data.createdondate[8] + data.createdondate[9]}-{data.createdondate[5] + data.createdondate[6]}-{data.createdondate[2] + data.createdondate[3]} */}
              </div>
            </div>
            <div className="col-sm-8 brdr">
              <div className="row">
                <div className="col-sm-4">Created By: {data.createdby}</div>
                <div className="col-sm-4">Created On Date: {data.createdondate}</div>
                <div className="col-sm-4">Department: {data.department}</div>
              </div>
              <br />
              <div className="row">
                <div className="col-sm-4">Device ID: {data.deviceid}</div>
                <div className="col-sm-4">OS: {data.os}</div>
                <div className="col-sm-4">Device IP: {data.deviceip}</div>
              </div>
              <br />
              <div className="row">
                <div className="col-sm-4">Device Assigned On: {data.assignedon}</div>
                <div className="col-sm-4">Anti-Virus: {data.antivirus}</div>
                <div className="col-sm-4">VNC: {data.vnc}</div>
              </div>
              <br />
              <div className="row">
                <div className="col-sm-8">Comments: {data.comments}</div>
                <div className="col-sm-4">Assigned To: {data.assigntoperson}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Closedtickets;
