import React, { useState, useEffect, useCallback } from "react";

import { Switch, Route } from "react-router-dom";

import LinearProgress from "@material-ui/core/LinearProgress";

import PageTitlebar from "../../comps/pagesTitlebar";
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

  const reloadWorkspaces = () => {
    setWorkspaces([]);
  };

  const getUserWorkspaces = useCallback(async () => {
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
  }, [workspaces]);

  useEffect(() => {
    getUserWorkspaces();
  }, [workspaces, openForm, getUserWorkspaces]);

  return (
    <div>
      <Switch>
        <Route exact path={`${match.path}`}>
          <div>
            <PageTitlebar title="Workspaces" toggleForm={onToggleForm} />
            {isLoadingWorkspaces && <LinearProgress />}
            {!isLoadingWorkspaces && workspaces.length < 1 && (
              <div>You do not have any Workspaces yet</div>
            )}
            {!isLoadingWorkspaces && fetchWorkspacesError && (
              <ErrorMessageDiv>{fetchWorkspacesError}</ErrorMessageDiv>
            )}
            {openForm && (
              <WorkspaceForm isOpen={openForm} toggleForm={onToggleForm} />
            )}
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
        <Route path={`${match.path}/:workspaceId`}>
          <Workspace reloadWorkspaces={reloadWorkspaces} />
        </Route>
      </Switch>
    </div>
  );
};

export default WorkspacesPage;
