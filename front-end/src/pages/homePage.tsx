import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "../comps/layout";

import Dashboard from "./dashboard";
import WorkspacesPage from "./workspace/workspacesPage";
import ProjectsPage from "./project/projectsPage";
import TicketsPage from "./ticket/ticketsPage";

import { HomePageDiv } from "../comps/styledComps";

const HomePage = (props: any) => {
  const { match } = props;

  return (
    <HomePageDiv>
      <Layout>
        <Switch>
          <Route path={`${match.path}/workspaces`} component={WorkspacesPage} />
          <Route path={`${match.path}/projects`} component={ProjectsPage} />
          <Route path={`${match.path}/tickets`} component={TicketsPage} />
          <Route exact path={`${match.path}`} component={Dashboard} />
        </Switch>
      </Layout>
    </HomePageDiv>
  );
};

export default HomePage;
