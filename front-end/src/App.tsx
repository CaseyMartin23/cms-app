import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/homePage";
import SignInPage from "./pages/signInPage";
import SignUpPage from "./pages/signUpPage";
import styled from "styled-components";

const AppBackground = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  color: white;
  text-align: center;
  width: 100%;
  padding: 0;
`;

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
