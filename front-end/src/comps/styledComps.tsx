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

export const StyledDrawer = styled.div`
  height: 100vh;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: 0.5s;
  background-color: #2e3138;
`;

export const DrawerToolbar = styled.div`
  display: flex;
  padding-top: 8px;
  padding-left: 24px;
  padding-right: 24px;
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

export const FormLink = styled(Link)`
  color: #3f51b5;
  text-decoration: none;
  &:hover {
    text-decoration-line: underline;
  }
`;

export const Pannel = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
`;

export const ItemContainer = styled.div`
  border: 1px solid blue;
  border-radius: 4px;
  padding: 10px 20px;
`;
