import styled from "styled-components";

import { Link } from "react-router-dom";

import EditIcon from "@material-ui/icons/Edit";

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
  height: 100%;
  overflow: auto;
`;

export const StyledDrawer = styled.div`
  width: 230px;
  background-color: #2e3138;
`;

export const StyledLink = styled(Link)`
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
  padding-left: 30px;
`;

export const PannelContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
`;

export const ItemContainer = styled.div`
  border: 1px solid blue;
  border-radius: 4px;
  padding: 10px 20px 20px;
  width: 300px;
  margin: 8px;
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

export const PaperBackground = styled.div`
  height: 100%;
  text-align: left;
`;

export const PaperHeader = styled.div`
  background-color: #6b6b6b;
  padding: 20px 30px;
  height: 130px;
  box-sizing: border-box;
`;

export const SpanInput = styled.input`
  font: inherit;
  color: inherit;
  text-align: inherit;
  padding: 0;
  background: none;
  border: none;
  height: 100%;
`;

export const EditableSpan = styled.span`
  padding-top: 9px;
  padding-bottom: 9px;
  width: 195px;
  height: 36px;
`;

export const HeaderFontStyle = styled.div`
  font-size: 2em;
  font-weight: bold;
`;
