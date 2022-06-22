import React, { useState, useEffect } from "react";
import api from "../../apiConfig";

function Addmember() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [alertmessage, setAlertMessage] = useState("");
  const [memberdata, setMemberData] = useState([]);
  const [searchmember, setSearchMember] = useState("");
  const [updatestatus, setUpdateStatus] = useState(false);
  const [updatememdetails, setUpdateMemberDetails] = useState([]);
  const [updatememid, setUpdateMemberId] = useState("");
  const [memberlen, setMemberLength] = useState(Number);

  function submit() {
    api
      .post("/addmember", {
        name: name,
        email: email,
        phonenumber: phonenumber,
        department: department,
        password: password,
      })
      .then((res) => {
        setAlertMessage(res.data.message);
        fetchMemberData();
      });
  }

  const fetchMemberData = () => {
    api.get("/member").then((res) => {
      setMemberData(res.data);
      setMemberLength(res.data.length);
    });
  };
  useEffect(() => {
    fetchMemberData();
  }, []);

  const enableEditmember = (memid) => {
    const updatememval = memberdata.filter((value) => {
      if (memid == "") {
        return value;
      } else if (value._id.toLowerCase().includes(memid.toLowerCase())) {
        return value;
      }
    });
    setUpdateMemberId(memid);
    setUpdateMemberDetails(updatememval);
    setName(updatememval[0].name);
    setEmail(updatememval[0].email);
    setPhoneNumber(updatememdetails[0].phonenumber);
    setDepartment(updatememdetails[0].department);
    setPassword(updatememval[0].password);
    setUpdateStatus(true);
  };

  function updatemember(memid) {
    api
      .patch("/member/" + updatememid, {
        name: name,
        email: email,
        phonenumber: phonenumber,
        department: department,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        fetchMemberData();
      });
  }
  return (
    <>
      <div className="container">
        <h2>Add Member</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            {/* <div class="alert alert-success" role="alert">
              {alertmessage}
            </div> */}
            <div className="row">
              <div className="col-md-3">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" className="form-control" placeholder="Enter Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <label htmlFor="emailId">Email</label>
                <input type="text" id="emailId" className="form-control" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label htmlFor="phoneNum">Phone Number</label>
                <input type="number" id="phoneNum" className="form-control" placeholder="Enter Phone Number" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                <br />
                <label htmlFor="department">Department</label>
                <select id="department" className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)}>
                  <option value="">-- Select Department --</option>
                  <option value="QA">QA</option>
                  <option value="IT">IT</option>
                  <option value="Production">Production</option>
                </select>
                <br />
                <label htmlFor="passwd">Password</label>
                <input type="password" id="passwd" className="form-control" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                {updatestatus ? (
                  <button className="btn btn-success" type="submit" onClick={() => updatemember()}>
                    Update Member
                  </button>
                ) : (
                  <button className="btn btn-success" type="submit" onClick={() => submit()}>
                    Add Member
                  </button>
                )}
              </div>
              <div className="col-md-9">
                <h2>Manage Members</h2>
                <div className="row">
                  <div className="col-md-12">
                    <input type="search" placeholder="Search Member" className="form-control" onChange={(e) => setSearchMember(e.target.value)} />
                  </div>
                  {/* <div className="col-md-3">Result Count: {resultcount}</div> */}
                </div>
                <br />
                <table className="table">
                  <thead className="thead">
                    <tr>
                      <th scope="col">Member ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Department</th>
                      <th scope="col">Phone Number</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memberlen > 0 ? (
                      memberdata
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
                            console.log(value.length);
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
                              <button className="btn btn-primary" onClick={() => enableEditmember(`${data._id}`)}>
                                Edit
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-danger">Delete</button>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td>No Members Found !!!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Addmember;
