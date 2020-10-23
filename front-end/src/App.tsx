import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { UserAuthProvider } from "./userAuthContext";
import ProtectedRoute from "./comps/protectedRoute";

import Dashboard from "./pages/dashboard";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import NotFoundPage from "./pages/notFoundPage";

import { AppDiv } from "./comps/styledComps";

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
            <ProtectedRoute exact path="/" component={Dashboard} />
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
