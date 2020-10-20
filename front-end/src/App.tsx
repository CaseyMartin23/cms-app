import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { UserAuthProvider } from "./userAuthContext";
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
  const [isAuthed, setIsAuthed] = React.useState(false);

  React.useEffect(() => {
    getAuthStatus();
  });

  const getAuthStatus = async () => {
    try {
      const resp = await fetch("/api/isAuthed");
      const result = await resp.json();

      if (result) {
        console.log("getAuthStatus-result->", result);
        setIsAuthed(result.isAuthed);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Router>
      <UserAuthProvider value={{ isAuthed, setIsAuthed }}>
        <AppDiv className="App">
          <Switch>
            <ProtectedRoute exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </AppDiv>
      </UserAuthProvider>
    </Router>
  );
};

export default App;
