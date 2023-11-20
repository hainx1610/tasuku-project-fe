//@ts-nocheck
import { columns } from "@/app/features/task/taskColumns";
import LoadingScreen from "@/components/LoadingScreen";
import { DataTable } from "@/components/ui/data-table";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { getTasksByProject } from "@/app/features/task/taskSlice";
import TaskCreateSheet from "@/app/features/task/TaskCreateSheet";
import ProjectMemberList from "@/app/features/project/ProjectMemberList";
import { useParams } from "react-router-dom";
import { getSingleProject } from "@/app/features/project/projectSlice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3Icon,
  KanbanSquareIcon,
  TablePropertiesIcon,
} from "lucide-react";

import { KanbanBoard } from "@/components/kanban/KanbanBoard";

import TasksPerStatusChart from "@/components/dashboard/TasksPerStatusChart";
import TasksPerPriorityChart from "@/components/dashboard/TasksPerPriorityChart";
import TasksPerMemberChart from "@/components/dashboard/TasksPerMemberChart";

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.projectId;

  const dispatch = useDispatch();

  const { selectedProject } = useSelector(
    (state: any) => state.project,
    shallowEqual
  );

  const { tasksById, currentPageTasks, isLoading } = useSelector(
    (state: any) => state.task,
    shallowEqual
  );

  useEffect(() => {
    if (projectId) {
      dispatch(getSingleProject(projectId));
      dispatch(getTasksByProject(projectId));
    }
  }, [dispatch, projectId]);

  const tasksData = currentPageTasks.map((taskId) => tasksById[taskId]);

  const [defaultTab, setDefaultTab] = useState("data-table");

  return (
    <div className="container mx-auto py-10 mt-14">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="flex flex-col justify-center items-center space-y-8">
          <h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
            {selectedProject?.name}
          </h2>

          <h4 className="scroll-m-20 text-slate-500 text-xl font-semibold tracking-tight">
            {selectedProject?.description}
          </h4>

          <Tabs defaultValue={defaultTab} className="">
            <TabsList className="mb-5">
              <TabsTrigger
                value="data-table"
                onFocus={() => {
                  setDefaultTab("data-table");
                  dispatch(getTasksByProject(projectId));
                }}
              >
                <TablePropertiesIcon />
              </TabsTrigger>
              <TabsTrigger
                value="data-kanban"
                onFocus={() => {
                  setDefaultTab("data-kanban");
                  dispatch(getTasksByProject(projectId));
                }}
              >
                <KanbanSquareIcon />
              </TabsTrigger>
              <TabsTrigger
                value="data-dashboard"
                onFocus={() => {
                  setDefaultTab("data-dashboard");
                  dispatch(getTasksByProject(projectId));
                }}
              >
                <BarChart3Icon />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="data-table" className="">
              <DataTable columns={columns} data={tasksData ? tasksData : []} />
            </TabsContent>
            <TabsContent value="data-kanban">
              <KanbanBoard tasksData={tasksData} />
            </TabsContent>
            <TabsContent value="data-dashboard" className="w-screen">
              {/* <ProjectDashboard tasksData={tasksData} /> */}
              <div className="flex flex-wrap flex-row  justify-center items-center">
                <TasksPerStatusChart tasksData={tasksData} />
                <TasksPerPriorityChart tasksData={tasksData} />
                <TasksPerMemberChart
                  tasksData={tasksData}
                  projectData={selectedProject}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex flex-col w-32 space-y-5">
            <TaskCreateSheet />
            <ProjectMemberList />
          </div>
        </div>
      )}
    </div>
  );
}
