import useAuth from "@/hooks/useAuth";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  // MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function MainHeader() {
  const { user, logout } = useAuth();

  // const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  const handleLogout = async () => {
    try {
      // handleMenuClose();
      if (!logout) throw new Error("oops");
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Menubar className="flex">
      <Logo />
      <div className="grow"></div>
      <MenubarMenu>
        <MenubarTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />

            <AvatarFallback>{user ? user["name"] : ""}</AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent>
          <div className="relative flex cursor-default  items-center rounded-sm px-2 py-1.5 text-sm outline-none ">
            {user ? user["name"] : ""}
          </div>
          <div className="relative flex cursor-default  items-center rounded-sm px-2 py-1.5 text-sm outline-none ">
            {user ? user["email"] : ""}
          </div>
          <MenubarSeparator />

          <RouterLink
            to="/account"
            onClick={(e) => {
              e.preventDefault();
              navigate("/account");
            }}
          >
            <MenubarItem>Profile</MenubarItem>
          </RouterLink>
          <MenubarSeparator />
          <MenubarItem onClick={handleLogout}>Logout</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export default MainHeader;
