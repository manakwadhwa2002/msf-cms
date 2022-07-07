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
        setAlertMessage("Hurray 🤩 ! " + res.data.message + "!!!");
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
        if (res.data.modifiedCount > 0) {
          setAlertMessage("Hurray 🤩 ! Member Updated Successfully !!!");
        }
        fetchMemberData();
      });
  }
  return (
    <>
      <div className="container">
        <h2>Add Member</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <div className="row">
              <div className="col-md-3">
                {alertmessage ? (
                  <div class="alert alert-success" role="alert">
                    {alertmessage}
                  </div>
                ) : null}
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
                  <option value="Accounts">Accounts</option>
                  <option value="Admin Security">Admin Security</option>
                  <option value="Coating">Coating</option>
                  <option value="CEO Office">CEO Office</option>
                  <option value="CS">CS</option>
                  <option value="Despatch">Despatch</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Exports">Exports</option>
                  <option value="Guest House">Guest House</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Maintenance (engg)">Maintenance (engg)</option>
                  <option value="Maintenance (Projects)">Maintenance (Projects)</option>
                  <option value="Maintenance 132 KV">Maintenance 132 KV</option>
                  <option value="Maintenance Line-1">Maintenance Line-1</option>
                  <option value="Maintenance Utilities">Maintenance Utilities</option>
                  <option value="Maintinance  Line-3">Maintinance Line-3</option>
                  <option value="Maintinance (Elect) Line-3">Maintinance (Elect) Line-3</option>
                  <option value="Maintinance (Elect) Line-4">Maintinance (Elect) Line-4</option>
                  <option value="Maintinance (Elect) Line-5">Maintinance (Elect) Line-5</option>
                  <option value="MRD">MRD</option>
                  <option value="MTL">MTL</option>
                  <option value="MTL 2">MTL 2</option>
                  <option value="MTL 3">MTL 3</option>
                  <option value="MTL 4">MTL 4</option>
                  <option value="MTL-5">MTL-5</option>
                  <option value="MTL-6">MTL-6</option>
                  <option value="New Ashe MTL-5">New Ashe MTL-5</option>
                  <option value="Packing">Packing</option>
                  <option value="Packing line-4">Packing line-4</option>
                  <option value="Packing line-5 ">Packing line-5 </option>
                  <option value="Packing line-5 (Sec)">Packing line-5 (Sec)</option>
                  <option value="Packing Line-5(Pri)">Packing Line-5(Pri)</option>
                  <option value="PAD">PAD</option>
                  <option value="PPC">PPC</option>
                  <option value="Production">Production</option>
                  <option value="Production Line-1">Production Line-1</option>
                  <option value="Production Line-4">Production Line-4</option>
                  <option value="Production line-5">Production line-5</option>
                  <option value="Production LINE3">Production LINE3</option>
                  <option value="Purchase">Purchase</option>
                  <option value="QA">QA</option>
                  <option value="QA LINE-1">QA LINE-1</option>
                  <option value="QA LINE-3">QA LINE-3</option>
                  <option value="QA Line-5">QA Line-5</option>
                  <option value="Safety">Safety</option>
                  <option value="Sales">Sales</option>
                  <option value="Slitting">Slitting</option>
                  <option value="Slitting -Ashe8">Slitting -Ashe8</option>
                  <option value="SLITTING LINE 1">SLITTING LINE 1</option>
                  <option value="SLITTING LINE 2">SLITTING LINE 2</option>
                  <option value="SLITTING LINE 5">SLITTING LINE 5</option>
                  <option value="SLITTING LINE-2">SLITTING LINE-2</option>
                  <option value="SLITTING LINE-3">SLITTING LINE-3</option>
                  <option value="SLITTING LINE-4">SLITTING LINE-4</option>
                  <option value="SLITTING LINE-5">SLITTING LINE-5</option>
                  <option value="Stores">Stores</option>
                  <option value="Store Wooden  line-4 ">Store Wooden line-4 </option>
                  <option value="Stores (Gate)">Stores (Gate)</option>
                  <option value="Thermal">Thermal</option>
                  <option value="THERMAL -2 Slitting ">THERMAL -2 Slitting </option>
                  <option value="THERMAL -3 Production ">THERMAL -3 Production </option>
                  <option value="THERMAL -4 Packing ">THERMAL -4 Packing </option>
                  <option value="THERMAL -4 Slitting ">THERMAL -4 Slitting </option>
                  <option value="Thermal Line-2">Thermal Line-2</option>
                  <option value="Thermal Packing-Line-2">Thermal Packing-Line-2</option>
                  <option value="THERMAL Production MCG 2">THERMAL Production MCG 2</option>
                  <option value="THERMAL Production THERMAL-4">THERMAL Production THERMAL-4</option>
                  <option value="Thermal QA LAB">Thermal QA LAB</option>
                  <option value="THERMAL Slitting - PSM 3">THERMAL Slitting - PSM 3</option>
                  <option value="Thermal-2 -QA">Thermal-2 -QA</option>
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
                <table className="table table-bordered">
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
                            // value.phonenumber.toString().includes(searchmember) ||
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
