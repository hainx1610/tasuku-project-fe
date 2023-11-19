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

function TasksPerPriorityChart({ tasksData }: any) {
  const priorities = ["low", "normal", "high"];

  const taskPrioritySummary = tasksData.reduce(
    // @ts-ignore
    (acc, { priority }) => ({ ...acc, [priority]: (acc[priority] || 0) + 1 }),
    {}
  );

  const data = priorities.map((priority) => ({
    priority,
    occurence: taskPrioritySummary[priority] || 0,
  }));

  const taskSum = data.reduce((acc, { occurence }) => {
    return acc + +occurence;
  }, 0);

  const COLORS = ["gray", "blue", "orange"];

  return (
    <Card className=" w-96 m-2">
      <CardHeader>
        <CardTitle>Tasks per Priority</CardTitle>
      </CardHeader>
      <CardContent className="">
        <ResponsiveContainer width={"100%"} height={350}>
          <PieChart>
            <Pie
              data={data}
              dataKey="occurence"
              innerRadius={70}
              outerRadius={100}
            >
              {data.map((entry, index) => (
                <Cell
                  name={entry.priority}
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

export default TasksPerPriorityChart;
