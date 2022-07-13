import React, { useState, useEffect } from "react";
import api from "../../apiConfig";
function Closedtickets() {
  const [ticket, setTicket] = useState([]);
  const [ticketsearch, setTicketSearch] = useState("");
  const [ticketlen, setTicketLength] = useState(Number);
  const [fromdate, setFromDate] = useState("");
  const [todate, setToDate] = useState("");
  const fetchData = () => {
    api.get(`/closedtickets?from=${fromdate}&to=${todate}`).then((res) => {
      setTicket(res.data);
      setTicketLength(res.data.length);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="ticketContainer container">
      <input className="form-control" type="search" placeholder="Search Ticket" onChange={(e) => setTicketSearch(e.target.value)} />
      <br />
      <div className="row">
        <div className="col-sm-1 form-control border-0 text-center">From:</div>
        <div className="col-sm-2">
          <input type="date" className="form-control" value={fromdate} onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div className="col-sm-1 form-control border-0 text-center">To:</div>
        <div className="col-sm-2">
          <input type="date" className="form-control" value={todate} onChange={(e) => setToDate(e.target.value)} />
        </div>
        <div className="col-sm-2 text-center">
          <button className="btn btn-warning" onClick={() => fetchData()}>
            <i className="fas fa-search"></i> Search
          </button>
        </div>
      </div>
      <br />
      {ticketlen > 0 ? (
        ticket
          .filter((value) => {
            if (ticketsearch == "") {
              return value;
            } else if (value.createdby.toLowerCase().includes(ticketsearch.toLowerCase()) || value.deviceid.toLowerCase().includes(ticketsearch.toLowerCase())) {
              return value;
            }
          })
          .map((data) => (
            <div className="ticket" key={data._id}>
              <div className="row">
                <div className="col-sm-3 brdr">
                  <div className="ticket-icon">
                    <i className="fas fa-calendar"></i> {data.createdondate[8] + data.createdondate[9]}-{data.createdondate[5] + data.createdondate[6]}-{data.createdondate[2] + data.createdondate[3]}
                  </div>
                  <br />
                  <div className="ticket-icon-closed">
                    <i className="fas fa-calendar"></i> {data.closedon[8] + data.closedon[9]}-{data.closedon[5] + data.closedon[6]}-{data.closedon[2] + data.closedon[3]}
                  </div>
                </div>
                <div className="col-sm-9 brdr">
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
                    <div className="col-sm-4">Comments: {data.comments}</div>
                    <div className="col-sm-4">Support Comments: {data.supportcomments}</div>
                    <div className="col-sm-4">Assigned To: {data.assigntoperson}</div>
                  </div>
                </div>
              </div>
            </div>
          ))
      ) : (
        <div> No Tickets Found !! </div>
      )}
    </div>
  );
}

export default Closedtickets;
