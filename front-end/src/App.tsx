import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import styled from "styled-components";

import { UserAuthProvider } from "./userAuthContext";
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
  const [authorizedUser, setAuthorizedUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  React.useEffect(() => {
    getAuthorizedUser();
  });

  const getAuthorizedUser = async () => {
    try {
      const resp = await fetch("/api/isAuthed");
      const result = await resp.json();

      if (result) {
        const { user } = result;
        if (typeof user === "object" && Object.keys(user).length > 0) {
          onLogin(user);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onLogin = (user: object) => {
    setIsAuthenticated(true);
    setAuthorizedUser(user);
  };

  const onLogout = async () => {
    try {
      const response = await fetch("/api/logout");
      const result = await response.json();

      if (result) {
        const { loggedOut } = result;
        if (loggedOut) {
          setIsAuthenticated(false);
          setAuthorizedUser({});
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const UserAuthProviderValue = {
    authorizedUser,
    onLogout,
    onLogin,
    isAuthenticated,
  };

  return (
    <Router>
      <UserAuthProvider value={UserAuthProviderValue}>
        <AppDiv className="App">
          <Switch>
            <LoginRoute exact path="/" component={LoginPage} />
            <LoginRoute path="/register" component={RegisterPage} />
            <ProtectedRoute path="/dashboard" component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </AppDiv>
      </UserAuthProvider>
    </Router>
  );
};

export default App;
