import Logo from "../components/Logo";
import React from "react";
import { Outlet } from "react-router-dom";

function BlankLayout() {
  return (
    <div className=" flex flex-col justify-center items-center min-h-screen">
      <Logo />

      <Outlet />
    </div>
  );
}

export default BlankLayout;
