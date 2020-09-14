import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import { Field } from "react-final-form";

export const SignInBackground = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const FormBackground = styled(Paper)`
  max-width: 624.4px;
  width: 70vw;
  margin: auto;
  margin-top: 20vh;
  padding: 10px;
`;

export const FormInput = styled.input`
  max-width: 250px;
  height: 54px;
  width: 50vw;
  margin: 4px;
`;

export const FormCheckbox = styled(Field)`
  margin: 5px;
  vertical-align: middle;
`;

export const CheckboxWrapper = styled.label`
  margin: 30px 20px;
`;
