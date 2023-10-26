// @ts-nocheck
import useAuth from "@/hooks/useAuth";
import React, { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  // SheetHeader,
  // SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

function SideMenu() {
  const { user } = useAuth();
  const userId = user!._id;
  const userRole = user ? user.role : undefined;

  // const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();

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
    <Sheet>
      <SheetTrigger>
        <Menu size={30} />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="flex flex-col md:w-[160px] bg-slate-500 shadow-none w-screen mt-[33px] h-[95vh] z-40"
      >
        {userRole === "manager" && (
          <>
            <Dialog>
              <DialogTrigger asChild className="mt-5">
                <Button variant={"ghost"}>Invite</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create an invitation</DialogTitle>
                  <DialogDescription>
                    Invite someone to the app as an employee with limited
                    access. The process can take several minutes.
                  </DialogDescription>
                </DialogHeader>
                <InvitationInput />
              </DialogContent>
            </Dialog>
            <Separator className="bg-primary" />
          </>
        )}
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
    </Sheet>
  );
}

export default SideMenu;
