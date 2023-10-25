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
import ProjectCreateForm from "@/app/features/project/ProjectCreateForm";
import InvitationInput from "@/app/features/invitation/InvitationInput";
import { ModeToggle } from "@/components/ui/mode-toggle";
import SideMenu from "./SideMenu";

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
      <Menubar className="flex justify-between border-none bg-secondary  rounded-none h-15 pt-2 z-50 ">
        <div className="flex justify-center space-x-2 items-center w-20 ml-1">
          {/* <Sheet>
            <SheetTrigger>
              <Menu size={30} />
            </SheetTrigger>
            <SheetContent
              side={"left"}
              className="flex flex-col md:w-[180px]  absolute top-16 bottom-16 h-[88.7vh] shadow-none w-screen"
            >
              {userRole === "manager" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"ghost"}>Invite</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create an invitation</DialogTitle>
                      <DialogDescription>
                        Invite someone to the app as an employee with limited
                        access.
                      </DialogDescription>
                    </DialogHeader>
                    <InvitationInput />
                  </DialogContent>
                </Dialog>
              )}
              <Separator />
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

              {userRole === "manager" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"ghost"}>+ New Project</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create a new project</DialogTitle>
                    </DialogHeader>
                    <ProjectCreateForm />
                  </DialogContent>
                </Dialog>
              )}
            </SheetContent>
          </Sheet> */}
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
