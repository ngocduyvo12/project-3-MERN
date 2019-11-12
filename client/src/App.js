import React from 'react';
import Home from "./pages/home";
import Login from "./pages/login";
import Combat from "./components/Combat";
import Welcome from "./components/Welcome";
// import Map from "./components/map"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/welcome" component={Welcome} />
        <Route path="/combat/:id" component={Combat} />
      </Switch>
    </Router>
  )
}

export default App;
