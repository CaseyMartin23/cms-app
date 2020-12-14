import React, { useState, useEffect } from "react";

import { Switch, Route } from "react-router-dom";

import { addAuthHeaders } from "../../utils";

import LinearProgress from "@material-ui/core/LinearProgress";

import PageTitlebar from "../../comps/pagesTitlebar";
import ItemDisplay from "../../comps/itemDisplay";

import WorkspaceForm from "./workspacesForm";
import Workspace from "./workspace";

import {
  Pannel,
  PannelContainer,
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
  const { match, history } = props;

  const onToggleForm = () => {
    setOpenForm(!openForm);
  };

  const reloadWorkspaces = () => {
    setWorkspaces([]);
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
  }, [workspaces, openForm]);

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
                    <div
                      key={`${workspace.id}-${index}-${workspace.name}`}
                      onClick={() => {
                        history.push(`${match.url}/${workspace.id}`);
                      }}
                    >
                      <ItemDisplay
                        itemHeader={workspace.name}
                        subItemsList={workspace.projects}
                      />
                    </div>
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
