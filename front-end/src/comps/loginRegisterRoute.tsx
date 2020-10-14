import React from "react";
import { Route, Redirect } from "react-router-dom";
import Authentication from "../authApi";

const LoginRegisterRoute = (props: any) => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={() =>
        Authentication.isAuthenticated() ? <Redirect to="/" /> : <Component />
      }
    />
  );
};

export default LoginRegisterRoute;
