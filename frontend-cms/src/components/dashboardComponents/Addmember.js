import React, { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:4000`,
});

function Addmember() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [alertmessage, setAlertMessage] = useState("");

  function submit(e) {
    e.preventDefault();
    api
      .post("/addmember", {
        name: name,
        email: email,
        phonenumber: phonenumber,
        department: department,
        password: password,
      })
      .then((res) => {
        // console.log(res.data.message);
        setAlertMessage(res.data.message);
      });
  }
  return (
    <>
      <div className="container">
        <h2>Add Member</h2>
        <form onSubmit={submit}>
          <div className="form-group">
            {/* <div class="alert alert-success" role="alert">
              {alertmessage}
            </div> */}
            <div className="row">
              <div className="col-md-4">
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
                <button className="btn btn-success" type="submit">
                  Add Member
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Addmember;
