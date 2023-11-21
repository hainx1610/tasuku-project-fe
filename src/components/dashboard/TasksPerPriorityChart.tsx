import {
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  //   CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { priorities } from "@/app/features/task/taskProperties";

function TasksPerPriorityChart({ tasksData }: any) {
  const taskPrioritySummary = tasksData.reduce(
    // @ts-ignore
    (acc, { priority }) => ({ ...acc, [priority]: (acc[priority] || 0) + 1 }),
    {}
  );

  const data = priorities.map((priority) => ({
    ...priority,
    occurence: taskPrioritySummary[priority.value] || 0,
  }));

  const taskSum = data.reduce((acc, { occurence }) => {
    return acc + +occurence;
  }, 0);

  return (
    <Card className=" w-96 m-2">
      <CardHeader>
        <CardTitle>Tasks per Priority</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <ResponsiveContainer width={"100%"} height={350}>
          <PieChart>
            <Tooltip filterNull={true} />
            <Pie
              data={data}
              dataKey="occurence"
              innerRadius={70}
              outerRadius={100}
              labelLine={false}
              // label
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

export default TasksPerPriorityChart;
