import React from "react";

import Authentication from "../authApi";

const Home = (props: any) => {
  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() => {
          Authentication.logOut().then(() => {
            if (!Authentication.isAuthenticated()) props.history.push("/login");
          });
        }}
      >
        LogOut
      </button>
    </div>
  );
};

export default Home;
