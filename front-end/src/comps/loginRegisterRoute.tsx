import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Authentication from "../authApi";

const LoginRegisterRoute = (props: any) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={() => {
        return Authentication.isAuthenticated() ? (
          <Redirect to="/" />
        ) : (
          <Component />
        );
      }}
    />
  );
};

export default LoginRegisterRoute;
