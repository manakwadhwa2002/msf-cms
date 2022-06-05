import React, { useState, useRef } from "react";
import QrReader from "react-qr-reader";
import { Link } from "react-router-dom";

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
  return (
    <>
      <div className="qrr">
        <h3>Scan QR Below</h3>
        <QrReader delay={300} style={{ width: "100%" }} onError={handleErrorWebCam} onScan={handleScanWebCam} />
        <h3>Asset ID: {scanResultWebCam}</h3>
        <div className="row">
          <div className="col-sm">
            <button className="btn btn-primary">
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
        <div class="alert alert-danger" role="alert">
          Found a ticket ! <Link to="/open-tickets">Click Here</Link> to open !!
        </div>
        <div class="alert alert-success" role="alert">
          No ticket found !
        </div>
      </div>
    </>
  );
}

export default Scanqr;
