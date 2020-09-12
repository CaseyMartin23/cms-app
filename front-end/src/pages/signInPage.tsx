import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { Form, Field } from "react-final-form";

import styled from "styled-components";

const SignInBackground = styled.div`
  height: 100vh;
  width: 100vw;
`;

const FormBackground = styled(Paper)`
  max-width: 624.4px;
  width: 70vw;
  margin: auto;
  margin-top: 20vh;
  padding: 10px;
`;

const FormInput = styled.input`
  max-width: 250px;
  height: 54px;
  width: 50vw;
  margin: 4px;
`;

const FormCheckbox = styled(Field)`
  margin: 5px;
  vertical-align: middle;
`;

const CheckboxWrapper = styled.label`
  margin: 30px 20px;
`;

type SignInPageProps = {};

const SignInPage: React.FC<SignInPageProps> = () => {
  const onSubmit = async (values: any) => {
    try {
      await fetch("/signIn", {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res: any) => {
        window.location = res.url;
      });
      console.log("values->>", values);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SignInBackground id="login-background">
      <Container id="loginPaper">
        <Box p={5}>
          <FormBackground id="form-background">
            <Avatar></Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Field name="email">
                    {(props: any) => (
                      <FormInput
                        type="email"
                        id="email"
                        placeholder="Email"
                        required
                        {...props.input}
                      />
                    )}
                  </Field>
                  <Field name="password">
                    {(props: any) => (
                      <FormInput
                        type="password"
                        id="password"
                        placeholder="Password"
                        required
                        {...props.input}
                      />
                    )}
                  </Field>
                  <div>
                    <CheckboxWrapper>
                      <FormCheckbox
                        id="remember_me"
                        component="input"
                        type="checkbox"
                        name="remember_me"
                      />
                      Remember me?
                    </CheckboxWrapper>
                    <Button type="submit" variant="contained" color="primary">
                      Sign In
                    </Button>
                  </div>
                </form>
              )}
            />
          </FormBackground>
        </Box>
      </Container>
    </SignInBackground>
  );
};

export default SignInPage;
