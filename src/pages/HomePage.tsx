import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuth from "@/hooks/useAuth";
import { Separator } from "@/components/ui/separator";
import InvitationInput from "@/app/features/invitation/InvitationInput";

import { useDispatch, useSelector } from "react-redux";
import {
  getProjectsByUser,
  getSingleProject,
} from "@/app/features/project/projectSlice";
import TaskTable from "@/app/features/task/taskTable";

import { columns, statusValue } from "@/app/features/task/taskColumns";
import { DataTable } from "@/components/ui/data-table";
import TaskInfoSheet from "@/app/features/task/TaskEditSheet";
import { Button } from "@/components/ui/button";
import TaskCreateSheet from "@/app/features/task/TaskCreateSheet";
import ProjectCreateForm from "@/app/features/project/ProjectCreateForm";
import LoadingScreen from "@/components/LoadingScreen";

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

          <TabsTrigger value="create-project">+ New Project</TabsTrigger>
        </TabsList>

        <TabsContent value="welcome">
          <div>
            Welcome back, {user!.name}. Choose a project to view your tasks.
          </div>
        </TabsContent>

        <TabsContent value="invite">
          <InvitationInput />
        </TabsContent>

        {/* {userMemberOf.map((tabscontent) => ( */}
        {projects.map((tabscontent) => (
          <TabsContent value={tabscontent.name} key={tabscontent._id}>
            {tabscontent.description}
            {}
            <TaskTable
            // data={selectedProject ? selectedProject.includeTasks : []}
            />

            <TaskCreateSheet />
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
