import './App.css';
import "./components/style.css";
import Login from './components/Login';
import Dashboard from './components/Dashboard';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>   
    </Router>
  );
}

export default App;