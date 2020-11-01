import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { UserAuthProvider } from "./userAuthContext";
import ProtectedRoute from "./comps/protectedRoute";

import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import NotFoundPage from "./pages/notFoundPage";

import { AppDiv } from "./comps/styledComps";

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
        setAuthorizedUser(result.user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onLogin = () => {};

  const onLogout = () => {};

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
            <Route exact path="/" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <ProtectedRoute path="/dashboard" component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </AppDiv>
      </UserAuthProvider>
    </Router>
  );
};

export default App;
