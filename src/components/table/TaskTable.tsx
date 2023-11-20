// @ts-nocheck
import { columns } from "@/components/table/taskColumns";
import LoadingScreen from "@/components/LoadingScreen";
import { DataTable } from "@/components/table/data-table";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { getTasksByProject } from "../../app/features/task/taskSlice";
import TaskCreateSheet from "../../app/features/task/TaskCreateSheet";
import ProjectMemberList from "../../app/features/project/ProjectMemberList";

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
    <div className="container mx-auto py-10 ">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div>
          <h4>{selectedProject?.description}</h4>
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
