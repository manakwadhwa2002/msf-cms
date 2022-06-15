import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
const api = axios.create({
  baseURL: `http://localhost:4000`,
});

function TrackDeviceHistory() {
  const deviceidparam = useParams();
  const [tickethistorydata, setTicketHistoryData] = useState([]);
  const [assignhistorydata, setAssignHistoryData] = useState([]);
  const [devidsearch, setDeviceIdSearch] = useState("");
  const nav = useNavigate();
  function redirecttohistory() {
    nav("/dashboard/track-device-history/" + devidsearch);
    getdevhistory();
    getassignhistory();
  }
  function getdevhistory() {
    api.get("/tickethistory/" + deviceidparam.deviceId).then((res) => {
      if (res.data.message) {
        console.log(res.data.message);
      } else {
        setTicketHistoryData(res.data);
      }
    });
  }
  function getassignhistory() {
    api.get("/assigndevicehistory/" + deviceidparam.deviceId).then((res) => {
      if (res.data.message) {
        console.log(res.data.message);
      } else {
        setAssignHistoryData(res.data);
      }
    });
  }

  useEffect(() => {
    getdevhistory();
    getassignhistory();
  }, []);

  // if (deviceidparam.deviceId != null) {
  //   getdevhistory();
  //   getassignhistory();
  // }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <input className="form-control" type="search" placeholder="Enter Device ID" value={devidsearch} onChange={(e) => setDeviceIdSearch(e.target.value)} />
          </div>
          <div className="col-sm-1">
            <button className="btn btn-secondary" onClick={() => redirecttohistory()}>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="col-sm-1 pt-2">OR</div>
          <div className="col-sm-2">
            <Link to="../scan-qr">
              <button className="btn btn-warning">
                <i className="fas fa-qrcode"></i> Scan QR
              </button>
            </Link>
          </div>
        </div>
        <br />
        <br />
        <h4>Ticket History</h4>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Created By</th>
              <th scope="col">Department</th>
              <th scope="col">OS</th>
              <th scope="col">Device IP</th>
              <th scope="col">Ticket Status</th>
              <th scope="col">Assigned To Person</th>
            </tr>
          </thead>
          <tbody>
            {tickethistorydata.map((data) => (
              <tr key={data._id}>
                <td>
                  {data.createdbyname}-{data.createdby}
                </td>
                <td>{data.department}</td>
                <td>{data.os}</td>
                <td>{data.deviceip}</td>
                <td>{data.ticketstatus}</td>
                <td>{data.assigntoperson}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <h4>Assign History</h4>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Assigned to</th>
              <th scope="col">Assigned On</th>
              <th scope="col">Current Assign Status</th>
            </tr>
          </thead>
          <tbody>
            {assignhistorydata.map((data) => (
              <tr key={data._id}>
                <td>{data.assignedtomember}</td>
                <td>{data.assignedon}</td>
                <td>{data.assignstatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TrackDeviceHistory;
