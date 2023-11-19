import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  //   CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

function TasksPerStatusChart({ tasksData }: any) {
  const xAxisKeys = ["pending", "working", "review", "done"];

  const taskStatusSummary = tasksData.reduce(
    // @ts-ignore
    (acc, { status }) => ({ ...acc, [status]: (acc[status] || 0) + 1 }),
    {}
  );

  const data = xAxisKeys.map((key) => ({
    status: key,
    occurence: taskStatusSummary[key],
  }));

  return (
    <Card className=" w-96 m-2">
      <CardHeader>
        <CardTitle>Tasks per Status</CardTitle>
      </CardHeader>
      <CardContent className="pl-0">
        <ResponsiveContainer width={"100%"} height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="status"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              allowDecimals={false}
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              // tickFormatter={(value) => `$${value}`}
            />
            <Bar dataKey="occurence" fill="#adfa1d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default TasksPerStatusChart;
