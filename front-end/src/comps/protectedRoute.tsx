import React from "react";
import { Route, Redirect } from "react-router-dom";

import { UserAuthContext } from "../userAuthContext";

const ProtectedRoute = (props: any) => {
  const { component: Component, authRedirect, ...rest } = props;
  const isAuthed = React.useContext(UserAuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthed ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default ProtectedRoute;
