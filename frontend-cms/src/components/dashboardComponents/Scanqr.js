import React, { useState, useRef, useEffect } from "react";
import QrReader from "react-qr-reader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../apiConfig";

function Scanqr(props) {
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const qrRef = useRef(null);
  const ctref = useRef(null);
  const [comments, setComments] = useState("");
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
    });
  };
  const assigndevicetonew = () => {
    nav("/dashboard/assign-device/" + deviceid);
  };
  const trackhistorydevice = () => {
    nav("/dashboard/track-device-history/" + deviceid);
  };

  function genticket() {
    ctref.current.click();
  }

  function createtic() {
    api
      .post("/createticket", {
        deviceId: deviceid,
        memberId: props.userId,
        comments: comments,
      })
      .then((res) => {
        console.log(res.data);
      });
  }

  return (
    <>
      <button ref={ctref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#ticketModal"></button>

      <div className="modal fade" id="ticketModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Ticket
              </h5>
              <button type="button" className="close btn btn-secondary" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" id="modalbody">
              <label htmlFor="adminTicketComments">Comments (Optional)</label>
              <textarea id="adminTicketComments" className="form-control" placeholder="Please Share Your Comments Here ..." rows={5} value={comments} onChange={(e) => setComments(e.target.value)}></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => createtic()}>
                Submit
              </button>
              <button type="button" className="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

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
            <button className="btn btn-warning" onClick={trackhistorydevice}>
              <i className="fas fa-history"></i> Track History
            </button>
          </div>
          <div className="col-sm">
            <button className="btn btn-success" onClick={assigndevicetonew}>
              <i className="fas fa-user"></i> Assign New
            </button>
          </div>
          <br />
          <br />
          <div className="col-sm">
            <button className="btn btn-info" onClick={genticket}>
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
