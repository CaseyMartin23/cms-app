import React from "react";
import { Route, Redirect } from "react-router-dom";

import { UserAuthContext } from "../userAuthContext";

const ProtectedRoute = (props: any) => {
  const { component: Component, authRedirect, ...rest } = props;
  const isAuthed = React.useContext(UserAuthContext);

  return (
    <Route
      {...rest}
      render={() => {
        return isAuthed ? <Component /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default ProtectedRoute;
