import React from "react";

import NavBar from "./navBar";
import Drawer from "./drawer";

import { MainWindow, MainContent, ContentDisplay } from "./styledComps";

const Layout: React.FC = ({ children }) => {
  return (
    <MainWindow>
      <Drawer />
      <MainContent>
        <NavBar />
        <ContentDisplay>{children}</ContentDisplay>
      </MainContent>
    </MainWindow>
  );
};

export default Layout;
