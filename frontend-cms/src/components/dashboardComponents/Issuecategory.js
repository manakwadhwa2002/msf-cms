import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:4000`,
});

function Issuecategory() {
  const [issueCategory, setIssueCategory] = useState("");
  const [isscategory, setIsscategory] = useState([]);
  function submit(e) {
    // .preventDefault();
    api
      .post("/issuecategory", {
        name: issueCategory,
      })
      .then((res) => {
        console.log(res.data);
      });
  }
  const fetchIssueData = () => {
    api.get("/issuecategory").then((res) => {
      setIsscategory(res.data);
      // console.log(res.data);
    });
  };
  useEffect(() => {
    fetchIssueData();
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <h2>Add / Edit Issue Categories</h2>
          <form onSubmit={submit}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Enter Category Here ..." value={issueCategory} onChange={(e) => setIssueCategory(e.target.value)} />
              <br />
              <button className="btn btn-success">Create Issue Catgory</button>
            </div>
          </form>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-6">
          <h2>Manage Issue Categories</h2>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Issue Category Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {isscategory.map((data) => (
                <tr>
                  <td>{data._id}</td>
                  <td>{data.name}</td>
                  <td>
                    <button className="btn btn-primary">
                      <i className="fas fa-pen"></i>
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-danger">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Issuecategory;
