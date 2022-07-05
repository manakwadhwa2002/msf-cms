import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import api from "../../apiConfig";

function Managedevices(props) {
  const [device, setDevice] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [devicesearch, setDeviceSearch] = useState("");
  const [pageCount, setpageCount] = useState(0);
  const [limit, setLimit] = useState();
  const [comments, setComments] = useState("");
  const [tempdevid, setTempDevId] = useState("");
  const ref = useRef(null);
  const ctref = useRef(null);
  const nav = useNavigate();

  const fetchDeviceData = () => {
    api.get(`/devices`).then((res) => {
      const total = res.data.length;
      setpageCount(Math.ceil(total / limit));
    });
    api.get(`/devices?limit=${limit}`).then((res) => {
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

  const fetchDevices = (currentPage) => {
    api.get(`/devices?page=${currentPage}&limit=${limit}`).then((res) => {
      setDevice(res.data);
    });
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    fetchDevices(currentPage);
  };

  function newLimit(nlimit) {
    api.get(`/devices?limit=${nlimit}`).then((res) => {
      setDevice(res.data);
    });
    api.get(`/devices`).then((res) => {
      const total = res.data.length;
      setpageCount(Math.ceil(total / nlimit));
    });
  }

  function genticket(devid) {
    ctref.current.click();
    setTempDevId(devid);
  }

  function createtic() {
    api
      .post("/createticket", {
        deviceId: tempdevid,
        memberId: props.userId,
        comments: comments,
      })
      .then((res) => {
        console.log(res.data);
      });
  }

  return (
    <>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#qrModal"></button>

      <div className="modal fade" id="qrModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Device QR
              </h5>
              <button type="button" className="close btn btn-secondary" data-dismiss="modal" aria-label="Close">
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
        <div className="row">
          <div className="col-sm-8"></div>
          <div className="col-sm-2 form-control border-0">Results Per Page: </div>
          <div className="col-sm-2">
            <select className="form-control" onChange={(e) => newLimit(e.target.value)}>
              <option value="">ALL</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="35">35</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
        <br />
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Device ID</th>
              <th scope="col">Make</th>
              <th scope="col">Model Type</th>
              <th scope="col">Serial No.</th>
              <th scope="col">Warranty Upto</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
              <th scope="col">QR</th>
              <th scope="col">Create Ticket</th>
              <th scope="col">Assign Device</th>
            </tr>
          </thead>
          <tbody>
            {device
              .filter((value) => {
                if (devicesearch == "") {
                  return value;
                } else if (
                  value._id.toLowerCase().includes(devicesearch.toLowerCase()) ||
                  value.make.toLowerCase().includes(devicesearch.toLowerCase()) ||
                  value.modalyear.toLowerCase().includes(devicesearch.toLowerCase())
                  // value.serialno.toLowerCase().includes(devicesearch.toLowerCase()) ||
                  // value.warrantyupto.toString().includes(devicesearch.toLowerCase())
                ) {
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
                  <td>
                    <button className="btn btn-info" onClick={() => genticket(`${data._id}`)}>
                      <i className="fas fa-file"></i>
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-success" onClick={() => nav(`/dashboard/assign-device/${data._id}`)}>
                      <i className="fas fa-laptop"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}

export default Managedevices;
