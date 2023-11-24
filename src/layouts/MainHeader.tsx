import useAuth from "@/hooks/useAuth";

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

import { ModeToggle } from "@/components/ui/mode-toggle";
import SideMenu from "./SideMenu";

import NotificationsBell from "@/app/features/notification/NotificationsBell";

function MainHeader() {
  const { user, logout } = useAuth();
  // const userId = user!._id;
  // const userRole = user ? user.role : undefined;

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // handleMenuClose();
      if (!logout) throw new Error("Logout func undefined");
      await logout(() => {
        // navigate("/");
        navigate("/login");
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Menubar className="flex justify-between border-none bg-secondary  rounded-none h-15 pt-2 z-50 fixed w-screen ">
        <div className="flex justify-center space-x-2 items-center w-24 pl-2">
          <SideMenu />

          <ModeToggle />
        </div>

        <Logo />

        <div className="flex justify-center items-center w-24 mr-1 pr-2">
          {/* <NotificationsMenu /> */}
          <NotificationsBell />

          <MenubarMenu>
            <MenubarTrigger>
              <Avatar className="w-7 h-7 hover:cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />

                <AvatarFallback>{user ? user["name"] : ""}</AvatarFallback>
              </Avatar>
            </MenubarTrigger>
            <MenubarContent>
              <div className="relative flex cursor-default  items-center rounded-sm px-2 py-1.5 text-sm outline-none  ">
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
