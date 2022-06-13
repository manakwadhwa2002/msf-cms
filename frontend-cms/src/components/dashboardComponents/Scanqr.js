import React, { useState, useRef, useEffect } from "react";
import QrReader from "react-qr-reader";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: `http://localhost:4000`,
});

function Scanqr() {
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const qrRef = useRef(null);
  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
      qrRef.current.stopCamera();
    }
  };
  const deviceid = scanResultWebCam;
  const [ticketstatus, setTicketStatus] = useState();
  const [deviceinfo, setDeviceInfo] = useState({
    deviceid: "",
    macaddress: "",
    assignstatus: "",
    ipaddress: "",
    assignedto: "",
  });
  const nav = useNavigate();
  const fetchData = () => {
    api.get("/checkstatus/" + deviceid).then((res) => {
      console.log(res.data);
      setTicketStatus(res.data.nooftickets);
      setDeviceInfo({
        deviceid: res.data.deviceid,
        macaddress: res.data.macaddress,
        assignstatus: res.data.assignstatus,
        ipaddress: res.data.ipaddress,
        assignedto: res.data.assignedto,
      });
      // console.log(ticketstatus);
      // if (ticketstatus > 0) {
      //   console.log("Ticket Found");
      // } else {
      //   console.log("Ticket Not Found");
      // }
    });
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  // console.log("Tickets: " + ticketstatus);
  const assigndevicetonew = () => {
    nav("/dashboard/assign-device/" + deviceid);
  };

  return (
    <>
      <div className="qrr">
        <h3>Scan QR Below</h3>
        <QrReader delay={300} style={{ width: "100%" }} onError={handleErrorWebCam} onScan={handleScanWebCam} />
        <h3>Asset ID: {scanResultWebCam}</h3>
        <div className="row">
          <div className="col-sm">
            <button className="btn btn-primary" onClick={fetchData}>
              <i className="fas fa-spinner"></i> Check Status
            </button>
          </div>
          <div className="col-sm">
            <button className="btn btn-warning">
              <i className="fas fa-history"></i> Track History
            </button>
          </div>
          <div className="col-sm">
            <button className="btn btn-success" onClick={assigndevicetonew}>
              <i className="fas fa-user"></i> Assign New
            </button>
          </div>
          <div className="col-sm">
            <button className="btn btn-info">
              <i className="fas fa-exclamation-circle"></i> Create Ticket
            </button>
          </div>
        </div>
        <br />
        {ticketstatus ? (
          <div className="alert alert-danger" role="alert">
            <table className="table">
              <thead></thead>
              <tbody>
                <tr>
                  <td>Device ID: </td>
                  <td>{deviceinfo.deviceid}</td>
                </tr>
                <tr>
                  <td>MAC Address: </td>
                  <td>{deviceinfo.macaddress}</td>
                </tr>
                <tr>
                  <td>Assign Status: </td>
                  <td>{deviceinfo.assignstatus}</td>
                </tr>
                <tr>
                  <td>IP Address: </td>
                  <td>{deviceinfo.ipaddress}</td>
                </tr>
                <tr>
                  <td>Assigned To: </td>
                  <td>{deviceinfo.assignedto}</td>
                </tr>
              </tbody>
            </table>
            Found a ticket ! <Link to="/open-tickets">Click Here</Link> to open !!
          </div>
        ) : null}
        {ticketstatus == 0 ? (
          <div className="alert alert-success" role="alert">
            <table className="table">
              <thead></thead>
              <tbody>
                <tr>
                  <td>Device ID: </td>
                  <td>{deviceinfo.deviceid}</td>
                </tr>
                <tr>
                  <td>MAC Address: </td>
                  <td>{deviceinfo.macaddress}</td>
                </tr>
                <tr>
                  <td>Assign Status: </td>
                  <td>{deviceinfo.assignstatus}</td>
                </tr>
                <tr>
                  <td>IP Address: </td>
                  <td>{deviceinfo.ipaddress}</td>
                </tr>
                <tr>
                  <td>Assigned To: </td>
                  <td>{deviceinfo.assignedto}</td>
                </tr>
              </tbody>
            </table>
            No ticket found !
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Scanqr;
