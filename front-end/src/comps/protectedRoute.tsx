import React from "react";
import { Route, Redirect } from "react-router-dom";

import Authentication from "../authApi";

const ProtectedRoute = (props: any) => {
  const { component: Component, authRedirect, ...rest } = props;

  return (
    <Route
      {...rest}
      render={() =>
        Authentication.isAuthenticated() ? (
          <Component />
        ) : (
          <Redirect to={authRedirect} />
        )
      }
    />
  );
};

export default ProtectedRoute;
