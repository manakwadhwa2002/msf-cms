import React, { useEffect, useState } from "react";
import api from "../../apiConfig";

function Createticket(props) {
  const [comments, setComments] = useState("");
  const [multiuser, setMultiUser] = useState(false);
  const [multiusrphone, setMultiUserPhone] = useState("");
  const [assigndevbool, setAssignDevBool] = useState(false);
  const [selecteddevice, setSelectedDevice] = useState("");
  const [assigneddevlist, setAssignedDevList] = useState([]);
  const [displayerrors, setDisplayErrors] = useState("");
  function submit(e) {
    e.preventDefault();
    api
      .post("/createticket", {
        memberId: props.userId,
        deviceId: selecteddevice,
        comments: comments,
      })
      .then((res) => {
        if (res.data._id) {
          // console.log("Ticket Created Successfully");
          setDisplayErrors("Ticket Created Successfully");
        }
      });
  }

  function checkIfDeviceAssigned() {
    api.get("/assignstatus/member/" + props.userId).then((res) => {
      if (res.data.length > 0) {
        setAssignDevBool(true);
        setAssignedDevList(res.data);
      }
    });
  }

  function checkMultiUsr() {
    api.get("/checkmultiusr/" + props.userId).then((res) => {
      if (res.data.toLowerCase() === "yes") {
        setMultiUser(true);
      }
    });
  }

  checkMultiUsr();
  useEffect(() => {
    checkIfDeviceAssigned();
  });

  return (
    <div className="container">
      {displayerrors ? (
        <div className="alert alert-success" role="alert">
          {displayerrors}
        </div>
      ) : null}
      {assigndevbool === true ? (
        <form onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="selectdevice">Select Your Device</label>
            <select name="selectdevice" className="form-control" onChange={(e) => setSelectedDevice(e.target.value)}>
              <option value="">--Select A Device --</option>
              {assigneddevlist.map((data) => (
                <option value={data.deviceid}>{data.devicetype + " - " + data.make + " " + data.modalyear}</option>
              ))}
            </select>
            <br />
            <label htmlFor="commentissue">Comment on Issue (Optional)</label>
            <textarea id="commentissue" cols="30" rows="10" placeholder="Comment your Issue in one line !" className="form-control" value={comments} onChange={(e) => setComments(e.target.value)}></textarea>
          </div>
          {multiuser === true ? (
            <>
              <br />
              <label htmlFor="phonemultiuser">Phone Number</label>
              <input type="number" id="phonemultiuser" className="form-control" placeholder="Enter Phone Number" value={multiusrphone} onChange={(e) => setMultiUserPhone(e.target.value)} />
            </>
          ) : null}
          <br />
          <button className="btn btn-success" type="submit">
            <i className="fas fa-exclamation-circle"></i> Create Ticket
          </button>
        </form>
      ) : (
        <div>No Device Is assigned to You</div>
      )}
    </div>
  );
}

export default Createticket;
