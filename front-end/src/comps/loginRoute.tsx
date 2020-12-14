import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuthedUserContext } from "../context/userAuthContext";

const LoginRoute = (props: any) => {
  const { component: Component, authRedirect, ...rest } = props;
  const { userData } = useAuthedUserContext();

  const isAuthenticated = () => {
    if (
      (userData && !userData.user) ||
      (userData && userData.user && Object.keys(userData.user).length < 1)
    ) {
      return false;
    }

    return true;
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated() ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export default LoginRoute;
