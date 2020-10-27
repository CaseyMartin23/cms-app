import React from "react";

import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";

import { StyledDrawer } from "./styledComps";

type DrawerPropsType = {
  toggleDrawer(): void;
};

const Drawer: React.FC<DrawerPropsType> = ({ toggleDrawer }) => {
  return (
    <StyledDrawer id="drawer">
      <IconButton
        style={{ float: "right" }}
        onClick={toggleDrawer}
        color="inherit"
      >
        <CancelIcon />
      </IconButton>
    </StyledDrawer>
  );
};

export default Drawer;
