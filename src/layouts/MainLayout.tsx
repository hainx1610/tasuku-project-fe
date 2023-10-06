import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

function MainLayout() {
  return (
    <div className=" flex flex-col h-screen">
      <MainHeader />
      <Outlet />
      <div className=" grow"></div>
      <MainFooter />
    </div>
  );
}

export default MainLayout;
