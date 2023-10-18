import { columns } from "@/app/features/task/taskColumns";
import LoadingScreen from "@/components/LoadingScreen";
import { DataTable } from "@/components/ui/data-table";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getSingleProject } from "../project/projectSlice";
import { useEffect } from "react";

// data = includeTasks arr
export default function TaskTable() {
  const dispatch = useDispatch();

  const { selectedTask } = useSelector(
    (state: any) => state.task,
    shallowEqual
  );

  useEffect(() => {
    if (selectedProject) dispatch(getSingleProject(selectedProject._id));
  }, [dispatch, selectedTask]);

  const { selectedProject, isLoading } = useSelector(
    (state: any) => state.project,
    shallowEqual
  );

  return (
    <div className="container mx-auto py-10">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <DataTable
          columns={columns}
          data={selectedProject ? selectedProject.includeTasks : []}
        />
      )}
    </div>
  );
}
