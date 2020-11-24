import styled from "styled-components";

import { Link } from "react-router-dom";

export const AppDiv = styled.div`
  display: grid;
  min-height: 100vh;
  text-align: center;
  color: white;
  align-items: center;
  justify-items: center;
`;

export const ErrorMessageDiv = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
  border: solid red 2px;
  border-radius: 4px;
  text-align: center;
  color: red;
`;

export const HomePageDiv = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const MainContent = styled.div`
  width: 100%;
`;

export const MainWindow = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const ContentDisplay = styled.div`
  overflow: auto;
  padding: 10px;
`;

export const StyledDrawer = styled.div`
  width: 250px;
  background-color: #2e3138;
`;

export const DrawerLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export const Divider = styled.hr`
  height: 0;
  border: 0;
  border-top: 0.5px solid #5a5f6b;
`;

export const Modal = styled.div`
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContent = styled.div`
  padding: 10px;
  margin: auto;
  background-color: #8c8c8c;
  border: 1px solid #8c8c8c;
  border-radius: 4px;
`;

export const FormLink = styled(Link)`
  color: #3f51b5;
  text-decoration: none;
  &:hover {
    text-decoration-line: underline;
  }
`;

export const Pannel = styled.div`
  display: grid;
`;

export const PannelContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  overflow: auto;
`;

export const ItemContainer = styled.div`
  border: 1px solid blue;
  border-radius: 4px;
  padding: 10px 20px 20px;
  width: 300px;
  margin: 5px;
`;

export const ItemContainerHeader = styled.div`
  text-align: left;
  margin-bottom: 5px;
  padding: 5px;
`;

export const ItemContainerArea = styled.div`
  height: 160px;
  overflow-y: auto;
  border: 1px solid #6b6b6b;
  border-radius: 4px;
  background-color: #6b6b6b;
`;
