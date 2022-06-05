import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:4000`,
});

function Managedevices() {
  const [device, setDevice] = useState([]);
  const fetchDeviceData = () => {
    api.get("/devices").then((res) => {
      setDevice(res.data);
    });
  };
  useEffect(() => {
    fetchDeviceData();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <input class="form-control" type="search" placeholder="Enter Device ID" />
          </div>
          <div className="col-sm-1">
            <button className="btn btn-secondary">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <br />
        <br />
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Device ID</th>
              <th scope="col">Make</th>
              <th scope="col">Model Year</th>
              <th scope="col">MAC</th>
              <th scope="col">Warranty Upto</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {device.map((data) => (
              <tr>
                <td>{data._id}</td>
                <td>{data.make}</td>
                <td>{data.modalyear}</td>
                <td>{data.macaddress}</td>
                <td>{data.warrantyupto}</td>
                <td>
                  <button className="btn btn-primary">
                    <i className="fas fa-pen"></i>
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger">
                    <i className="fas fa-trash"></i>
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
