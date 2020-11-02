import React from "react";

import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import MenuIcon from "@material-ui/icons/Menu";
import DashboardIcon from "@material-ui/icons/Dashboard";
import WorkIcon from "@material-ui/icons/Work";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";

import {
  StyledDrawer,
  DrawerToolbar,
  DrawerLink,
  Divider,
} from "./styledComps";

type DrawerPropsType = {
  toggleDrawer(): void;
  baseUrl: string;
};

const Drawer: React.FC<DrawerPropsType> = ({ toggleDrawer, baseUrl }) => {
  return (
    <StyledDrawer id="drawer">
      <DrawerToolbar>
        <IconButton onClick={toggleDrawer} edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
      </DrawerToolbar>

      <Divider />

      <List>
        <DrawerLink to={`${baseUrl}`}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </DrawerLink>

        <DrawerLink to={`${baseUrl}/workspaces`}>
          <ListItem button>
            <ListItemIcon>
              <WorkIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Workspaces" />
          </ListItem>
        </DrawerLink>

        <DrawerLink to={`${baseUrl}/projects`}>
          <ListItem button>
            <ListItemIcon>
              <AccountTreeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItem>
        </DrawerLink>

        <DrawerLink to={`${baseUrl}/tickets`}>
          <ListItem button>
            <ListItemIcon>
              <ConfirmationNumberIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Tickets" />
          </ListItem>
        </DrawerLink>
      </List>
    </StyledDrawer>
  );
};

export default Drawer;
