import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "../comps/navBar";
import Drawer from "../comps/drawer";

import Dashboard from "./dashboard";
import WorkspacesPage from "./workspacesPage";
import ProjectsPage from "./projectsPage";
import TicketsPage from "./ticketsPage";

import { HomePageDiv } from "../comps/styledComps";

const HomePage = (props: any) => {
  const { match } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    const drawerElement = document.getElementById("drawer");

    if (drawerElement) {
      if (!isOpen) {
        drawerElement.style.width = "250px";
        setIsOpen(!isOpen);
      }
      if (isOpen) {
        drawerElement.style.width = "0px";
        setIsOpen(!isOpen);
      }
    }
  };

  return (
    <HomePageDiv>
      <NavBar toggleDrawer={toggleDrawer} />
      <Drawer toggleDrawer={toggleDrawer} baseUrl={match.url} />

      <Switch>
        <Route path={`${match.path}/workspaces`} component={WorkspacesPage} />
        <Route path={`${match.path}/projects`} component={ProjectsPage} />
        <Route path={`${match.path}/tickets`} component={TicketsPage} />
        <Route exact path={`${match.path}`} component={Dashboard} />
      </Switch>
    </HomePageDiv>
  );
};

export default HomePage;
