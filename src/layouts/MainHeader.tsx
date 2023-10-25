import useAuth from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
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
import { BellDot, Bell } from "lucide-react";
import apiService from "@/app/apiService";
import { Card } from "@/components/ui/card";
import NotificationsCard from "@/app/features/notification/NofificationsCard";

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

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      const response = await apiService.get(
        `/notifications/users/${user?._id}`
      );
      console.log(response.data.data, "response");
      setNotifications(response.data.data);
    };
    getNotifications();
  }, [user]);

  const handleLogout = async () => {
    try {
      // handleMenuClose();
      if (!logout) throw new Error("Logout func undefined");
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
          {notifications.length ? (
            <BellDot className="fill-red-400" />
          ) : (
            <Bell />
          )}
        </MenubarTrigger>
        <MenubarContent>
          {notifications.length ? (
            <NotificationsCard notifications={notifications} />
          ) : (
            <span>No notifications at the moment.</span>
          )}
        </MenubarContent>
      </MenubarMenu>

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
            <MenubarItem>Account</MenubarItem>
          </RouterLink>
          <MenubarSeparator />
          <MenubarItem onClick={handleLogout}>Logout</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export default MainHeader;
