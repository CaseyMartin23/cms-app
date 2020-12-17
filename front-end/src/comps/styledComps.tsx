import styled from "styled-components";

import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

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

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export const FormDiv = styled.div`
  background-color: #6b6b6b;
  padding: 20px;
  border: 1px solid #6b6b6b;
  border-radius: 5px;
`;

export const FormLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration-line: underline;
  }
`;

export const Pannel = styled.div`
  display: grid;
  padding-left: 30px;
  padding-right: 40px;
  padding-top: 30px;
`;

export const PannelContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
`;

export const PaperBackground = styled.div`
  height: 100%;
  text-align: left;
`;

export const StyledButton = styled(Button)`
  box-shadow: none;
  &:hover {
    box-shadow: none;
  }
  &:focus {
    box-shadow: none;
  }
`;
