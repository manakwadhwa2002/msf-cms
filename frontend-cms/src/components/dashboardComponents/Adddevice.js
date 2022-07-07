import React, { useRef, useState } from "react";
import QRCode from "qrcode";
import api from "../../apiConfig";

function Adddevice() {
  const [qrtext, setQrtext] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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
  const [msoffice, setMsOffice] = useState("");
  const [printertype, setPrinterType] = useState("");

  const ref = useRef(null);

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
        msoffice: msoffice,
      })
      .then((res) => {
        generateQrCode(res.data._id);
        ref.current.click();
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
              <button type="button" className="close btn btn-primary" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center qr-border" id="modalbody">
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
        <h2>Add Device</h2>
        <form onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="deviceType">
              Select Device Type<span className="text-danger">*</span>
            </label>
            <select id="deviceType" className="form-control" value={devicetype} onChange={(e) => setDeviceType(e.target.value)}>
              <option value="">-- Select Device Type --</option>
              <option value="Laptop">Laptop</option>
              <option value="Desktop">Desktop</option>
              <option value="Printer">Printer</option>
              <option value="Access Point">Access Point</option>
              <option value="QA Desktop">QA Desktop</option>
              <option value="Scada Desktop">Scada Desktop</option>
            </select>
            <br />
            {devicetype === "Laptop" ? (
              <>
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="deviceMake">
                      Make<span className="text-danger">*</span>
                    </label>
                    <select id="deviceMake" className="form-control" value={make} onChange={(e) => setMake(e.target.value)}>
                      <option value="">-- Select Make --</option>
                      <option value="HP">HP</option>
                      <option value="DELL">DELL</option>
                    </select>
                    <br />
                    <label htmlFor="modelyear">
                      Model Type<span className="text-danger">*</span>
                    </label>
                    <input type="text" placeholder="Enter Modal Type" className="form-control" value={modalyear} onChange={(e) => setModalYear(e.target.value)} />
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
                      <span className="text-danger">*</span>
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
                    <label htmlFor="msoffice">MS Office</label>
                    <select id="msoffice" className="form-control" value={msoffice} onChange={(e) => setMsOffice(e.target.value)}>
                      <option value="">-- Select MS Office --</option>
                      <option value="MS Office  2007 Std">MS Office 2007 Std</option>
                      <option value="MS Office  2013 Std">MS Office 2013 Std</option>
                      <option value="MS Office  2016 Std">MS Office 2016 Std</option>
                      <option value="MS Office  2017 Std">MS Office 2017 Std</option>
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
                    <label htmlFor="warranty">
                      Warranty Upto<span className="text-danger">*</span>
                    </label>
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
                    <label htmlFor="ssdhdd">
                      SSD/HDD<span className="text-danger">*</span>
                    </label>
                    <select id="ssdhdd" className="form-control" value={ssdhdd} onChange={(e) => setSsdHdd(e.target.value)}>
                      <option value="">-- Select SSD/HDD --</option>
                      <option value="SSD">SSD</option>
                      <option value="HDD">HDD</option>
                    </select>
                    <br />
                    <label htmlFor="ssdhddsize">
                      SSD/HDD Size <sub>(in GB)</sub>
                      <span className="text-danger">*</span>
                    </label>
                    <select id="ssdhddsize" className="form-control" value={ssdhddsize} onChange={(e) => setSsdHddSize(e.target.value)}>
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
                    <label htmlFor="macadd">
                      Serial No<span className="text-danger">*</span>
                    </label>
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
                  <i className="fas fa-laptop"></i> Add {devicetype}
                </button>
              </>
            ) : null}
            {devicetype === "Desktop" || devicetype === "QA Desktop" || devicetype === "Scada Desktop" ? (
              <>
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="deviceMake">
                      Make<span className="text-danger">*</span>
                    </label>
                    <select id="deviceMake" className="form-control" value={make} onChange={(e) => setMake(e.target.value)}>
                      <option value="">-- Select Make --</option>
                      <option value="HP">HP</option>
                      <option value="DELL">DELL</option>
                    </select>
                    <br />
                    <label htmlFor="modelyear">
                      Model Type<span className="text-danger">*</span>
                    </label>
                    <input type="text" placeholder="Enter Modal Type" className="form-control" value={modalyear} onChange={(e) => setModalYear(e.target.value)} />
                    <br />
                    <label htmlFor="ram">
                      RAM <sub>(in GB)</sub>
                      <span className="text-danger">*</span>
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
                    <label htmlFor="warranty">
                      Warranty Upto<span className="text-danger">*</span>
                    </label>
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
                    <label htmlFor="multiuser">
                      Multi User<span className="text-danger">*</span>
                    </label>
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
                      <option value="Windows 7 Pro">Windows 7 Pro</option>
                      <option value="Windows 8.1 Pro">Windows 8.1 Pro</option>
                      <option value="Windows 10 Home">Windows 10 Home</option>
                      <option value="Windows 10 Pro">indows 10 Pro</option>
                      <option value="Linux">Linux</option>
                      <option value="MAC OS">MAC OS</option>
                      <option value="Others">Others</option>
                    </select>
                    <br />
                    <label htmlFor="ssdhdd">
                      SSD/HDD<span className="text-danger">*</span>
                    </label>
                    <select id="ssdhdd" className="form-control" value={ssdhdd} onChange={(e) => setSsdHdd(e.target.value)}>
                      <option value="">-- Select SSD/HDD --</option>
                      <option value="SSD">SSD</option>
                      <option value="HDD">HDD</option>
                    </select>
                    <br />
                    <label htmlFor="ssdhddsize">
                      SSD/HDD Size <sub>(in GB)</sub>
                      <span className="text-danger">*</span>
                    </label>
                    <select id="ssdhddsize" className="form-control" value={ssdhddsize} onChange={(e) => setSsdHddSize(e.target.value)}>
                      <option value="">-- Select SSD/HDD Size --</option>
                      <option value="128">128</option>
                      <option value="256">256</option>
                      <option value="512">512</option>
                      <option value="1024">1024</option>
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
                    <label htmlFor="msoffice">MS Office</label>
                    <select id="msoffice" className="form-control" value={msoffice} onChange={(e) => setMsOffice(e.target.value)}>
                      <option value="">-- Select MS Office --</option>
                      <option value="MS Office  2007 Std">MS Office 2007 Std</option>
                      <option value="MS Office  2013 Std">MS Office 2013 Std</option>
                      <option value="MS Office  2016 Std">MS Office 2016 Std</option>
                      <option value="MS Office  2017 Std">MS Office 2017 Std</option>
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
                    <label htmlFor="vpn">VPN</label>
                    <select id="vpn" className="form-control" value={vpn} onChange={(e) => setVpn(e.target.value)}>
                      <option value="">-- Select VPN Status --</option>
                      <option value="Enabled">Enabled</option>
                      <option value="Disabled">Disabled</option>
                    </select>
                    <br />
                    <label htmlFor="serialno">
                      Serial No<span className="text-danger">*</span>
                    </label>
                    <input type="text" id="serialno" className="form-control" placeholder="Enter Serial No" value={serialno} onChange={(e) => setSerialNo(e.target.value)} />
                    <br />
                    <label htmlFor="dlo">DLO Version</label>
                    <input type="text" id="dlo" className="form-control" placeholder="Enter DLO Version" value={dlov} onChange={(e) => setDloV(e.target.value)} />
                  </div>
                </div>
                <br />
                <br />
                <button className="btn btn-success">
                  <i className="fas fa-laptop"></i> Add {devicetype}
                </button>
              </>
            ) : null}
            {devicetype === "Printer" ? (
              <>
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="printerType">
                      Printer Type<span className="text-danger">*</span>
                    </label>
                    <select id="printerType" className="form-control" value={printertype} onChange={(e) => setPrinterType(e.target.value)}>
                      <option value="">-- Select Printer Type --</option>
                      <option value="Laser">Laser</option>
                      <option value="Inkjet">Inkjet</option>
                    </select>
                    <br />
                    <label htmlFor="deviceMake">
                      Make<span className="text-danger">*</span>
                    </label>
                    <select id="deviceMake" className="form-control" value={make} onChange={(e) => setMake(e.target.value)}>
                      <option value="">-- Select Make --</option>
                      <option value="HP">HP</option>
                      <option value="DELL">DELL</option>
                    </select>
                    <br />
                    <label htmlFor="modelyear">
                      Model Type<span className="text-danger">*</span>
                    </label>
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
                    <label htmlFor="serialno">
                      Serial No<span className="text-danger">*</span>
                    </label>
                    <input type="text" id="serialno" className="form-control" placeholder="Enter Serial No" value={serialno} onChange={(e) => setSerialNo(e.target.value)} />
                    <br />
                    <label htmlFor="warranty">
                      Warranty Upto<span className="text-danger">*</span>
                    </label>
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
                  <i className="fas fa-laptop"></i> Add {devicetype}
                </button>
              </>
            ) : null}
          </div>
        </form>
      </div>
    </>
  );
}

export default Adddevice;
