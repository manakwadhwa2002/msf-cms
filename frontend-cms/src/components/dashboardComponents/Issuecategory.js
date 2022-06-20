import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:4000`,
});

function Issuecategory() {
  const [issueCategory, setIssueCategory] = useState("");
  const [searchissue, setSearchIssue] = useState("");
  const [isscategory, setIsscategory] = useState([]);
  const [updatestatus, setUpdateStatus] = useState(false);
  const [updatecatid, setUpdateCatId] = useState("");

  function submit() {
    api
      .post("/issuecategory", {
        name: issueCategory,
      })
      .then((res) => {
        console.log(res.data);
        fetchIssueData();
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
  const enableIssueEdit = (issueid) => {
    const updateissueval = isscategory.filter((value) => {
      if (issueid == "") {
        return value;
      } else if (value._id.toLowerCase().includes(issueid.toLowerCase())) {
        return value;
      }
    });
    setIssueCategory(updateissueval[0].name);
    setUpdateStatus(true);
    setUpdateCatId(issueid);
  };
  function updateissuecat() {
    api
      .patch("/issuecategory/" + updatecatid, {
        catname: issueCategory,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      });
  }
  function deleteIssueCategory(issueid) {
    api.delete("/issuecategory/" + issueid).then((res) => {
      console.log(res.data);
    });
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h2>Add / Edit Issue Categories</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Enter Category Here ..." value={issueCategory} onChange={(e) => setIssueCategory(e.target.value)} />
              <br />
              {updatestatus ? (
                <button className="btn btn-success" onClick={() => updateissuecat()}>
                  Update Issue Catgory
                </button>
              ) : (
                <button className="btn btn-success" onClick={() => submit()}>
                  Create Issue Catgory
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-6">
          <h2>Manage Issue Categories</h2>
          <input type="search" placeholder="Search Issue" className="form-control" onChange={(e) => setSearchIssue(e.target.value)} />
          <br />
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
              {isscategory
                .filter((value) => {
                  if (searchissue == "") {
                    return value;
                  } else if (value._id.toLowerCase().includes(searchissue.toLowerCase()) || value.name.toLowerCase().includes(searchissue.toLowerCase())) {
                    return value;
                  }
                })
                .map((data) => (
                  <tr>
                    <td>{data._id}</td>
                    <td>{data.name}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => enableIssueEdit(`${data._id}`)}>
                        <i className="fas fa-pen"></i>
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => deleteIssueCategory(`${data._id}`)}>
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
