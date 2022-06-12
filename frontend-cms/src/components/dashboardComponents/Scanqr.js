import React, { useState, useRef, useEffect } from "react";
import QrReader from "react-qr-reader";
import { Link } from "react-router-dom";
import axios from "axios";

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
  const fetchData = () => {
    api.get("/checkstatus/" + deviceid).then((res) => {
      setTicketStatus(res.data);
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
  const assigndevicetonew = (e) => {};

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
            <button className="btn btn-success">
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
            Found a ticket ! <Link to="/open-tickets">Click Here</Link> to open !!
          </div>
        ) : null}
        {ticketstatus == 0 ? (
          <div className="alert alert-success" role="alert">
            No ticket found !
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Scanqr;
