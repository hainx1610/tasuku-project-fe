import { columns } from "@/app/features/task/taskColumns";
import LoadingScreen from "@/components/LoadingScreen";
import { DataTable } from "@/components/ui/data-table";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { getTasksByProject } from "./taskSlice";

// data = includeTasks arr
export default function TaskTable() {
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

  const projectId = selectedProject?._id;

  const { tasksById, currentPageTasks, isLoading } = useSelector(
    (state) => state.task,
    shallowEqual
  );

  useEffect(() => {
    if (projectId) dispatch(getTasksByProject(projectId));
  }, [dispatch, projectId]);

  const tasks = currentPageTasks.map((taskId) => tasksById[taskId]);

  return (
    <div className="container mx-auto py-10">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <DataTable
          columns={columns}
          // data={selectedProject ? selectedProject.includeTasks : []}
          data={tasks ? tasks : []}
        />
      )}
    </div>
  );
}
