import React, { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:4000`,
});

function Adddevice() {
  const [devicetype, setDeviceType] = useState("");
  const [make, setMake] = useState("");
  const [modalyear, setModalYear] = useState("");
  const [macaddress, setMacAddress] = useState("");
  const [antivirus, setAntivirus] = useState("");
  const [vnc, setVnc] = useState("");
  const [warrantyupto, setWarrantyUpto] = useState("");
  const [os, setOs] = useState("");

  function submit(e) {
    e.preventDefault();
    api
      .post("/adddevice", {
        devicetype: devicetype,
        make: make,
        modalyear: modalyear,
        macaddress: macaddress,
        antivirus: antivirus,
        vnc: vnc,
        warrantyupto: warrantyupto,
        os: os,
      })
      .then((res) => {
        console.log(res.data);
      });
  }

  return (
    <>
      <div className="container">
        <h2>Add Device</h2>
        <form onSubmit={submit}>
          <div className="form-group">
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="deviceType">Device Type</label>
                <select id="deviceType" className="form-control" value={devicetype} onChange={(e) => setDeviceType(e.target.value)}>
                  <option value="">-- Select Device Type --</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Desktop">Desktop</option>
                </select>
                <br />
                <label htmlFor="deviceMake">Make</label>
                <select id="deviceMake" className="form-control" value={make} onChange={(e) => setMake(e.target.value)}>
                  <option value="">-- Select Make --</option>
                  <option value="HP">HP</option>
                  <option value="DELL">DELL</option>
                </select>
                <br />
                <label htmlFor="modelyear">Model Year</label>
                <select id="modelyear" className="form-control" value={modalyear} onChange={(e) => setModalYear(e.target.value)}>
                  <option value="">-- Model Year --</option>
                  <option value="2030">2030</option>
                  <option value="2029">2029</option>
                  <option value="2028">2028</option>
                  <option value="2027">2027</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                </select>
                <br />
                <label htmlFor="macadd">MAC Address</label>
                <input type="text" id="macadd" className="form-control" placeholder="Enter MAC Address" value={macaddress} onChange={(e) => setMacAddress(e.target.value)} />
              </div>
              <div className="col-md-4">
                <label htmlFor="antivirus">AntiVirus</label>
                <select id="antivirus" className="form-control" value={antivirus} onChange={(e) => setAntivirus(e.target.value)}>
                  <option value="">-- AntiVirus Installed --</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <br />
                <label htmlFor="vnci">VNC</label>
                <select id="vnci" className="form-control" value={vnc} onChange={(e) => setVnc(e.target.value)}>
                  <option value="">-- VNC Installed --</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <br />
                <label htmlFor="warranty">Warranty Upto</label>
                <select id="warranty" className="form-control" value={warrantyupto} onChange={(e) => setWarrantyUpto(e.target.value)}>
                  <option value="">-- Warranty Upto --</option>
                  <option value="2030">2030</option>
                  <option value="2029">2029</option>
                  <option value="2028">2028</option>
                  <option value="2027">2027</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                </select>
                <br />
                <label htmlFor="os">Operating System</label>
                <select id="os" className="form-control" value={os} onChange={(e) => setOs(e.target.value)}>
                  <option value="">-- Select OS --</option>
                  <option value="Windows">Windows</option>
                  <option value="Linux">Linux</option>
                  <option value="MAC OS">MAC OS</option>
                  <option value="Others">Others</option>
                </select>
                {/* 
                <br />
                <label htmlFor="passwd">Password</label>
                <input type="password" id="passwd" className="form-control" placeholder="Enter Password" /> */}
              </div>
              {/* <div className="col-md-4">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" className="form-control" placeholder="Enter Full Name" />
                <br />
                <label htmlFor="emailId">Email</label>
                <input type="text" id="emailId" className="form-control" placeholder="Enter Email" />
                <br />
                <label htmlFor="phoneNum">Phone Number</label>
                <input type="number" id="phoneNum" className="form-control" placeholder="Enter Phone Number" />
                <br />
                <label htmlFor="department">Department</label>
                <select id="department" className="form-control">
                  <option value="">-- Select Department --</option>
                  <option value="">QA</option>
                  <option value="">IT</option>
                  <option value="">Prodution</option>
                </select>
                <br />
                <label htmlFor="passwd">Password</label>
                <input type="password" id="passwd" className="form-control" placeholder="Enter Password" />
              </div> */}
            </div>
            <br />
            <br />
            <button className="btn btn-success">
              <i className="fas fa-laptop"></i> Add Device
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Adddevice;
