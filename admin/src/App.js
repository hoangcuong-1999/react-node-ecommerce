import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./admin/Dashboard";
import SigninPage from "./components/SigninPage";
import AdminRoutes from "./components/AdminRoutes";
import NotFoundComponent from "./components/NotFoundComponent";
// import Switch from "react-bootstrap/esm/Switch";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SigninPage} />
        <AdminRoutes path="/admin/dashboard" component={Dashboard} />
        <Route path="*" component={NotFoundComponent} />
      </Switch>
    </Router>
  );
}

export default App;
