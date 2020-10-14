import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ProtectedRoute from "./comps/protectedRoute";
import LoginRegisterRoute from "./comps/loginRegisterRoute";

import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import NotFoundPage from "./pages/notFoundPage";

import styled from "styled-components";

const AppDiv = styled.div`
  display: grid;
  background-color: #282c34;
  min-height: 100vh;
  text-align: center;
  color: white;
  align-items: center;
  justify-items: center;
`;

const App = () => {
  return (
    <Router>
      <AppDiv className="App">
        <Switch>
          <ProtectedRoute exact path="/" component={HomePage} />
          <LoginRegisterRoute path="/login" component={LoginPage} />
          <LoginRegisterRoute path="/register" component={RegisterPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </AppDiv>
    </Router>
  );
};

export default App;
