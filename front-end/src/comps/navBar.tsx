import React from "react";

import { UserAuthContext } from "../userAuthContext";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const NavBar: React.FC = () => {
  const { onLogout } = React.useContext(UserAuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography style={{ flexGrow: 1, textAlign: "left" }} variant="h6">
          CMS - Demo App
        </Typography>
        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
