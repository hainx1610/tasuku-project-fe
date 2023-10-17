import { columns } from "@/app/features/task/taskColumns";
import { DataTable } from "@/components/ui/data-table";

import { useSelector } from "react-redux";

// data = includeTasks arr
export default function TaskTable() {
  const { selectedProject } = useSelector((state: any) => state.project);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={selectedProject ? selectedProject.includeTasks : []}
      />
    </div>
  );
}
