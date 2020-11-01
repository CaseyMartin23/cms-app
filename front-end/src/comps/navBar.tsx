import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import MenuIcon from "@material-ui/icons/Menu";

type NavBarPropsType = {
  toggleDrawer(): void;
  onLogout(): void;
};

const NavBar: React.FC<NavBarPropsType> = ({ toggleDrawer, onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={toggleDrawer} edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
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