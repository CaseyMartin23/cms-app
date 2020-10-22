import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { UserAuthContext } from "../userAuthContext";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import MenuIcon from "@material-ui/icons/Menu";
import CancelIcon from "@material-ui/icons/Cancel";

import { DashboardDiv, Drawer } from "../comps/styledComps";

const Dashboard = () => {
  const { isAuthed, setIsAuthed } = React.useContext(UserAuthContext);
  const drawerElement = React.useRef(null);

  const onLogout = async () => {
    try {
      const response = await fetch("/api/logout");
      const result = await response.json();

      if (result) {
        if (setIsAuthed) setIsAuthed(!result.loggedOut);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDrawer = () => {};

  if (!isAuthed) return <Redirect to="/login" />;
  return (
    <DashboardDiv>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{ flexGrow: 1, textAlign: "left" }} variant="h6">
            Dashboard
          </Typography>
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer>
        <IconButton>
          <CancelIcon />
        </IconButton>
      </Drawer>
      <h1>Home</h1>
    </DashboardDiv>
  );
};

export default Dashboard;
