import React from "react";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { Pannel } from "../comps/styledComps";

const WorkspacesPage = () => {
  return (
    <div>
      <Toolbar>
        <Typography style={{ flexGrow: 1, textAlign: "center" }} variant="h4">
          Workspaces
        </Typography>
        <Button style={{ backgroundColor: "#3f51b5" }} color="inherit">
          Create Workspace
        </Button>
      </Toolbar>
      <Pannel></Pannel>
    </div>
  );
};

export default WorkspacesPage;
