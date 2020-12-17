import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

import {
  ErrorMessageDiv,
  FormDiv,
  FormLink,
  StyledButton,
} from "../comps/styledComps";

const RegisterPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState<
    string | Error | undefined
  >();
  const [verifyPassword, setVerifyPassword] = useState("");
  const [registerFormData, setRegisterFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubmissionError(undefined);

    const target = event.target;
    const { name, value } = target;

    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  const onVerifyPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const verifingPassword = event.target.value;
    if (verifingPassword !== registerFormData.password) {
      setSubmissionError("Passwords do not match!");
    } else {
      setSubmissionError(undefined);
    }
    setVerifyPassword(verifingPassword);
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionLoading(true);

    try {
      if (verifyPassword !== registerFormData.password) {
        setSubmissionError("Passwords do not match!");
        setSubmissionLoading(false);
        return;
      }
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(registerFormData),
      });
      const result = await response.json();

      if (result) {
        const { msg, success } = result;
        if (msg) {
          setSubmissionLoading(false);
          setSubmissionError(msg);
        }
        if (success) {
          setSubmissionLoading(false);
          setIsRegistered(success);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isRegistered) return <Redirect to="/" />;
  return (
    <FormDiv>
      <Container component="main" maxWidth="xs">
        <Typography style={{ padding: "5px" }} component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={onChangeHandler}
                autoComplete="fname"
                value={registerFormData.first_name}
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={onChangeHandler}
                value={registerFormData.last_name}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChangeHandler}
                value={registerFormData.email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChangeHandler}
                value={registerFormData.password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onVerifyPasswordChange}
                value={verifyPassword}
                variant="outlined"
                required
                fullWidth
                name="verify_password"
                label="Verify Password"
                type="password"
                id="verify_password"
                autoComplete="current-password"
              />
            </Grid>
            {submissionError && (
              <ErrorMessageDiv>{submissionError}</ErrorMessageDiv>
            )}
          </Grid>
          <StyledButton
            type="submit"
            style={{ marginTop: "15px", marginBottom: "15px" }}
            fullWidth
            variant="contained"
            color="primary"
            disabled={submissionLoading}
          >
            Sign Up
          </StyledButton>
          <Grid container justify="flex-end">
            <Grid item>
              <FormLink to="/">Already have an account? Sign in</FormLink>
            </Grid>
          </Grid>
        </form>
      </Container>
    </FormDiv>
  );
};

export default RegisterPage;
