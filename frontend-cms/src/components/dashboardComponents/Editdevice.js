import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../apiConfig";

function Editdevice() {
  const [devicetype, setDeviceType] = useState("");
  const [make, setMake] = useState("");
  const [modalyear, setModalYear] = useState("");
  const [macaddress, setMacAddress] = useState("");
  const [antivirus, setAntivirus] = useState("");
  const [vnc, setVnc] = useState("");
  const [warrantyupto, setWarrantyUpto] = useState("");
  const [os, setOs] = useState("");
  const [usb, setUsb] = useState("");
  const [vpn, setVpn] = useState("");
  const [ssdhdd, setSsdHdd] = useState("");
  const [ssdhddsize, setSsdHddSize] = useState("");
  const [serialno, setSerialNo] = useState("");
  const [onedrive, setOnedrive] = useState("");
  const [dlov, setDloV] = useState("");
  const [ram, setRam] = useState("");
  const [cpuv, setCpuV] = useState("");
  const [multiuser, setMultiUser] = useState("");
  const [networkusbshared, setNetworkUsbShared] = useState("");
  const [printertype, setPrinterType] = useState("");
  const [successstatus, setSuccessStatus] = useState("");
  const deviceidparam = useParams();

  function submit(e) {
    e.preventDefault();
    console.log(printertype, networkusbshared);
    api
      .patch("/devices/" + deviceidparam.deviceId, {
        devicetype: devicetype,
        make: make,
        modalyear: modalyear,
        macaddress: macaddress,
        antivirus: antivirus,
        vnc: vnc,
        warrantyupto: warrantyupto,
        os: os,
        usb: usb,
        vpn: vpn,
        ssdhdd: ssdhdd,
        ssdhddsize: ssdhddsize,
        serialno: serialno,
        onedrive: onedrive,
        dlov: dlov,
        ram: ram,
        cpuv: cpuv,
        printertype: printertype,
        networkusbshared: networkusbshared,
      })
      .then((res) => {
        console.log(res.data);
        setSuccessStatus("Device Updated");
      });
  }

  const fetchSingleDevData = () => {
    api.get("/devices/" + deviceidparam.deviceId).then((res) => {
      setDeviceType(res.data.devicetype);
      setMake(res.data.make);
      setModalYear(res.data.modalyear);
      setMacAddress(res.data.macaddress);
      setAntivirus(res.data.antivirus);
      setVnc(res.data.vnc);
      setOs(res.data.os);
      setWarrantyUpto(res.data.warrantyupto);
      setUsb(res.data.usb);
      setVpn(res.data.vpn);
      setSsdHdd(res.data.ssdhdd);
      setSerialNo(res.data.serialno);
      setOnedrive(res.data.onedrive);
      setDloV(res.data.dlov);
      setRam(res.data.ram);
      setCpuV(res.data.cpuv);
      setMultiUser(res.data.multiuser);
      setNetworkUsbShared(res.data.networkusbshared);
      setPrinterType(res.data.printertype);
    });
  };
  useEffect(() => {
    fetchSingleDevData();
  }, []);

  return (
    <div className="container">
      <h2>Edit Device</h2>
      {successstatus ? (
        <div className="alert alert-success" role="alert">
          Device Updated Successfully !!
        </div>
      ) : null}
      <form onSubmit={submit}>
        <div className="form-group">
          <br />
          <h4>Device Type: {devicetype}</h4>
          {devicetype === "Laptop" ? (
            <>
              <div className="row">
                <div className="col-md-4">
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
                  <label htmlFor="sub">USB</label>
                  <select id="usb" className="form-control" value={usb} onChange={(e) => setUsb(e.target.value)}>
                    <option value="">-- Select USB Status --</option>
                    <option value="Enabled">Enabled</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                  <br />
                  <label htmlFor="vpn">VPN</label>
                  <select id="vpn" className="form-control" value={vpn} onChange={(e) => setVpn(e.target.value)}>
                    <option value="">-- Select VPN Status --</option>
                    <option value="Enabled">Enabled</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                  <br />
                  <label htmlFor="ram">
                    RAM <sub>(in GB)</sub>
                  </label>
                  <select id="ram" className="form-control" value={ram} onChange={(e) => setRam(e.target.value)}>
                    <option value="">-- Select RAM --</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="14">14</option>
                    <option value="16">16</option>
                    <option value="18">18</option>
                    <option value="20">20</option>
                    <option value="24">24</option>
                    <option value="28">28</option>
                    <option value="32">32</option>
                    <option value="64">64</option>
                    <option value="128">128</option>
                  </select>
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
                  <br />
                  <label htmlFor="ssdhdd">SSD/HDD</label>
                  <select id="ssdhdd" className="form-control" value={ssdhdd} onChange={(e) => setSsdHdd(e.target.value)}>
                    <option value="">-- Select SSD/HDD --</option>
                    <option value="SSD">SSD</option>
                    <option value="HDD">HDD</option>
                  </select>
                  <br />
                  <label htmlFor="ssdhdd">
                    SSD/HDD Size <sub>(in GB)</sub>
                  </label>
                  <select id="ssdhdd" className="form-control" value={ssdhddsize} onChange={(e) => setSsdHddSize(e.target.value)}>
                    <option value="">-- Select SSD/HDD Size --</option>
                    <option value="128">128</option>
                    <option value="256">256</option>
                    <option value="512">512</option>
                    <option value="1024">1024</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="cpu">CPU</label>
                  <input type="text" id="cpu" className="form-control" placeholder="Enter CPU" value={cpuv} onChange={(e) => setCpuV(e.target.value)} />
                  <br />
                  <label htmlFor="dlo">DLO Version</label>
                  <input type="text" id="dlo" className="form-control" placeholder="Enter DLO Version" value={dlov} onChange={(e) => setDloV(e.target.value)} />
                  <br />
                  <label htmlFor="macadd">MAC Address</label>
                  <input type="text" id="macadd" className="form-control" placeholder="Enter MAC Address" value={macaddress} onChange={(e) => setMacAddress(e.target.value)} />
                  <br />
                  <label htmlFor="macadd">Serial No</label>
                  <input type="text" id="macadd" className="form-control" placeholder="Enter Serial Number" value={serialno} onChange={(e) => setSerialNo(e.target.value)} />
                  <br />
                  <label htmlFor="onedrive">Onedrive</label>
                  <select id="onedrive" className="form-control" value={onedrive} onChange={(e) => setOnedrive(e.target.value)}>
                    <option value="">-- Select Onedrive Status --</option>
                    <option value="Enabled">Enabled</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                </div>
              </div>
              <br />
              <br />
              <button className="btn btn-success">
                <i className="fas fa-laptop"></i> Update {devicetype}
              </button>
            </>
          ) : null}
          {devicetype === "Desktop" ? (
            <>
              <div className="row">
                <div className="col-md-4">
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
                  <label htmlFor="ram">
                    RAM <sub>(in GB)</sub>
                  </label>
                  <select id="ram" className="form-control" value={ram} onChange={(e) => setRam(e.target.value)}>
                    <option value="">-- Select RAM --</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="14">14</option>
                    <option value="16">16</option>
                    <option value="18">18</option>
                    <option value="20">20</option>
                    <option value="24">24</option>
                    <option value="28">28</option>
                    <option value="32">32</option>
                    <option value="64">64</option>
                    <option value="128">128</option>
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
                  <label htmlFor="multiuser">Multi User</label>
                  <select id="multiuser" className="form-control" value={multiuser} onChange={(e) => setMultiUser(e.target.value)}>
                    <option value="">-- Multi User --</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="os">Operating System</label>
                  <select id="os" className="form-control" value={os} onChange={(e) => setOs(e.target.value)}>
                    <option value="">-- Select OS --</option>
                    <option value="Windows">Windows</option>
                    <option value="Linux">Linux</option>
                    <option value="MAC OS">MAC OS</option>
                    <option value="Others">Others</option>
                  </select>
                  <br />
                  <label htmlFor="ssdhdd">SSD/HDD</label>
                  <select id="ssdhdd" className="form-control" value={ssdhdd} onChange={(e) => setSsdHdd(e.target.value)}>
                    <option value="">-- Select SSD/HDD --</option>
                    <option value="SSD">SSD</option>
                    <option value="HDD">HDD</option>
                  </select>
                  <br />
                  <label htmlFor="sub">USB</label>
                  <select id="usb" className="form-control" value={usb} onChange={(e) => setUsb(e.target.value)}>
                    <option value="">-- Select USB Status --</option>
                    <option value="Enabled">Enabled</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                  <br />
                  <label htmlFor="cpu">CPU</label>
                  <input type="text" id="cpu" className="form-control" placeholder="Enter CPU" value={cpuv} onChange={(e) => setCpuV(e.target.value)} />
                  <br />
                  <label htmlFor="serialno">Serial No</label>
                  <input type="text" id="serialno" className="form-control" placeholder="Enter Serial No" value={serialno} onChange={(e) => setSerialNo(e.target.value)} />
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
                  <label htmlFor="vpn">VPN</label>
                  <select id="vpn" className="form-control" value={vpn} onChange={(e) => setVpn(e.target.value)}>
                    <option value="">-- Select VPN Status --</option>
                    <option value="Enabled">Enabled</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                  <br />
                  <label htmlFor="dlo">DLO Version</label>
                  <input type="text" id="dlo" className="form-control" placeholder="Enter DLO Version" value={dlov} onChange={(e) => setDloV(e.target.value)} />
                </div>
              </div>
              <br />
              <br />
              <button className="btn btn-success">
                <i className="fas fa-laptop"></i> Update {devicetype}
              </button>
            </>
          ) : null}
          {devicetype === "Printer" ? (
            <>
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="printerType">Printer Type</label>
                  <select id="printerType" className="form-control" value={printertype} onChange={(e) => setPrinterType(e.target.value)}>
                    <option value="">-- Select Printer Type --</option>
                    <option value="Laser">Laser</option>
                    <option value="Inkjet">Inkjet</option>
                  </select>
                  <br />
                  <label htmlFor="deviceMake">Make</label>
                  <select id="deviceMake" className="form-control" value={make} onChange={(e) => setMake(e.target.value)}>
                    <option value="">-- Select Make --</option>
                    <option value="HP">HP</option>
                    <option value="DELL">DELL</option>
                  </select>
                  <br />
                  <label htmlFor="modelyear">Model Type</label>
                  <input type="text" placeholder="Enter Modal Type" className="form-control" value={modalyear} onChange={(e) => setModalYear(e.target.value)} />
                  <br />
                  <label htmlFor="networkUsbShared">Network / USB / Shared</label>
                  <select id="networkUsbShared" className="form-control" value={networkusbshared} onChange={(e) => setNetworkUsbShared(e.target.value)}>
                    <option value="">-- Select Network / USB / Shared --</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="multiuser">Multi User</label>
                  <select id="multiuser" className="form-control" value={multiuser} onChange={(e) => setMultiUser(e.target.value)}>
                    <option value="">-- Multi User --</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <br />
                  <label htmlFor="serialno">Serial No</label>
                  <input type="text" id="serialno" className="form-control" placeholder="Enter Serial No" value={serialno} onChange={(e) => setSerialNo(e.target.value)} />
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
                </div>
              </div>
              <br />
              <br />
              <button className="btn btn-success">
                <i className="fas fa-laptop"></i> Update {devicetype}
              </button>
            </>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default Editdevice;
