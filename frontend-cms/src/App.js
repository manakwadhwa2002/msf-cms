import "./App.css";
import "./components/style.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="dashboard/*" element={<Dashboard />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
