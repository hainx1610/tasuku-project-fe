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

function TasksPerStatusChart({ tasksData }: any) {
  const xAxisKeys = ["pending", "working", "review", "done"];
  const COLORS = ["gray", "orange", "#6D67E4", "green"];

  const taskStatusSummary = tasksData.reduce(
    // @ts-ignore
    (acc, { status }) => ({ ...acc, [status]: (acc[status] || 0) + 1 }),
    {}
  );

  const data = xAxisKeys.map((key) => ({
    status: key,
    occurence: taskStatusSummary[key],
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
                  name={entry.status}
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
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
