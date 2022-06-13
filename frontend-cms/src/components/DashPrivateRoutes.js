import React, { useState } from "react";
import axios from "axios";
const api = axios.create({
  baseURL: `http://localhost:4000`,
  withCredentials: true,
});

function DashPrivateRoutes(props) {
  const [adminusr, setAdminUser] = useState(false);
  const { children } = props;
  function checkusrrole() {
    api.get("/user").then((res) => {
      if (res.data.userrole === "ADMIN") {
        setAdminUser(true);
      }
    });
  }
  checkusrrole();
  if (adminusr === true) {
    return children;
  } else {
    return <div>Unauthorized Access</div>;
  }
  //   return <div>abc</div>;
}

export default DashPrivateRoutes;
