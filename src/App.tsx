import React from "react";
// import { useState } from "react";
// // import reactLogo from "./assets/react.svg";
// // import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
