import React from "react";
import { Route, Redirect } from "react-router-dom";

import { UserAuthContext } from "../userAuthContext";

const LoginRegisterRoute = (props: any) => {
  const { component: Component, ...rest } = props;
  const { isAuthed } = React.useContext(UserAuthContext);

  console.log("LoginRegisterRoute-isAuthed->", isAuthed);

  return (
    <Route
      {...rest}
      render={() => (isAuthed ? <Redirect to="/" /> : <Component />)}
    />
  );
};

export default LoginRegisterRoute;
