import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuth from "@/hooks/useAuth";
import { Separator } from "@/components/ui/separator";
import InvitationInput from "@/app/features/invitation/InvitationInput";

import { useDispatch, useSelector } from "react-redux";
import {
  getProjectsByUser,
  getSingleProject,
} from "@/app/features/project/projectSlice";
import TaskTable from "@/app/features/task/TaskTable";

import { columns, statusValue } from "@/app/features/task/taskColumns";
import { DataTable } from "@/components/ui/data-table";
import TaskInfoSheet from "@/app/features/task/TaskEditSheet";
import { Button } from "@/components/ui/button";
import TaskCreateSheet from "@/app/features/task/TaskCreateSheet";
import ProjectCreateForm from "@/app/features/project/ProjectCreateForm";
import LoadingScreen from "@/components/LoadingScreen";

import ProjectMemberList from "@/app/features/project/ProjectMemberList";
import { Sheet } from "@/components/ui/sheet";

function HomePage() {
  const { user } = useAuth();

  const userId = user!._id;

  const userRole = user ? user.role : undefined;

  const dispatch = useDispatch();

  // const { selectedProject } = useSelector((state) => state.project);
  const { projectsById, currentProjects, isLoading } = useSelector(
    (state) => state.project
  );

  // const userMemberOf = user ? user["memberOf"] : [];

  // console.log(selectedProject, "project?");

  useEffect(() => {
    if (userId) dispatch(getProjectsByUser(userId));
    // no userId the first time
  }, [dispatch, userId]);

  const projects = currentProjects.map((projectId) => projectsById[projectId]);

  return (
    <>
      <Tabs defaultValue="welcome" className="flex space-x-4">
        <TabsList className="flex flex-col h-screen">
          <TabsTrigger className="hidden" value="welcome">
            Welcome
          </TabsTrigger>
          {userRole === "manager" && (
            <TabsTrigger value="invite">Invite</TabsTrigger>
          )}

          <Separator className="my-3" />

          {isLoading ? (
            <LoadingScreen />
          ) : (
            projects.map((tabstrigger) => (
              <TabsTrigger
                value={tabstrigger.name}
                key={tabstrigger._id}
                onClick={async () =>
                  dispatch(getSingleProject(tabstrigger._id))
                }
              >
                {tabstrigger.name}
              </TabsTrigger>
            ))
          )}

          <Separator className="my-3" />
          {user!.role === "manager" && (
            <TabsTrigger value="create-project">+ New Project</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="welcome">
          <div className="p-6 ">
            <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Welcome back, {user!.name}.
            </h1>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Choose a project to view your tasks.
            </h4>
          </div>
        </TabsContent>

        <TabsContent value="invite">
          <InvitationInput />
        </TabsContent>

        {/* {userMemberOf.map((tabscontent) => ( */}
        {projects.map((tabscontent) => (
          <TabsContent
            value={tabscontent.name}
            key={tabscontent._id}
            className="flex flex-col  justify-start items-center space-y-5"
          >
            {tabscontent.description}
            {}
            <TaskTable
            // data={selectedProject ? selectedProject.includeTasks : []}
            />

            <div className="flex flex-col w-32 space-y-5">
              <TaskCreateSheet />
              <ProjectMemberList />
            </div>
          </TabsContent>
        ))}

        <TabsContent value="create-project">
          <ProjectCreateForm />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default HomePage;
