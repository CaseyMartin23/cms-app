import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

import { ErrorMessageDiv, FormLink } from "../comps/styledComps";

const RegisterPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState();
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

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(registerFormData),
      });
      const result = await response.json();

      if (result) {
        const { error, registered } = result;
        if (error) {
          setSubmissionLoading(false);
          setSubmissionError(error);
        }
        if (registered) {
          setSubmissionLoading(false);
          setIsRegistered(registered);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isRegistered) return <Redirect to="/dashboard" />;
  return (
    <div>
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
            {submissionError && (
              <ErrorMessageDiv>{submissionError}</ErrorMessageDiv>
            )}
          </Grid>
          <Button
            type="submit"
            style={{ marginTop: "15px", marginBottom: "15px" }}
            fullWidth
            variant="contained"
            color="primary"
            disabled={submissionLoading}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <FormLink to="/">Already have an account? Sign in</FormLink>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default RegisterPage;
