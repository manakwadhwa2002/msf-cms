import React, { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:4000`,
});

function Createticket() {
  const [comments, setComments] = useState("");
  const memberId = "629c73004ce39547cc7a54ac";
  function submit(e) {
    e.preventDefault();
    api
      .post("/createticket", {
        memberId: memberId,
        comments: comments,
      })
      .then((res) => {
        console.log(res.data);
      });
  }
  return (
    <div className="container">
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="commentissue">Comment on Issue (Optional)</label>
          <textarea id="commentissue" cols="30" rows="10" placeholder="Comment your Issue in one line !" className="form-control" value={comments} onChange={(e) => setComments(e.target.value)}></textarea>
        </div>
        <br />
        <button className="btn btn-success" type="submit">
          <i className="fas fa-exclamation-circle"></i> Create Ticket
        </button>
      </form>
    </div>
  );
}

export default Createticket;
