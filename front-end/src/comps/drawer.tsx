import React from "react";

import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";

import {
  StyledDrawer,
  DrawerToolbar,
  DrawerItem,
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
        <IconButton onClick={toggleDrawer} color="inherit">
          <CancelIcon />
        </IconButton>
      </DrawerToolbar>
      <Divider />
      <DrawerItem to={`${baseUrl}`}>Dashboard</DrawerItem>
      <DrawerItem to={`${baseUrl}/workspaces`}>Workspaces</DrawerItem>
      <DrawerItem to={`${baseUrl}/projects`}>Projects</DrawerItem>
      <DrawerItem to={`${baseUrl}/tickets`}>Tickets</DrawerItem>
    </StyledDrawer>
  );
};

export default Drawer;
