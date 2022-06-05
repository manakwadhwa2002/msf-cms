import React from "react";
import { Link } from "react-router-dom";

function TrackDeviceHistory() {
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
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Device ID</th>
              <th scope="col">Make</th>
              <th scope="col">Year</th>
              <th scope="col">IP</th>
              <th scope="col">Assigned To</th>
              <th scope="col">In Department</th>
              <th scope="col">Last Issue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th>1</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th>2</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TrackDeviceHistory;
