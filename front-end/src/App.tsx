import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import NotFoundPage from "./pages/notFoundPage";

import styled from "styled-components";

const AppBackDrop = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  text-align: center;
  color: white;
`;

const App = () => {
  return (
    <Router>
      <AppBackDrop className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </AppBackDrop>
    </Router>
  );
};

export default App;
