import React, { useState, useEffect, useRef } from "react";
import api from "../../apiConfig";

function Opentickets() {
  const [ticket, setTicket] = useState([]);
  const [supportdata, setSupportData] = useState([]);
  const [isscategory, setIsscategory] = useState([]);
  const [isssubcategory, setIsssubcategory] = useState([]);
  const [csiscat, setCsIsCat] = useState("");
  const [csissubcat, setCsIsSubCat] = useState("");
  const [tempticketid, setTicketId] = useState("");
  const [assignto, setAssignToPerson] = useState("");
  const [ticketsearch, setTicketSearch] = useState("");
  const [ticketlen, setTicketLength] = useState(Number);
  const [supportcomments, setSupportComments] = useState("");
  const [fromdate, setFromDate] = useState("");
  const [todate, setToDate] = useState("");

  const ref = useRef(null);

  const fetchData = () => {
    api.get(`/opentickets?from=${fromdate}&to=${todate}`).then((res) => {
      setTicket(res.data);
      setTicketLength(res.data.length);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchSupportData = () => {
    api.get("/getsupportdata").then((res) => {
      setSupportData(res.data);
    });
  };
  useEffect(() => {
    fetchSupportData();
  }, []);
  function closeaticket() {
    // console.log("Call received");
    api
      .patch("/openticket/closeaticket/" + tempticketid, {
        issuecategory: csiscat,
        isssubcategory: csissubcat,
        supportcomments: supportcomments,
      })
      .then((res) => {
        // console.log(res.data);
        alert("Ticket Closed");
        fetchData();
      });
  }
  function openclosebox(deveid) {
    ref.current.click();
    setTicketId(deveid);
    // closeaticket(deveid);
  }
  const fetchIssueData = () => {
    api.get("/issuecategory").then((res) => {
      setIsscategory(res.data);
    });
  };
  useEffect(() => {
    fetchIssueData();
  }, []);
  const fetchIssueSubData = (val) => {
    api.get("/issuesubcategory/" + val).then((res) => {
      setIsssubcategory(res.data);
    });
  };
  useEffect(() => {
    fetchIssueSubData();
  }, []);
  function reloadsubcat(e) {
    setCsIsCat(e.target.value);
    fetchIssueSubData(e.target.value);
  }
  function assigntickettoperson(ticketid) {
    api
      .patch("/openticket/assign/" + ticketid, {
        assigntoperson: assignto,
      })
      .then((res) => {
        console.log(res.data);
        fetchData();
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
                Close Ticket
              </h5>
              <button type="button" className="close btn btn-secondary" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center" id="modalbody">
              <form>
                <select className="form-control" onChange={(e) => reloadsubcat(e)}>
                  <option value="">-- Issue Category --</option>
                  {isscategory.map((data) => (
                    <option value={data.name} key={data._id}>
                      {data.name}
                    </option>
                  ))}
                </select>
                <br />
                <select className="form-control" value={csissubcat} onChange={(e) => setCsIsSubCat(e.target.value)}>
                  <option value="">-- Issue Sub Category --</option>
                  {isssubcategory.map((data) => (
                    <option value={data.name} key={data._id}>
                      {data.name}
                    </option>
                  ))}
                </select>
                <br />
                <textarea cols="30" rows="5" placeholder="Please comment on what you have resolved !!!" className="form-control" value={supportcomments} onChange={(e) => setSupportComments(e.target.value)}></textarea>
              </form>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-warning" data-dismiss="modal" onClick={closeaticket}>
                Close Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="ticketContainer container">
        <input className="form-control" type="search" placeholder="Search Ticket" onChange={(e) => setTicketSearch(e.target.value)} />
        <br />
        <div className="row">
          <div className="col-sm-1 form-control border-0 text-center">From:</div>
          <div className="col-sm-2">
            <input type="date" className="form-control" value={fromdate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div className="col-sm-1 form-control border-0 text-center">To:</div>
          <div className="col-sm-2">
            <input type="date" className="form-control" value={todate} onChange={(e) => setToDate(e.target.value)} />
          </div>
          <div className="col-sm-2 text-center">
            <button className="btn btn-warning" onClick={() => fetchData()}>
              <i className="fas fa-search"></i> Search
            </button>
          </div>
        </div>
        <br />
        {ticketlen > 0 ? (
          ticket
            .filter((value) => {
              if (ticketsearch == "") {
                return value;
              } else if (value.createdby.toLowerCase().includes(ticketsearch.toLowerCase()) || value.deviceid.toLowerCase().includes(ticketsearch.toLowerCase()) || value.assigntoperson.toLowerCase().includes(ticketsearch.toLowerCase())) {
                return value;
              }
            })
            .map((data) => (
              <div className="ticket" key={data._id}>
                <div className="row">
                  <div className="col-sm-2 brdr">
                    <div className="ticket-icon">
                      <i className="fas fa-calendar"></i> {data.createdondate[8] + data.createdondate[9]}-{data.createdondate[5] + data.createdondate[6]}-{data.createdondate[2] + data.createdondate[3]}
                    </div>
                  </div>
                  <div className="col-sm-8 brdr">
                    <div className="row">
                      <div className="col-sm-6">Created By: {data.createdbyname}</div>
                      {/* <div className="col-sm-4">Created On Date: {data.createdondate}</div> */}
                      <div className="col-sm-6">Device ID: {data.deviceid}</div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-sm-6">Department: {data.department}</div>
                      {/* <div className="col-sm-4">OS: {data.os}</div> */}
                      <div className="col-sm-6">Device IP: {data.deviceip}</div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-sm-6">Comments: {data.comments}</div>
                      <div className="col-sm-6">Assigned To: {data.assigntoperson}</div>
                    </div>
                  </div>
                  <div className="col-sm-2 brdr">
                    <div className="row">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                          <select className="form-control" onChange={(e) => setAssignToPerson(e.target.value)}>
                            <option value="">-- Assign To --</option>
                            {/* <option value={supportdata[0]._id}>{supportdata[0].name}</option> */}
                            {supportdata.map((sdata) => (
                              <option value={sdata._id} key={sdata._id}>
                                {sdata.name}
                              </option>
                            ))}
                          </select>
                          <br />
                          <button className="btn btn-success" onClick={() => assigntickettoperson(`${data._id}`)}>
                            <i className="fas fa-save"></i> Save
                          </button>
                          <br />
                          <br />
                          <button className="btn btn-danger" type="button" onClick={() => openclosebox(`${data._id}`)}>
                            <i className="fas fa-times-circle"></i> Close Ticket
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div> No Tickets Found !!!</div>
        )}
      </div>
    </>
  );
}

export default Opentickets;
