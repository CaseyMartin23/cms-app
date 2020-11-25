import React from "react";

import Titlebar from "./titleBar";
import Drawer from "./drawer";

import { MainWindow, MainContent, ContentDisplay } from "./styledComps";

const Layout: React.FC = ({ children }) => {
  return (
    <MainWindow>
      <Drawer />
      <MainContent>
        <ContentDisplay>
          <Titlebar />
          {children}
        </ContentDisplay>
      </MainContent>
    </MainWindow>
  );
};

export default Layout;
