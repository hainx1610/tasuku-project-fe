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
import { BellDot, Bell, MoonStar } from "lucide-react";
import apiService from "@/app/apiService";

import NotificationsCard from "@/app/features/notification/NofificationsCard";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import HomePage from "@/pages/HomePage";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoadingScreen from "@/components/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsByUser } from "@/app/features/project/projectSlice";
import { Button } from "@/components/ui/button";

function MainHeader() {
  const { user, logout } = useAuth();
  const userId = user!._id;
  const userRole = user ? user.role : undefined;

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

  const dispatch = useDispatch();
  const { projectsById, currentProjects, isLoading } = useSelector(
    (state) => state.project
  );
  useEffect(() => {
    if (userId) dispatch(getProjectsByUser(userId));
    // no userId the first time
  }, [dispatch, userId]);
  const projects = currentProjects.map((projectId) => projectsById[projectId]);

  return (
    <>
      <Menubar className="flex justify-between border-none bg-slate-100 h-15 px-4">
        <div className="flex space-x-5">
          <Sheet>
            <SheetTrigger>
              <Menu size={30} />
            </SheetTrigger>
            <SheetContent side={"left"} className="flex flex-col">
              <div className="flex flex-col">
                {isLoading ? (
                  <LoadingScreen />
                ) : (
                  projects.map((project) => (
                    <Button
                      variant={"ghost"}
                      value={project.name}
                      key={project._id}
                      onClick={() => navigate(`/projects/${project._id}`)}
                    >
                      {project.name}
                    </Button>
                  ))
                )}
              </div>

              <Separator />

              <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </SheetContent>
          </Sheet>
          <Logo />
        </div>

        <div className="flex space-x-1 items-center">
          <div>
            <MoonStar />
          </div>
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
        </div>
      </Menubar>
      {/* <Separator className="mt-1" /> */}
    </>
  );
}

export default MainHeader;
