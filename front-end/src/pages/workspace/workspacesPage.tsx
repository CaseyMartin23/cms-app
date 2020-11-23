import React, { useState, useEffect, useContext } from "react";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import ItemDisplay from "../../comps/itemDisplay";
import WorkspaceForm from "./workspacesForm";

import { Pannel, PannelContainer } from "../../comps/styledComps";

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

const WorkspacesPage = () => {
  const [openForm, setOpenForm] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    getUserWorkspaces();
  }, [workspaces]);

  const compareUserWorkspacesEquality = (
    firstWorkspaces: WorkspaceType[],
    secondWorkspaces: WorkspaceType[]
  ) => {
    const firstWorkspaceJson = JSON.stringify(firstWorkspaces);
    const secondWorkspaceJson = JSON.stringify(secondWorkspaces);

    if (firstWorkspaceJson !== secondWorkspaceJson) return false;

    return true;
  };

  const getUserWorkspaces = async () => {
    try {
      const response = await fetch("/api/user-workspaces");
      const result = await response.json();

      if (!compareUserWorkspacesEquality(result, workspaces)) {
        setWorkspaces(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onFormOpen = () => {
    setOpenForm(true);
  };

  const onFormClose = () => {
    getUserWorkspaces();
    setOpenForm(false);
  };

  return (
    <div>
      <Toolbar>
        <Typography style={{ flexGrow: 1, textAlign: "center" }} variant="h4">
          Workspaces
        </Typography>
        <Button
          onClick={onFormOpen}
          style={{ backgroundColor: "#3f51b5" }}
          color="inherit"
        >
          Create Workspace
        </Button>
      </Toolbar>
      <WorkspaceForm isOpen={openForm} onClose={onFormClose} />
      <Pannel>
        <PannelContainer>
          {/* {workspaces && workspaces.length < 1
            ? "No Workspaces"
            : workspaces &&
              workspaces.map((workspace: WorkspaceType, index: number) => (
                <ItemDisplay
                  key={`${workspace.id}-${index}-${workspace.name}`}
                  itemHeader={workspace.name}
                  subItemsList={workspace.projects}
                />
              ))} */}
          <ItemDisplay
            // key={`${workspace.id}-${index}-${workspace.name}`}
            itemHeader="{workspace.name}"
            subItemsList={[
              { id: 1, name: "projects" },
              { id: 1, name: "projects" },
            ]}
          />
          <ItemDisplay
            // key={`${workspace.id}-${index}-${workspace.name}`}
            itemHeader="{workspace.name}"
            subItemsList={[{ id: 1, name: "projects" }]}
          />
          <ItemDisplay
            // key={`${workspace.id}-${index}-${workspace.name}`}
            itemHeader="{workspace.name}"
            subItemsList={[{ id: 1, name: "projects" }]}
          />
          <ItemDisplay
            // key={`${workspace.id}-${index}-${workspace.name}`}
            itemHeader="{workspace.name}"
            subItemsList={[{ id: 1, name: "projects" }]}
          />
          <ItemDisplay
            // key={`${workspace.id}-${index}-${workspace.name}`}
            itemHeader="{workspace.name}"
            subItemsList={[{ id: 1, name: "projects" }]}
          />
          <ItemDisplay
            // key={`${workspace.id}-${index}-${workspace.name}`}
            itemHeader="{workspace.name}"
            subItemsList={[{ id: 1, name: "projects" }]}
          />
          <ItemDisplay
            // key={`${workspace.id}-${index}-${workspace.name}`}
            itemHeader="{workspace.name}"
            subItemsList={[{ id: 1, name: "projects" }]}
          />
          <ItemDisplay
            // key={`${workspace.id}-${index}-${workspace.name}`}
            itemHeader="{workspace.name}"
            subItemsList={[{ id: 1, name: "projects" }]}
          />
          <ItemDisplay
            // key={`${workspace.id}-${index}-${workspace.name}`}
            itemHeader="{workspace.name}"
            subItemsList={[{ id: 1, name: "projects" }]}
          />
          <ItemDisplay
            // key={`${workspace.id}-${index}-${workspace.name}`}
            itemHeader="{workspace.name}"
            subItemsList={[{ id: 1, name: "projects" }]}
          />
          <ItemDisplay
            // key={`${workspace.id}-${index}-${workspace.name}`}
            itemHeader="{workspace.name}"
            subItemsList={[{ id: 1, name: "projects" }]}
          />
          <ItemDisplay
            // key={`${workspace.id}-${index}-${workspace.name}`}
            itemHeader="{workspace.name}"
            subItemsList={[{ id: 1, name: "projects" }]}
          />
          <ItemDisplay
            // key={`${workspace.id}-${index}-${workspace.name}`}
            itemHeader="{workspace.name}"
            subItemsList={[{ id: 1, name: "projects" }]}
          />
          <ItemDisplay
            // key={`${workspace.id}-${index}-${workspace.name}`}
            itemHeader="{workspace.name}"
            subItemsList={[{ id: 1, name: "projects" }]}
          />
          <ItemDisplay
            // key={`${workspace.id}-${index}-${workspace.name}`}
            itemHeader="{workspace.name}"
            subItemsList={[{ id: 1, name: "projects" }]}
          />
          <ItemDisplay
            // key={`${workspace.id}-${index}-${workspace.name}`}
            itemHeader="{workspace.name}"
            subItemsList={[{ id: 1, name: "projects" }]}
          />
        </PannelContainer>
      </Pannel>
    </div>
  );
};

export default WorkspacesPage;
