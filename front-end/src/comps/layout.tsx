import React from "react";

import styled from "styled-components"

import Titlebar from "./titleBar";
import Drawer from "./drawer";

const MainContent = styled.div`
  width: 100%;
`;

const MainWindow = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const ContentDisplay = styled.div`
  height: 100%;
  overflow: auto;
`;

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
