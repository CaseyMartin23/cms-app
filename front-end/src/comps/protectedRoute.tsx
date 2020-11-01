import React from "react";
import { Route, Redirect } from "react-router-dom";

import { UserAuthContext } from "../userAuthContext";

const ProtectedRoute = (props: any) => {
  const { component: Component, authRedirect, ...rest } = props;
  const { isAuthenticated } = React.useContext(UserAuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default ProtectedRoute;
