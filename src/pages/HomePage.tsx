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

  // const dispatch = useDispatch();

  // const { projectsById, currentProjects, isLoading } = useSelector(
  //   (state) => state.project
  // );

  // useEffect(() => {
  //   if (userId) dispatch(getProjectsByUser(userId));
  //   // no userId the first time
  // }, [dispatch, userId]);

  // const projects = currentProjects.map((projectId) => projectsById[projectId]);

  return (
    <>
      <div className="p-6 space-y-10 my-5 flex flex-col justify-center items-center h-full">
        <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome back, {user!.name}.
        </h1>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Choose a project from the left to view your tasks.
        </h4>
      </div>

      {/* <TaskTable /> */}
    </>
  );
}

export default HomePage;
