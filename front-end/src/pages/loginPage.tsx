import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { ErrorMessageDiv } from "../styledComps/styledComps";

type LoginFormDataType = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState();
  const [loginFormData, setLoginFormData] = useState<LoginFormDataType>({
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
      const resp = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(loginFormData),
      });
      console.log("resp->", resp);
      const result = await resp.json();
      console.log("result->", result);

      if (result) {
        if (result.error) {
          setSubmissionError(result.error);
        }
        setIsLoggedIn(result.loggedIn);
      }
    } catch (err) {
      console.error(err);
    }

    setSubmissionLoading(false);
  };

  return (
    <div>
      {isLoggedIn ? <Redirect to="/" /> : null}
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
