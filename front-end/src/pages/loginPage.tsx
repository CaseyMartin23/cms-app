import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Authentication from "../authApi";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { ErrorMessageDiv } from "../styledComps/styledComps";

const LoginPage = () => {
  const [isAuthed, setIsAuthed] = useState(false);
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

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionLoading(true);

    Authentication.logIn(loginFormData, setSubmissionError).then(() => {
      setIsAuthed(Authentication.isAuthenticated());
    });

    setSubmissionLoading(false);
  };

  if (isAuthed) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={onSubmitHandler}>
          <TextField
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
            fullWidth
            variant="contained"
            color="primary"
            disabled={submissionLoading}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/recovery" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default LoginPage;
