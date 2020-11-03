import React from "react";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const TicketsPage = () => {
  return (
    <div>
      <Toolbar>
        <Typography style={{ flexGrow: 1, textAlign: "center" }} variant="h4">
          Tickets
        </Typography>
        <Button style={{ backgroundColor: "#3f51b5" }} color="inherit">
          Create Ticktet
        </Button>
      </Toolbar>
      <div></div>
    </div>
  );
};

export default TicketsPage;
