import React, { useState, useEffect } from "react";

import { Switch, Route } from "react-router-dom";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

import ItemDisplay from "../../comps/itemDisplay";
import WorkspaceForm from "./workspacesForm";
import Workspace from "./workspace";

import {
  Pannel,
  PannelContainer,
  StyledLink,
  ErrorMessageDiv,
} from "../../comps/styledComps";

type WorkspaceType = {
  id: number;
  name: string;
  projects: [
    {
      id: number;
      name: string;
    }
  ];
};

const WorkspacesPage = (props: any) => {
  const [openForm, setOpenForm] = useState(false);
  const [isLoadingWorkspaces, setIsLoadingWorkspaces] = useState(false);
  const [fetchWorkspacesError, setFetchWorkspacesError] = useState<
    string | undefined
  >();
  const [workspaces, setWorkspaces] = useState([]);
  const { match } = props;

  const onToggleForm = () => {
    setOpenForm(!openForm);
  };

  useEffect(() => {
    const getUserWorkspaces = async () => {
      setIsLoadingWorkspaces(true);
      try {
        const response = await fetch("/api/user-workspaces");
        const result = await response.json();

        if (result) {
          if (JSON.stringify(result) !== JSON.stringify(workspaces)) {
            setWorkspaces(result);
          }
        }
        setIsLoadingWorkspaces(false);
      } catch (err) {
        console.error(err);
        setFetchWorkspacesError("Problem fetching your Workspaces");
        setIsLoadingWorkspaces(false);
      }
    };

    getUserWorkspaces();
  }, [
    workspaces,
    setWorkspaces,
    openForm,
    setIsLoadingWorkspaces,
    setFetchWorkspacesError,
  ]);

  return (
    <div>
      <Switch>
        <Route exact path={`${match.path}`}>
          <div>
            <Toolbar>
              <Typography
                style={{ flexGrow: 1, textAlign: "center" }}
                variant="h4"
              >
                Workspaces
              </Typography>
              <Button
                onClick={onToggleForm}
                style={{ backgroundColor: "#3f51b5" }}
                color="inherit"
              >
                Create Workspace
              </Button>
            </Toolbar>
            {isLoadingWorkspaces && <LinearProgress />}
            {!isLoadingWorkspaces && workspaces.length < 1 && (
              <div>You do not have any Workspaces yet</div>
            )}
            {!isLoadingWorkspaces && fetchWorkspacesError && (
              <ErrorMessageDiv>{fetchWorkspacesError}</ErrorMessageDiv>
            )}
            <WorkspaceForm isOpen={openForm} toggleForm={onToggleForm} />
            <Pannel>
              <PannelContainer>
                {workspaces &&
                  workspaces.length > 0 &&
                  workspaces.map((workspace: WorkspaceType, index: number) => (
                    <StyledLink
                      key={`${workspace.id}-${index}-${workspace.name}`}
                      to={`${match.url}/${workspace.id}`}
                    >
                      <ItemDisplay
                        itemHeader={workspace.name}
                        subItemsList={workspace.projects}
                      />
                    </StyledLink>
                  ))}
              </PannelContainer>
            </Pannel>
          </div>
        </Route>
        <Route path={`${match.path}/:workspaceId`} component={Workspace} />
      </Switch>
    </div>
  );
};

export default WorkspacesPage;
