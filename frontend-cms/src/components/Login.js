import React from "react";
import logo from "../msfl-logo.png";

function login() {
  return (
    <div className="container-fluid bg-msfl-logo-orange">
      <div className="login-card">
        <form>
          <img src={logo} alt="" />
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Password" />
          </div>
          <button type="submit" className="btn btn-success mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default login;
