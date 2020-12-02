import React from "react";

import styled from "styled-components";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import DashboardIcon from "@material-ui/icons/Dashboard";
import WorkIcon from "@material-ui/icons/Work";
import FolderIcon from "@material-ui/icons/Folder";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";

import { StyledLink } from "./styledComps";

const StyledDrawer = styled.div`
  width: 230px;
  background-color: #2e3138;
`;

// const Divider = styled.hr`
//   height: 0;
//   border: 0;
//   border-top: 0.5px solid #5a5f6b;
// `;

const Drawer: React.FC = () => {
  return (
    <StyledDrawer>
      <List>
        <StyledLink to="/dashboard">
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </StyledLink>

        <StyledLink to="/dashboard/workspaces">
          <ListItem button>
            <ListItemIcon>
              <WorkIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Workspaces" />
          </ListItem>
        </StyledLink>

        <StyledLink to="/dashboard/projects">
          <ListItem button>
            <ListItemIcon>
              <FolderIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItem>
        </StyledLink>

        <StyledLink to="/dashboard/tickets">
          <ListItem button>
            <ListItemIcon>
              <ConfirmationNumberIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Tickets" />
          </ListItem>
        </StyledLink>
      </List>
    </StyledDrawer>
  );
};

export default Drawer;
