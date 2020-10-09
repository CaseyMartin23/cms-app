import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props: any) => {
  const { Component, authRedirect, ...rest } = props;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    isUserAuthed().then(() => {
      console.log("isAuthenticated->", isAuthenticated);
    });
  }, [isAuthenticated]);

  const isUserAuthed = async () => {
    try {
      const resp = await fetch("/api/isAuthed");
      console.log("resp->", resp);
      const result = await resp.json();

      if (result) {
        setIsAuthenticated(result.isAuthed);
        console.log("result->", result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? <Component /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
