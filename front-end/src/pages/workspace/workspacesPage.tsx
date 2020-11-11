import React, { useState } from "react";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import ItemDisplay from "../../comps/itemDisplay";
import WorkspaceForm from "./workspacesForm";

import { Pannel, PannelContainer } from "../../comps/styledComps";

const WorkspacesPage = () => {
  const [openForm, setOpenForm] = useState(false);

  const onFormOpen = () => {
    setOpenForm(true);
  };

  const onFormClose = () => {
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
          <ItemDisplay
            itemHeader="Workspace's Name"
            subItemsList={[
              "project in workspace",
              "project in workspace",
              "project in workspace",
            ]}
          />
          <ItemDisplay
            itemHeader="Workspace's Name"
            subItemsList={[
              "project in workspace",
              "project in workspace",
              "project in workspace",
            ]}
          />
          <ItemDisplay
            itemHeader="Workspace's Name"
            subItemsList={[
              "project in workspace",
              "project in workspace",
              "project in workspace",
            ]}
          />
          <ItemDisplay
            itemHeader="Workspace's Name"
            subItemsList={[
              "project in workspace",
              "project in workspace",
              "project in workspace",
            ]}
          />
        </PannelContainer>
      </Pannel>
    </div>
  );
};

export default WorkspacesPage;
