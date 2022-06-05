import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:4000`,
});

function Opentickets() {
  const [ticket, setTicket] = useState([]);
  const fetchData = () => {
    api.get("/opentickets").then((res) => {
      setTicket(res.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="ticketContainer container">
      <input className="form-control" type="search" placeholder="Search Ticket" />
      <br />
      {ticket.map((data) => (
        <div className="ticket">
          <div className="row">
            <div className="col-sm-2 brdr">
              <div className="ticket-icon">
                <i className="fas fa-calendar"></i> 31 May
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
                <div className="col-sm-12">Comments: {data.comments}</div>
              </div>
            </div>
            <div className="col-sm-2 brdr">
              <div className="row">
                <form action="">
                  <div className="form-group">
                    <select className="form-control">
                      <option value="">-- Assign To --</option>
                      <option value="">Manak</option>
                      <option value="">Abhi</option>
                      <option value="">Sarv</option>
                    </select>
                    <br />
                    <button className="btn btn-success">
                      <i className="fas fa-save"></i> Save
                    </button>
                    <br />
                    <br />
                    <button className="btn btn-danger">
                      <i className="fas fa-times-circle"></i> Close Ticket
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ))}
      ;
    </div>
  );
}

export default Opentickets;
