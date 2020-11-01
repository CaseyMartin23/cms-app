import React, { useState } from "react";
import { Switch } from "react-router-dom";

import { UserAuthContext } from "../userAuthContext";
import ProtectedRoute from "../comps/protectedRoute";

import NavBar from "../comps/navBar";
import Drawer from "../comps/drawer";

import Dashboard from "./dashboard";
import WorkspacesPage from "./workspacesPage";
import ProjectsPage from "./projectsPage";
import TicketsPage from "./ticketsPage";

import { HomePageDiv } from "../comps/styledComps";

const HomePage = (props: any) => {
  const { match } = props;
  const isAuthed = React.useContext(UserAuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthed);
  const [isOpen, setIsOpen] = useState(false);

  const onLogout = async () => {
    try {
      const response = await fetch("/api/logout");
      const result = await response.json();

      if (result) {
        setIsLoggedIn(!result.loggedOut);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDrawer = () => {
    const drawerElement = document.getElementById("drawer");

    if (drawerElement) {
      if (!isOpen) {
        drawerElement.style.width = "300px";
        setIsOpen(!isOpen);
      }
      if (isOpen) {
        drawerElement.style.width = "0px";
        setIsOpen(!isOpen);
      }
    }
  };

  console.log("HomePage-isLoggedIn->", isLoggedIn);
  console.log("HomePage-isAuthed->", isAuthed);

  // if (!isAuthed || !isLoggedIn) return <Redirect to="/" />;
  return (
    <HomePageDiv>
      <NavBar toggleDrawer={toggleDrawer} onLogout={onLogout} />
      <Drawer toggleDrawer={toggleDrawer} baseUrl={match.url} />

      <Switch>
        <ProtectedRoute
          path={`${match.path}/workspaces`}
          component={WorkspacesPage}
        />
        <ProtectedRoute
          path={`${match.path}/projects`}
          component={ProjectsPage}
        />
        <ProtectedRoute
          path={`${match.path}/tickets`}
          component={TicketsPage}
        />
        <ProtectedRoute exact path={`${match.path}`} component={Dashboard} />
      </Switch>
    </HomePageDiv>
  );
};

export default HomePage;
