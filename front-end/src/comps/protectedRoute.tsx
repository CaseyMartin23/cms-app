import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuthedUserContext } from "../context/userAuthContext";

const ProtectedRoute = (props: any) => {
  const { component: Component, authRedirect, ...rest } = props;
  const { userData } = useAuthedUserContext();

  const isAuthenticated = () => {
    // console.log("ProtectedRoute-isAuthenticated-userData->", userData);
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
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

export default ProtectedRoute;
