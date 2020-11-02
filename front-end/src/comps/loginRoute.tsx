import React from "react";
import { Route, Redirect } from "react-router-dom";

import { UserAuthContext } from "../userAuthContext";

const LoginRoute = (props: any) => {
  const { component: Component, authRedirect, ...rest } = props;
  const { isAuthenticated } = React.useContext(UserAuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export default LoginRoute;
