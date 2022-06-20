import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../../apiConfig";

function Assigndevice() {
  const [memberdata, setMemberData] = useState([]);
  const [searchmember, setSearchMember] = useState("");
  const [assignstatus, setAssignStatus] = useState(false);
  const [assignmemid, setAssignMemberId] = useState("");
  const [ipaddress, setIpAddress] = useState("");
  const deviceidparam = useParams();
  const ref = useRef(null);

  const fetchMemberData = () => {
    api.get("/member").then((res) => {
      setMemberData(res.data);
      //   console.log(res.data);
    });
  };
  useEffect(() => {
    fetchMemberData();
  }, []);
  // function findassignstatus(devid) {
  //   api.get("/assignstatus/" + devid).then((res) => {
  //     if (res.data.assignstatus == "YES") {
  //       setAssignStatus(true);
  //     }
  //   });
  // }
  // useEffect(() => {
  //   findassignstatus(deviceidparam.deviceId);
  // }, []);

  function getip(memid) {
    setAssignMemberId(memid);
    ref.current.click();
  }
  function assignnew() {
    api
      .post("/assigndevice/" + deviceidparam.deviceId, {
        assignedtomember: assignmemid,
        deviceip: ipaddress,
      })
      .then((res) => {
        console.log(res.data);
        // findassignstatus(deviceidparam.deviceId);
      });
  }
  return (
    <>
      {/* {assignstatus === true ? (
        <p>Device Already Assigned</p>
      ) : ( */}
      <>
        <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal"></button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Please Enter IP Address
                </h5>
                <button type="button" className="close btn btn-primary" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body text-center" id="modalbody">
                <input type="text" name="" id="" value={ipaddress} onChange={(e) => setIpAddress(e.target.value)} placeholder="Enter IP Address" className="form-control" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={() => assignnew()}>
                  Assign IP
                </button>
                <button type="button" className="btn btn-danger" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <input type="search" placeholder="Search Member and Assign" className="form-control" onChange={(e) => setSearchMember(e.target.value)} />
          <br />
          <table className="table">
            <thead className="thead">
              <tr>
                <th scope="col">Member ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Department</th>
                <th scope="col">Phone Number</th>
                <th>Assign</th>
              </tr>
            </thead>
            <tbody>
              {memberdata
                .filter((value) => {
                  if (searchmember == "") {
                    return value;
                  } else if (
                    value._id.toLowerCase().includes(searchmember.toLowerCase()) ||
                    value.name.toLowerCase().includes(searchmember.toLowerCase()) ||
                    value.email.toLowerCase().includes(searchmember.toLowerCase()) ||
                    value.phonenumber.toString().includes(searchmember) ||
                    value.department.toLowerCase().includes(searchmember.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((data) => (
                  <tr key={data._id}>
                    <td>{data._id}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.department}</td>
                    <td>{data.phonenumber}</td>
                    <td>
                      <button className="btn btn-success" onClick={() => getip(`${data._id}`)}>
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
      {/* )} */}
    </>
  );
}

export default Assigndevice;
