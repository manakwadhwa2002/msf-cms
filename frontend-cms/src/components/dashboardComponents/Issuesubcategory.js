import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:4000`,
});

function IssueSubCategory() {
  const [nameSubCategory, setIssueSubCategory] = useState("");
  const [isssubcategory, setIsssubcategory] = useState([]);
  const [isscategory, setIsscategory] = useState([]);
  const [parentcategory, setParentCategory] = useState([]);
  function submit(e) {
    api
      .post("/issuesubcategory", {
        parentcategory: parentcategory,
        name: nameSubCategory,
      })
      .then((res) => {
        console.log(res.data);
      });
  }
  const fetchIssueData = () => {
    api.get("/issuecategory").then((res) => {
      setIsscategory(res.data);
    });
  };
  useEffect(() => {
    fetchIssueData();
  }, []);
  const fetchIssueSubData = () => {
    api.get("/issuesubcategory").then((res) => {
      setIsssubcategory(res.data);
    });
  };
  useEffect(() => {
    fetchIssueSubData();
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <h2>Add / Edit Issue Sub Categories</h2>
          <form onSubmit={submit}>
            <div className="form-group">
              <select className="form-control" value={parentcategory} onChange={(e) => setParentCategory(e.target.value)}>
                <option value="">-- Select Issue Category --</option>
                {isscategory.map((data) => (
                  <option value={data.name}>{data.name}</option>
                ))}
              </select>
              <br />
              <input type="text" className="form-control" placeholder="Enter Sub Category Here ..." value={nameSubCategory} onChange={(e) => setIssueSubCategory(e.target.value)} />
              <br />
              <button className="btn btn-success">Create Issue Sub Catgory</button>
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
                <th scope="col">Issue Sub Category Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {isssubcategory.map((data) => (
                <tr>
                  <td>{data._id}</td>
                  <td>{data.parentcategory}</td>
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

export default IssueSubCategory;
