import React, { useState, useEffect } from "react";
import api from "../../apiConfig";

function Issuecategory() {
  const [issueCategory, setIssueCategory] = useState("");
  const [searchissue, setSearchIssue] = useState("");
  const [isscategory, setIsscategory] = useState([]);
  const [updatestatus, setUpdateStatus] = useState(false);
  const [updatecatid, setUpdateCatId] = useState("");
  const [isscatlen, setIssCatLength] = useState(Number);
  const [displayerrors, setDisplayErrors] = useState("");

  function submit() {
    api
      .post("/issuecategory", {
        name: issueCategory,
      })
      .then((res) => {
        if (res.data._id !== null) {
          setDisplayErrors("Hurray 🤩 ! Issue Category Created Successfully !!!");
        }
        fetchIssueData();
      });
  }
  const fetchIssueData = () => {
    api.get("/issuecategory").then((res) => {
      setIsscategory(res.data);
      setIssCatLength(res.data.length);
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
        // console.log(res.data);
        fetchIssueData();
      });
  }
  function deleteIssueCategory(issueid) {
    api.delete("/issuecategory/" + issueid).then((res) => {
      console.log(res.data);
    });
    fetchIssueData();
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-4">
          <h2>Add / Edit Issue Categories</h2>
          {displayerrors ? (
            <div className="alert alert-success" role="alert">
              {displayerrors}
            </div>
          ) : null}
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
        <div className="col-md-6 table-mobile">
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
              {isscatlen > 0 ? (
                isscategory
                  .filter((value) => {
                    if (searchissue == "") {
                      return value;
                    } else if (value._id.toLowerCase().includes(searchissue.toLowerCase()) || value.name.toLowerCase().includes(searchissue.toLowerCase())) {
                      return value;
                    }
                  })
                  .map((data) => (
                    <tr key={data._id}>
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
                  ))
              ) : (
                <tr>
                  <td>No Issue Category Found !!!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Issuecategory;
