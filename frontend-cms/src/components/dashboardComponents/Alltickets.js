import React, { useState, useEffect } from "react";
import api from "../../apiConfig";

function Alltickets() {
  const [ticket, setTicketData] = useState([]);
  const [devicecount, setDeviceCount] = useState([]);
  const [fromdate, setFromDate] = useState("");
  const [todate, setToDate] = useState("");
  const [ticketstat, setTicketStatus] = useState("");
  const [searchticket, setSearchTicket] = useState("");

  const fetchAllTicketData = () => {
    api.get(`/alltickets?from=${fromdate}&to=${todate}&status=${ticketstat}`).then((res) => {
      setTicketData(res.data);
      fetchDeviceCount();
    });
  };
  useEffect(() => {
    fetchAllTicketData();
  }, []);

  const fetchDeviceCount = () => {
    api.get(`/ticketdevicecount?from=${fromdate}&to=${todate}&status=${ticketstat}`).then((res) => {
      setDeviceCount(res.data);
    });
  };
  useEffect(() => {
    fetchDeviceCount();
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
    htmlToCSV(html, "ticket.csv");
  }
  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-lg-12 col-sm-12">
          <input type="text" placeholder="Search Ticket" className="form-control" value={searchticket} onChange={(e) => setSearchTicket(e.target.value)} />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-2">
          <select className="form-control" value={ticketstat} onChange={(e) => setTicketStatus(e.target.value)}>
            <option value="">ALL Tickets</option>
            <option value="OPEN">Open Tickets</option>
            <option value="CLOSED">Closed Tickets</option>
          </select>
        </div>
        <div className="col-sm-1 form-control border-0 text-right">From:</div>
        <div className="col-sm-2">
          <input type="date" className="form-control" value={fromdate} onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div className="col-sm-1 form-control border-0 text-right">To:</div>
        <div className="col-sm-2">
          <input type="date" className="form-control" value={todate} onChange={(e) => setToDate(e.target.value)} />
        </div>
        <div className="col-sm-2">
          <button className="btn btn-warning" onClick={() => fetchAllTicketData()}>
            <i className="fas fa-search"></i> Search
          </button>
        </div>
        <div className="col-lg-2 col-sm-6">
          <button className="btn btn-success" onClick={() => generateCsv()}>
            <i className="fas fa-file-csv"></i> Download Data
          </button>
        </div>
      </div>
      <br />
      <div className="dataContainer">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">ticket id</th>
              <th scope="col">ticket status</th>
              <th scope="col">created by</th>
              <th scope="col">createdby name</th>
              <th scope="col">department</th>
              <th scope="col">device id</th>
              <th scope="col">device assigned on</th>
              <th scope="col">assigned to person</th>
              <th scope="col">user comments</th>
              <th scope="col">creadted on date</th>
              <th scope="col">closed on date</th>
              <th scope="col">support comments</th>
              <th scope="col">antivirus</th>
              <th scope="col">vnc</th>
            </tr>
          </thead>
          <tbody>
            {ticket.length > 0 ? (
              ticket
                .filter((value) => {
                  if (searchticket == "") {
                    return value;
                  } else if (
                    value.createdbyname.toLowerCase().includes(searchticket.toLowerCase()) ||
                    value.deviceid.toLowerCase().includes(searchticket.toLowerCase()) ||
                    value.assigntoperson.toLowerCase().includes(searchticket.toLowerCase()) ||
                    value.department.toLowerCase().includes(searchticket.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((data) => (
                  <tr key={data._id}>
                    <td>{data._id}</td>
                    <td>{data.ticketstatus}</td>
                    <td>{data.createdby}</td>
                    <td>{data.createdbyname}</td>
                    <td>{data.department}</td>
                    <td>{data.deviceid}</td>
                    <td>{data.assignedon}</td>
                    <td>{data.assigntoperson}</td>
                    <td>{data.comments}</td>
                    <td>
                      {data.createdondate[8] + data.createdondate[9]}-{data.createdondate[5] + data.createdondate[6]}-{data.createdondate[2] + data.createdondate[3]}
                    </td>
                    <td>{data.closedon}</td>
                    <td>{data.supportcomments}</td>
                    <td>{data.antivirus}</td>
                    <td>{data.vnc}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td>No Tickets Found !</td>
              </tr>
            )}
            <div className="d-none">
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr className="">
                <td>No. of Laptops: </td>
                <td>{devicecount[0]}</td>
              </tr>
              <tr className="">
                <td>No. of Desktops: </td>
                <td>{devicecount[1]}</td>
              </tr>
              <tr className="">
                <td>No. of Printers: </td>
                <td>{devicecount[2]}</td>
              </tr>
              <tr className="">
                <td>No. of Access Points: </td>
                <td>{devicecount[3]}</td>
              </tr>
              <tr className="">
                <td>No. of QA Desktops: </td>
                <td>{devicecount[4]}</td>
              </tr>
              <tr className="">
                <td>No. of Scada Desktops: </td>
                <td>{devicecount[5]}</td>
              </tr>
              <tr className="">
                <td>No. of Mouses: </td>
                <td>{devicecount[6]}</td>
              </tr>
              <tr className="">
                <td>No. of Keyboards: </td>
                <td>{devicecount[7]}</td>
              </tr>
              <tr className="">
                <td>No. of Pendrive: </td>
                <td>{devicecount[8]}</td>
              </tr>
              <tr className="">
                <td>No. of Laptop Stand: </td>
                <td>{devicecount[9]}</td>
              </tr>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Alltickets;
