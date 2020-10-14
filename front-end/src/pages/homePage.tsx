import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Authentication from "../authApi";

const Home = () => {
  const [redirectToAuth, setRedirectToAuth] = useState(false);

  const onLogOut = () => {
    Authentication.logOut();
    setRedirectToAuth(!redirectToAuth);
  };

  if (redirectToAuth) return <Redirect to="/login" />;
  return (
    <div>
      <h1>Home</h1>
      <button onClick={onLogOut}>LogOut</button>
      <a href="/login">Login</a>
    </div>
  );
};

export default Home;
