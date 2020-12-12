import React, { useState } from "react";

import { Redirect } from "react-router-dom";

import { useAuthedUserContext } from "../context/userAuthContext";
import { actionTypes } from "../context/reducer";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

import { ErrorMessageDiv, FormLink } from "../comps/styledComps";

const LoginPage = () => {
  const { dispatch } = useAuthedUserContext();
  const [redirect, setRedirect] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const { name, value } = target;

    setSubmissionError(undefined);

    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionLoading(true);

    try {
      if (dispatch) {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(loginFormData),
        });
        const result = await response.json();

        if (result) {
          const { success, msg, auth_user } = result;
          if (!success && msg) {
            setSubmissionLoading(false);
            setSubmissionError(msg);
          }
          if (success && auth_user) {
            setSubmissionLoading(false);
            setRedirect(true);
            dispatch({ type: actionTypes.login_success, payload: auth_user });
            localStorage.setItem("auth_user", JSON.stringify(auth_user));
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (redirect) return <Redirect to="/dashboard" />;
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={onSubmitHandler}>
          <TextField
            color="primary"
            onChange={onChangeHandler}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={onChangeHandler}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          {submissionError && (
            <ErrorMessageDiv>{submissionError}</ErrorMessageDiv>
          )}
          <Button
            type="submit"
            style={{ marginTop: "15px", marginBottom: "15px" }}
            fullWidth
            variant="contained"
            color="primary"
            disabled={submissionLoading}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <FormLink to="/register">Don't have an account? Sign Up</FormLink>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default LoginPage;
