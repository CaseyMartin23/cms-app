import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { UserAuthContext } from "../userAuthContext";

import NavBar from "../comps/navBar";
import Drawer from "../comps/drawer";

import { DashboardDiv } from "../comps/styledComps";

const Dashboard = () => {
  const { isAuthed, setIsAuthed } = React.useContext(UserAuthContext);
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleDrawer = () => {
    const drawerElement = document.getElementById("drawer");

    if (drawerElement) {
      if (!isOpen) {
        drawerElement.style.width = "300px";
        setIsOpen(!isOpen);
      }
      if (isOpen) {
        drawerElement.style.width = "0px";
        setIsOpen(!isOpen);
      }
    }
  };

  if (!isAuthed) return <Redirect to="/login" />;
  return (
    <DashboardDiv>
      <NavBar toggleDrawer={toggleDrawer} onLogout={onLogout} />
      <Drawer toggleDrawer={toggleDrawer} />

      <h1>Home</h1>
    </DashboardDiv>
  );
};

export default Dashboard;
