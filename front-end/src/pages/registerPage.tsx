import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { ErrorMessageDiv } from "../styledComps/styledComps";

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState();
  const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubmissionError(undefined);

    const target = event.target;
    const { name, value } = target;

    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionLoading(true);

    try {
      const resp = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(registerFormData),
      });
      const result = await resp.json();

      if (result) {
        setIsRegistered(result.registered);
      }

      setRegisterFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      setSubmissionError(result.error);
    } catch (err) {
      console.error(err);
    }

    setSubmissionLoading(false);
  };

  return (
    <div>
      {isRegistered ? <Redirect to="/login" /> : null}
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={onChangeHandle}
                autoComplete="fname"
                value={registerFormData.firstName}
                name="firstName"
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
                onChange={onChangeHandle}
                value={registerFormData.lastName}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChangeHandle}
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
                onChange={onChangeHandle}
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
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default RegisterPage;
