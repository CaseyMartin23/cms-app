import React, { useState, useEffect } from "react";

import {
  Switch,
  Route,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";

import { addAuthHeaders, arrayOfObjectsAreEqual } from "../../utils";

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

import PageTitlebar from "../../comps/pagesTitlebar";
import ItemDisplay from "../../comps/itemDisplay";
import DeleteItemForm from "../../comps/deleteItemForm";

import WorkspaceForm from "./workspacesForm";
import Workspace from "./workspace";

import {
  Pannel,
  PannelContainer,
  ErrorMessageDiv,
  ItemDiv,
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

const WorkspacesPage: React.FC<RouteComponentProps> = ({ match, history }) => {
  const [isWorkspaceFormOpen, setIsWorkspaceFormOpen] = useState(false);
  const [isDeleteFormOpen, setIsDeleteFormOpen] = useState(false);
  const [isLoadingWorkspaces, setIsLoadingWorkspaces] = useState(false);
  const [fetchWorkspacesError, setFetchWorkspacesError] = useState<
    string | undefined
  >();
  const [workspaceToDelete, setWorkspaceToDelete] = useState<number>();
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([]);

  const onWorkspaceFormToggle = () => {
    setIsWorkspaceFormOpen(!isWorkspaceFormOpen);
  };

  const onDeleteFormToggle = (workspaceId?: number) => {
    setIsDeleteFormOpen(!isDeleteFormOpen);
    setWorkspaceToDelete(workspaceId);
  };

  const onWorkspaceDelete = async () => {
    try {
      if (workspaceToDelete) {
        const response = await fetch(
          `/api/delete-workspace/${workspaceToDelete}`,
          {
            method: "DELETE",
            headers: addAuthHeaders(),
          }
        );
        const result = await response.json();

        if (result && result.success) reloadWorkspaces();
      }
    } catch (err) {
      console.error(err);
    }
    onDeleteFormToggle();
  };

  const reloadWorkspaces = () => {
    setWorkspaces([]);
  };

  const goToProject = (id: string | number) => {
    console.log("goToRoute-id->", id);
    history.push(`/dashboard/projects/${id}`);
  };

  useEffect(() => {
    const getUserWorkspaces = async () => {
      setIsLoadingWorkspaces(true);
      try {
        const response = await fetch("/api/user-workspaces", {
          headers: addAuthHeaders(),
        });
        const result = await response.json();

        if (result) {
          const { success, msg, userWorkspaces } = result;

          if (
            success &&
            userWorkspaces &&
            !arrayOfObjectsAreEqual(userWorkspaces, workspaces)
          ) {
            setWorkspaces(userWorkspaces);
          }
          if (!success && msg) {
            setFetchWorkspacesError(msg);
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
  }, [workspaces, isWorkspaceFormOpen]);

  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <div>
          <PageTitlebar title="Workspaces" toggleForm={onWorkspaceFormToggle} />
          {isLoadingWorkspaces && <LinearProgress />}
          <WorkspaceForm
            isOpen={isWorkspaceFormOpen}
            toggleForm={onWorkspaceFormToggle}
          />
          {isDeleteFormOpen && (
            <DeleteItemForm
              isFormOpen={isDeleteFormOpen}
              onDeleteItem={onWorkspaceDelete}
              onToggleForm={onDeleteFormToggle}
              title="Are you sure you want to DELETE this Workspace and ALL it's contents?"
            />
          )}
          <Pannel>
            <PannelContainer>
              {!isLoadingWorkspaces && fetchWorkspacesError && (
                <ErrorMessageDiv>{fetchWorkspacesError}</ErrorMessageDiv>
              )}
              {!isLoadingWorkspaces &&
                !fetchWorkspacesError &&
                workspaces.length < 1 && (
                  <div style={{ width: "100%" }}>
                    <Typography variant="h6">
                      You do not have any Workspaces yet
                    </Typography>
                  </div>
                )}
              {workspaces &&
                workspaces.length > 0 &&
                workspaces.map((workspace: WorkspaceType, index: number) => (
                  <ItemDiv
                    key={`${workspace.id}-${index}-${workspace.name}`}
                    onClick={() => {
                      history.push(`${match.url}/${workspace.id}`);
                    }}
                  >
                    <ItemDisplay
                      type="Workspace"
                      itemHeader={workspace.name}
                      subItemsList={workspace.projects}
                      goToSubItem={goToProject}
                      options={[
                        {
                          optionTitle: "Delete Workspace",
                          optionFunction: () => {
                            onDeleteFormToggle(workspace.id);
                          },
                        },
                      ]}
                    />
                  </ItemDiv>
                ))}
            </PannelContainer>
          </Pannel>
        </div>
      </Route>
      <Route path={`${match.path}/:workspaceId`}>
        <Workspace reloadWorkspaces={reloadWorkspaces} />
      </Route>
    </Switch>
  );
};

export default withRouter(WorkspacesPage);
