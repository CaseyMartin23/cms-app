import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import userAuthenticationContext, {
  isUserAuthed,
} from "./comps/userAuthenticationContext";
import HomePage from "./pages/homePage";
import SignInPage from "./pages/signInPage";
import SignUpPage from "./pages/signUpPage";
import styled from "styled-components";

type CheckUserAuthProps = {
  children: React.ReactChild | React.ReactChildren;
};

const AppBackground = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  color: white;
  text-align: center;
  width: 100%;
  padding: 0;
`;

const CheckUserAuth = (props: CheckUserAuthProps) => {
  const [isAuthed, setIsAuthed] = useState();

  const getUserAuthStatus = (status: any) => {
    console.log("getUserAuthStatus-status->>", status);
    setIsAuthed(status);
  };

  isUserAuthed(getUserAuthStatus);

  console.log("isAuthed->>", isAuthed);

  if (isAuthed !== undefined && typeof isAuthed === "boolean") {
    if (!isAuthed) return <Redirect to="/signin" />;
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

const App = () => {
  // const [userAuthStat, setUserAuthStat] = useState<any>();

  return (
    <Router>
      <userAuthenticationContext.Provider value={false}>
        <CheckUserAuth>
          <AppBackground id="App">
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/signIn">
                <SignInPage />
              </Route>
              <Route path="/signUp">
                <SignUpPage />
              </Route>
            </Switch>
          </AppBackground>
        </CheckUserAuth>
      </userAuthenticationContext.Provider>
    </Router>
  );
};

export default App;
