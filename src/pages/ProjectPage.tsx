import { columns } from "@/app/features/task/taskColumns";
import LoadingScreen from "@/components/LoadingScreen";
import { DataTable } from "@/components/ui/data-table";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { getTasksByProject } from "@/app/features/task/taskSlice";
import TaskCreateSheet from "@/app/features/task/TaskCreateSheet";
import ProjectMemberList from "@/app/features/project/ProjectMemberList";
import { useParams } from "react-router-dom";
import { getSingleProject } from "@/app/features/project/projectSlice";

// data = includeTasks arr
export default function ProjectPage() {
  const params = useParams();
  const projectId = params.projectId;

  const dispatch = useDispatch();

  // const { selectedTask } = useSelector(
  //   (state: any) => state.task,
  //   shallowEqual
  // );

  // useEffect(() => {
  //   if (selectedProject) dispatch(getSingleProject(selectedProject._id));
  // }, [dispatch, selectedTask]);

  // const { selectedProject, isLoading } = useSelector(
  //   (state: any) => state.project,
  //   shallowEqual
  // );

  const { selectedProject } = useSelector(
    (state) => state.project,
    shallowEqual
  );

  //   const projectId = selectedProject?._id;

  const { tasksById, currentPageTasks, isLoading } = useSelector(
    (state) => state.task,
    shallowEqual
  );

  useEffect(() => {
    if (projectId) {
      dispatch(getSingleProject(projectId));
      dispatch(getTasksByProject(projectId));
    }
  }, [dispatch, projectId]);

  const tasks = currentPageTasks.map((taskId) => tasksById[taskId]);

  return (
    <div className="container mx-auto py-10 ">
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
          <DataTable
            columns={columns}
            // data={selectedProject ? selectedProject.includeTasks : []}
            data={tasks ? tasks : []}
          />
          <div className="flex flex-col w-32 space-y-5">
            <TaskCreateSheet />
            <ProjectMemberList />
          </div>
        </div>
      )}
    </div>
  );
}
