import React, { useState, useEffect } from "react";
import api from "../../apiConfig";

function IssueSubCategory() {
  const [nameSubCategory, setIssueSubCategory] = useState("");
  const [searchsubissue, setSubSearchIssue] = useState("");
  const [isssubcategory, setIsssubcategory] = useState([]);
  const [isscategory, setIsscategory] = useState([]);
  const [parentcategory, setParentCategory] = useState([]);
  const [updatestatus, setUpdateStatus] = useState(false);
  const [updatesubcatid, setUpdateSubCatId] = useState("");
  const [isssubcatlen, setIssSubCatLength] = useState(Number);
  const [displayerrors, setDisplayErrors] = useState("");

  function submit() {
    api
      .post("/issuesubcategory", {
        parentcategory: parentcategory,
        name: nameSubCategory,
      })
      .then((res) => {
        console.log(res.data._id);
        if (res.data._id !== null) {
          setDisplayErrors("Hurray 🤩 ! Issue Sub Category Created Successfully !!!");
        }
        fetchIssueSubData();
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
      setIssSubCatLength(res.data.length);
    });
  };
  useEffect(() => {
    fetchIssueSubData();
  }, []);
  const enableIssueSubEdit = (subissueid) => {
    const updatesubissueval = isssubcategory.filter((value) => {
      if (subissueid === "") {
        return value;
      } else if (value._id.toLowerCase().includes(subissueid.toLowerCase())) {
        return value;
      }
    });
    setParentCategory(updatesubissueval[0].parentcategory);
    setIssueSubCategory(updatesubissueval[0].name);
    setUpdateStatus(true);
    setUpdateSubCatId(subissueid);
  };
  function updateissuesubcat() {
    // console.log("Hello");
    api
      .patch("/issuesubcategory/" + updatesubcatid, {
        parentcategory: parentcategory,
        subcatname: nameSubCategory,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setDisplayErrors("Hurray 🤩 ! Issue Sub Category Updated Successfully !!!");
        }
        fetchIssueSubData();
      });
  }
  function deleteIssueSubCategory(subissueid) {
    api.delete("/issuesubcategory/" + subissueid).then((res) => {
      // console.log(res.data);
      fetchIssueSubData();
    });
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h2>Add / Edit Issue Sub Categories</h2>
          {displayerrors ? (
            <div className="alert alert-success" role="alert">
              {displayerrors}
            </div>
          ) : null}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <select className="form-control" value={parentcategory} onChange={(e) => setParentCategory(e.target.value)}>
                <option value="">-- Select Issue Category --</option>
                {isscategory.map((data) => (
                  <option value={data.name} key={data._id}>
                    {data.name}
                  </option>
                ))}
              </select>
              <br />
              <input type="text" className="form-control" placeholder="Enter Sub Category Here ..." value={nameSubCategory} onChange={(e) => setIssueSubCategory(e.target.value)} />
              <br />
              {updatestatus ? (
                <button className="btn btn-success" onClick={() => updateissuesubcat()}>
                  Update Issue Sub Catgory
                </button>
              ) : (
                <button className="btn btn-success" onClick={() => submit()}>
                  Create Issue Sub Catgory
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-6 table-mobile">
          <h2>Manage Issue Categories</h2>
          <input type="search" placeholder="Search Issue" className="form-control" onChange={(e) => setSubSearchIssue(e.target.value)} />
          <br />
          <table className="table">
            <thead className="thead">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Sub Category Name</th>
                <th scope="col">Sub Category Parent Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {isssubcatlen > 0 ? (
                isssubcategory
                  .filter((value) => {
                    if (searchsubissue === "") {
                      return value;
                    } else if (value._id.toLowerCase().includes(searchsubissue.toLowerCase()) || value.name.toLowerCase().includes(searchsubissue.toLowerCase()) || value.parentcategory.toLowerCase().includes(searchsubissue.toLowerCase())) {
                      return value;
                    }
                  })
                  .map((data) => (
                    <tr key={data._id}>
                      <td>{data._id}</td>
                      <td>{data.name}</td>
                      <td>{data.parentcategory}</td>
                      <td>
                        <button className="btn btn-primary" onClick={() => enableIssueSubEdit(`${data._id}`)}>
                          <i className="fas fa-pen"></i>
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => deleteIssueSubCategory(`${data._id}`)}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td>No Issue Sub Category Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default IssueSubCategory;
