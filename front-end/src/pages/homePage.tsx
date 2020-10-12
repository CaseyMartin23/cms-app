import React from "react";

import Authentication from "../authApi";

const Home = (props: any) => {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => Authentication.logOut(props)}>LogOut</button>
    </div>
  );
};

export default Home;
