import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { StylesProvider } from "@material-ui/core/styles";
import styled from "styled-components";

import { UserAuthProvider } from "./context/userAuthContext";
import ProtectedRoute from "./comps/protectedRoute";
import LoginRoute from "./comps/loginRoute";

import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import NotFoundPage from "./pages/notFoundPage";

const AppDiv = styled.div`
  display: grid;
  min-height: 100vh;
  text-align: center;
  color: white;
  align-items: center;
  justify-items: center;
`;

const App = () => {
  return (
    <Router>
      <UserAuthProvider>
        <StylesProvider injectFirst>
          <AppDiv className="App">
            <Switch>
              <LoginRoute exact path="/" component={LoginPage} />
              <LoginRoute path="/register" component={RegisterPage} />
              <ProtectedRoute path="/dashboard" component={HomePage} />
              <Route component={NotFoundPage} />
            </Switch>
          </AppDiv>
        </StylesProvider>
      </UserAuthProvider>
    </Router>
  );
};

export default App;
