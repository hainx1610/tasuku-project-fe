import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

function MainLayout() {
  return (
    <div>
      <MainHeader />
      <Outlet />
      <MainFooter />
    </div>
  );
}

export default MainLayout;
