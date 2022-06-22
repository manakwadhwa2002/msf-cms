import React, { useState } from "react";
import api from "../../apiConfig";

function Createticket(props) {
  const [comments, setComments] = useState("");
  const [multiuser, setMultiUser] = useState(false);
  const [multiusrphone, setMultiUserPhone] = useState("");
  const [assigndevbool, setAssignDevBool] = useState(false);
  function submit(e) {
    e.preventDefault();
    api
      .post("/createticket", {
        memberId: props.userId,
        comments: comments,
      })
      .then((res) => {
        console.log(res.data);
      });
  }

  function checkIfDeviceAssigned() {
    api.get("/assignstatus/member/" + props.userId).then((res) => {
      if (res.data.length > 0) {
        setAssignDevBool(true);
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
  checkIfDeviceAssigned();

  return (
    <div className="container">
      {assigndevbool === true ? (
        <form onSubmit={submit}>
          <div className="form-group">
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
