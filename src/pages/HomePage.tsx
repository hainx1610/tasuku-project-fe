import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuth from "@/hooks/useAuth";
import { Separator } from "@/components/ui/separator";
import InvitationInput from "@/app/features/invitation/InvitationInput";

import { useDispatch, useSelector } from "react-redux";
import { getSingleProject } from "@/app/features/project/projectSlice";
import TaskTable from "@/app/features/task/taskTable";

import { columns, statusValue } from "@/app/features/task/taskColumns";
import { DataTable } from "@/components/ui/data-table";
import TaskInfoSheet from "@/app/features/task/TaskEditSheet";
import { Button } from "@/components/ui/button";
import TaskCreateSheet from "@/app/features/task/TaskCreateSheet";

function HomePage() {
  const { user } = useAuth();

  const dispatch = useDispatch();

  const { selectedProject } = useSelector((state) => state.project);

  const userMemberOf = user ? user["memberOf"] : [];
  const userRole = user ? user.role : undefined;

  // console.log(selectedProject, "project?");

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

          {userMemberOf.map((tabstrigger) => (
            <TabsTrigger
              value={tabstrigger.name}
              key={tabstrigger._id}
              onClick={async () => dispatch(getSingleProject(tabstrigger._id))}
            >
              {tabstrigger.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="welcome">
          <div>
            Welcome back, {user!.name}. Choose a project to view your tasks.
          </div>
        </TabsContent>

        <TabsContent value="invite">
          <InvitationInput />
        </TabsContent>

        {userMemberOf.map((tabscontent) => (
          <TabsContent value={tabscontent.name} key={tabscontent._id}>
            {tabscontent.description}
            {}
            <TaskTable
            // data={selectedProject ? selectedProject.includeTasks : []}
            />

            <TaskCreateSheet />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}

export default HomePage;
