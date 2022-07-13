import React, { useState, useEffect } from "react";
import api from "../../apiConfig";

function Specialnotification(props) {
  const [notificationdepartment, setNotificationDepartment] = useState(props.usrdepartment);
  const [notificationtext, setNotificationText] = useState("");
  const [allnotifications, setAllNotifications] = useState([]);
  const [errormessage, setErrorMessage] = useState("");
  const fetchNotification = () => {
    api.get(`/specialnotification?department=${props.usrdepartment}`).then((res) => {
      setNotificationText(res.data[0].notificationtext);
    });
  };
  useEffect(() => {
    fetchNotification();
  }, []);

  const fetchAllNotification = () => {
    api.get(`/specialnotification?department=`).then((res) => {
      setAllNotifications(res.data);
      fetchAllNotification();
    });
  };
  useEffect(() => {
    fetchAllNotification();
  }, []);

  const addNewNotification = () => {
    api
      .post("/specialnotification", {
        department: notificationdepartment,
        notificationtext: notificationtext,
      })
      .then((res) => {
        if (res.data._id !== "") {
          setErrorMessage(`Everyone from your department - ${notificationdepartment} can now see this notification !`);
        }
      });
  };

  function loadData(dep, text) {
    setNotificationDepartment(dep);
    setNotificationText(text);
  }
  return (
    <>
      <div className="container-fluid">
        {errormessage !== "" ? (
          <div className="alert alert-success" role="alert">
            {errormessage}
          </div>
        ) : null}
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Department's Special Notification</h2>
          <label htmlFor="department"></label>
          <div className="row">
            <div className="col-lg-5 col-sm-6">
              <select id="department" className="form-control" value={notificationdepartment} onChange={(e) => setNotificationDepartment(e.target.value)}>
                <option value="">-- Select Department --</option>
                {props.usrrole === "ADMIN" ? (
                  <>
                    <option value="ALL">ALL</option>
                    <option value="Accounts">Accounts</option>
                    <option value="Admin Security">Admin Security</option>
                    <option value="Coating">Coating</option>
                    <option value="CEO Office">CEO Office</option>
                    <option value="CS">CS</option>
                    <option value="Despatch">Despatch</option>
                    <option value="ENGINEERING">Engineering</option>
                    <option value="Exports">Exports</option>
                    <option value="GUEST House">Guest House</option>
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                    <option value="MARKETING">Marketing</option>
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
                  </>
                ) : (
                  <>
                    <option value={props.usrdepartment}>{props.usrdepartment}</option>
                  </>
                )}
              </select>
              <br />
              <textarea name="" id="" cols="30" rows="10" className="form-control" placeholder="Please Enter notification for your department here ..." value={notificationtext} onChange={(e) => setNotificationText(e.target.value)}></textarea>
              <button className="btn btn-success mt-3" onClick={() => addNewNotification()}>
                <i className="fas fa-bell"></i> Push Notification
              </button>
            </div>
            <div className="col-lg-1 col-sm-1"></div>
            {props.usrrole === "ADMIN" ? (
              <div className="col-lg-6 col-sm-6">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Department</th>
                      <th scope="col">Current Notification</th>
                      <th scope="col">Edit</th>
                      {/* <th scope="col">Delete</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {allnotifications.map((data) => (
                      <tr>
                        <td>{data.department}</td>
                        <td>{data.notificationtext}</td>
                        <td>
                          <button className="btn btn-primary" onClick={() => loadData(`${data.department}`, `${data.notificationtext}`)}>
                            <i className="fas fa-pen"></i>
                          </button>
                        </td>
                        {/* <td>
                        <button className="btn btn-danger">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </>
  );
}

export default Specialnotification;
