import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import AlertMsg from "@/components/AlertMsg";

function MainLayout() {
  return (
    <div className=" flex flex-col h-screen">
      <MainHeader />
      <AlertMsg />
      <Outlet />
      <div className=" grow"></div>
      <MainFooter />
    </div>
  );
}

export default MainLayout;
