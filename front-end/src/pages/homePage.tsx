import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { UserAuthContext } from "../userAuthContext";

const Home = () => {
  const { isAuthed, setIsAuthed } = React.useContext(UserAuthContext);
  const onLogOut = async () => {
    try {
      const response = await fetch("/api/logout");
      const result = await response.json();

      if (result) {
        console.log("onLogOut-result->", result);
        if (setIsAuthed) setIsAuthed(!result.loggedOut);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthed) return <Redirect to="/login" />;
  return (
    <div>
      <h1>Home</h1>
      <button onClick={onLogOut}>LogOut</button>
    </div>
  );
};

export default Home;
