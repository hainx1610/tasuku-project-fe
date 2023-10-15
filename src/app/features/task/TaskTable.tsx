import { columns } from "@/app/features/task/taskColumns";
import { DataTable } from "@/components/ui/data-table";

import { useDispatch, useSelector } from "react-redux";

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ];
// }

// const data = await getData();

// data = includeTasks arr

export default function TaskTable() {
  const { selectedProject } = useSelector((state) => state.project);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={selectedProject ? selectedProject.includeTasks : []}
      />
    </div>
  );
}
