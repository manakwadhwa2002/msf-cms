import "./App.css";
import "./components/style.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Privateroute from "./Privateroutes";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:4000`,
  withCredentials: true,
});

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="dashboard/*"
          element={
            <Privateroute>
              <Dashboard />
            </Privateroute>
          }
        />
        {/* <Route path="check" element={<Privateroute />} /> */}
        <Route exact path="login" element={<Login />} />
        <Route exact path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
