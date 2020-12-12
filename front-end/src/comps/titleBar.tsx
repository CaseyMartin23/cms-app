import React from "react";

import { useAuthedUserContext } from "../context/userAuthContext";
import { actionTypes } from "../context/reducer";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Titlebar: React.FC = () => {
  const { dispatch } = useAuthedUserContext();

  const onLogOut = () => {
    if (dispatch) {
      dispatch({ type: actionTypes.logout, payload: false });
      localStorage.removeItem("auth_user");
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography style={{ flexGrow: 1, textAlign: "left" }} variant="h6">
          CMS - Demo App
        </Typography>
        <Button color="inherit" onClick={onLogOut}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Titlebar;
