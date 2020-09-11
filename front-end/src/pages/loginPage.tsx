import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import styled from "styled-components";

const LoginBackground = styled.div`
  /* background-color: purple; */
  height: 100vh;
  width: 100vw;
`;

const FormBackground = styled(Paper)`
  margin: auto;
  max-width: 624.4px;
  width: 70vw;
`;

const LoginPage = () => {
  return (
    <LoginBackground id="login-background">
      <Container id="loginPaper">
        <Box p={5}>
          <FormBackground>
            <Box p={3}>
              <Avatar></Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form noValidate>
                <TextField
                  style={{ margin: "5px" }}
                  variant="outlined"
                  margin="normal"
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                />
                <TextField
                  style={{ margin: "5px" }}
                  variant="outlined"
                  margin="normal"
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button type="submit" variant="contained" color="primary">
                  Sign In
                </Button>
              </form>
            </Box>
          </FormBackground>
        </Box>
      </Container>
    </LoginBackground>
  );
};

export default LoginPage;
