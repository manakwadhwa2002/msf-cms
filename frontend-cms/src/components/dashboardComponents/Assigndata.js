import React, { useState, useEffect } from "react";
import api from "../../apiConfig";

function Assigndata() {
  const [assigneddevices, setAssData] = useState([]);
  const [devicesearch, setDeviceSearch] = useState("");

  const fetchAssignData = () => {
    api.get("/assigndevices").then((res) => {
      setAssData(res.data);
    });
  };
  useEffect(() => {
    fetchAssignData();
  }, []);

  function htmlToCSV(html, filename) {
    var data = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
      var row = [],
        cols = rows[i].querySelectorAll("td, th");

      for (var j = 0; j < cols.length; j++) {
        row.push(cols[j].innerText);
      }

      data.push(row.join(","));
    }

    downloadCSVFile(data.join("\n"), filename);
  }

  function downloadCSVFile(csv, filename) {
    var csv_file, download_link;

    csv_file = new Blob([csv], { type: "text/csv" });

    download_link = document.createElement("a");

    download_link.download = filename;

    download_link.href = window.URL.createObjectURL(csv_file);

    download_link.style.display = "none";

    document.body.appendChild(download_link);

    download_link.click();
  }

  function generateCsv() {
    var html = document.querySelector("table").outerHTML;
    htmlToCSV(html, "assigndata.csv");
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-11">
            <input type="text" placeholder="Search Assigned Devices" className="form-control" value={devicesearch} onChange={(e) => setDeviceSearch(e.target.value)} />
          </div>
          <div className="col-md-1">
            <button className="btn btn-success" onClick={() => generateCsv()}>
              <i className="fas fa-file-csv"></i>
            </button>
          </div>
        </div>
        <br />
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Device ID</th>
              <th scope="col">Device Type</th>
              <th scope="col">Make</th>
              <th scope="col">Model Type</th>
              <th scope="col">Serial No.</th>
              <th scope="col">Warranty Upto</th>
              <th scope="col">Assigned To ID</th>
              <th scope="col">Assigned To Name</th>
              <th scope="col">Assigned To Email</th>
              <th scope="col">Department</th>
              <th scope="col">Device IP</th>
              <th scope="col">HDD/SSD</th>
              <th scope="col">Assigned On</th>
              <th scope="col">
                Storage <sub>(in GB)</sub>
              </th>
              <th scope="col">
                Ram <sub>(in GB)</sub>
              </th>
              <th>OS</th>
              <th>VNC</th>
              <th>AntiVirus</th>
              <th>USB</th>
            </tr>
          </thead>
          <tbody>
            {assigneddevices
              .filter((value) => {
                if (devicesearch == "") {
                  return value;
                } else if (
                  value.deviceid.toLowerCase().includes(devicesearch.toLowerCase()) ||
                  value.make.toLowerCase().includes(devicesearch.toLowerCase()) ||
                  value.modalyear.toLowerCase().includes(devicesearch.toLowerCase()) ||
                  value.devicetype.toLowerCase().includes(devicesearch.toLowerCase())
                ) {
                  return value;
                }
              })
              .map((data) => (
                <tr key={data._id}>
                  <td>{data.deviceid}</td>
                  <td>{data.devicetype}</td>
                  <td>{data.make}</td>
                  <td>{data.modalyear}</td>
                  <td>{data.serialno}</td>
                  <td>{data.warrantyupto}</td>
                  <td>{data.assignedtomember}</td>
                  <td>{data.assignedtomembername}</td>
                  <td>{data.assignedtomemberemail}</td>
                  <td>{data.assignedtomemberdepartment}</td>
                  <td>{data.deviceip}</td>
                  <td>{data.hddssd}</td>
                  <td>{data.assignedon}</td>
                  <td>{data.ssdhddsize}</td>
                  <td>{data.ram}</td>
                  <td>{data.os}</td>
                  <td>{data.vnc}</td>
                  <td>{data.antivirus}</td>
                  <td>{data.usb}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Assigndata;
