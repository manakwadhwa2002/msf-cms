import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import QRCode from "qrcode";
import { Link } from "react-router-dom";

const api = axios.create({
  baseURL: `http://localhost:4000`,
});

function Managedevices() {
  const [device, setDevice] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [devicesearch, setDeviceSearch] = useState("");
  const ref = useRef(null);

  const fetchDeviceData = () => {
    api.get("/devices").then((res) => {
      setDevice(res.data);
    });
  };
  useEffect(() => {
    fetchDeviceData();
  }, []);

  const generateQrCode = async (qrtext) => {
    try {
      const response = await QRCode.toDataURL(qrtext);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };
  const printqr = () => {
    const qrcode = document.getElementById("modalbody").innerHTML;
    document.getElementById("root").innerHTML = qrcode;
    window.print();
  };

  function genqr(devid) {
    ref.current.click();
    generateQrCode(devid);
  }

  function deleteDevice(devid) {
    api.delete("/devices/" + devid).then((res) => {
      console.log(res.data);
      fetchDeviceData();
    });
  }
  return (
    <>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal"></button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Device Added Successfully
              </h5>
              <button type="button" className="close btn btn-secondary" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center" id="modalbody">
              <img src={imageUrl} alt="" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={printqr}>
                Print
              </button>
              <button type="button" className="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <input className="form-control" type="search" placeholder="Enter Device ID" onChange={(e) => setDeviceSearch(e.target.value)} />
          </div>
          <div className="col-sm-1">
            <button className="btn btn-secondary">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <br />
        <br />
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Device ID</th>
              <th scope="col">Make</th>
              <th scope="col">Model Year</th>
              <th scope="col">Serial No.</th>
              <th scope="col">Warranty Upto</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
              <th scope="col">QR</th>
            </tr>
          </thead>
          <tbody>
            {device
              .filter((value) => {
                if (devicesearch == "") {
                  return value;
                } else if (value._id.toLowerCase().includes(devicesearch.toLowerCase()) || value.make.toLowerCase().includes(devicesearch.toLowerCase()) || value.modalyear.toString().includes(devicesearch.toLowerCase())) {
                  return value;
                }
              })
              .map((data) => (
                <tr key={data._id}>
                  <td>{data._id}</td>
                  <td>{data.make}</td>
                  <td>{data.modalyear}</td>
                  <td>{data.serialno}</td>
                  <td>{data.warrantyupto}</td>
                  <td>
                    <Link to={`/dashboard/edit-device/${data._id}`}>
                      <button className="btn btn-primary">
                        <i className="fas fa-pen"></i>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => deleteDevice(`${data._id}`)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-warning" onClick={() => genqr(`${data._id}`)}>
                      <i className="fas fa-qrcode"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Managedevices;
