import {
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  //   CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {} from "module";
import { statuses } from "@/app/features/task/taskProperties";

function TasksPerStatusChart({ tasksData }: any) {
  const taskStatusSummary = tasksData.reduce(
    // @ts-ignore
    (acc, { status }) => ({ ...acc, [status]: (acc[status] || 0) + 1 }),
    {}
  );

  const data = statuses.slice(0, -1).map((status) => ({
    ...status,
    occurence: taskStatusSummary[status.value] || 0,
  }));

  const taskSum = data.reduce((acc, { occurence }) => {
    return acc + +occurence;
  }, 0);

  return (
    <Card className=" w-96 m-2">
      <CardHeader>
        <CardTitle>Tasks per Status</CardTitle>
      </CardHeader>
      <CardContent className="pl-0">
        <ResponsiveContainer width={"100%"} height={350}>
          <PieChart>
            <Pie
              data={data}
              dataKey="occurence"
              innerRadius={70}
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  name={entry.label}
                  key={`cell-${index}`}
                  fill={entry.color}
                />
              ))}
              <Label value={`${taskSum} task(s)`} position="center" />
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default TasksPerStatusChart;
