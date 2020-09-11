import React from "react";
import LoginPage from "./pages/loginPage";
import styled from "styled-components";

const AppBackground = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  color: white;
  text-align: center;
  width: 100%;
  padding: 0;
`;

function App() {
  return (
    <AppBackground id="App">
      <LoginPage />
    </AppBackground>
  );
}

export default App;
