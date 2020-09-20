import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import { Form, Field } from "react-final-form";

import {
  SignInBackground,
  FormBackground,
  FormInput,
  CheckboxWrapper,
  FormCheckbox,
} from "../styledComps/sharedComps";

type SignInPageProps = {};

const SignInPage: React.FC<SignInPageProps> = () => {
  const onSubmit = async (values: any) => {
    try {
      await fetch("/signin", {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res: any) => {
        // I dont like this it looks hackie :(
        if (res.url) {
          window.location = res.url;
        }
      });
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
                  <div style={{ margin: "10px" }}>
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
