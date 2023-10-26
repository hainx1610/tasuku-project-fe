import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
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

import NotificationsCard from "@/app/features/notification/NofificationsCard";

import { ModeToggle } from "@/components/ui/mode-toggle";
import SideMenu from "./SideMenu";

function MainHeader() {
  const { user, logout } = useAuth();
  // const userId = user!._id;
  // const userRole = user ? user.role : undefined;

  const navigate = useNavigate();

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
    <>
      <Menubar className="flex justify-between border-none bg-secondary  rounded-none h-15 pt-2 z-50 ">
        <div className="flex justify-center space-x-2 items-center w-20 ml-1">
          <SideMenu />

          <ModeToggle />
        </div>

        <Logo />

        <div className="flex justify-center items-center w-20 mr-1">
          <MenubarMenu>
            <MenubarTrigger>
              {notifications.length ? (
                <BellDot className="fill-red-400" size={20} />
              ) : (
                <Bell size={20} />
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
              <Avatar className="w-7 h-7">
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
        </div>
      </Menubar>
      {/* <Separator className="mt-1" /> */}
    </>
  );
}

export default MainHeader;
