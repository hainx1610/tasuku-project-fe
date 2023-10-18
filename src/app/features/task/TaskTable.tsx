import { columns } from "@/app/features/task/taskColumns";
import LoadingScreen from "@/components/LoadingScreen";
import { DataTable } from "@/components/ui/data-table";

import { shallowEqual, useSelector } from "react-redux";

// data = includeTasks arr
export default function TaskTable() {
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
