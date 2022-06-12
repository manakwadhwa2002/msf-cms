import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const api = axios.create({
  baseURL: `http://localhost:4000`,
  withCredentials: true,
});

function Privateroute(props) {
  const [islog, setIsLogIn] = useState(false);
  const { children } = props;
  function isLoggedIn() {
    api.get("/user").then((res) => {
      if (res.data._id !== "") {
        setIsLogIn(true);
      }
    });
  }
  isLoggedIn();
  if (islog === true) {
    return children;
  } else {
    return (
      <div>
        Not Logged In ! Please <Link to="/login">Login Here</Link>
      </div>
    );
  }
}

export default Privateroute;
