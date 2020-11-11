import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import DashboardIcon from "@material-ui/icons/Dashboard";
import WorkIcon from "@material-ui/icons/Work";
import FolderIcon from "@material-ui/icons/Folder";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";

import { StyledDrawer, DrawerLink } from "./styledComps";

const Drawer: React.FC = () => {
  return (
    <StyledDrawer>
      <List>
        <DrawerLink to="/dashboard">
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </DrawerLink>

        <DrawerLink to="/dashboard/workspaces">
          <ListItem button>
            <ListItemIcon>
              <WorkIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Workspaces" />
          </ListItem>
        </DrawerLink>

        <DrawerLink to="/dashboard/projects">
          <ListItem button>
            <ListItemIcon>
              <FolderIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItem>
        </DrawerLink>

        <DrawerLink to="/dashboard/tickets">
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
