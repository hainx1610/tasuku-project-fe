import Logo from "../components/Logo";

import { Outlet } from "react-router-dom";

function BlankLayout() {
  return (
    <div className=" flex flex-col justify-center items-center min-h-screen space-y-5">
      <Logo />

      <Outlet />
    </div>
  );
}

export default BlankLayout;
