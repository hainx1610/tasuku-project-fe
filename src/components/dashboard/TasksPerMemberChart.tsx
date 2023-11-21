import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  //   CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

function TasksPerMemberChart({ tasksData, projectData }: any) {
  const taskAssigneeSummary = tasksData.reduce(
    // @ts-ignore
    (acc, { assigneeName }) => ({
      ...acc,
      [assigneeName]: (acc[assigneeName] || 0) + 1,
    }),
    {}
  );

  const projectMembersNames = projectData.includeMembers.map(
    (member: any) => member.name
  );
  const data = projectMembersNames.map((name: string) => ({
    name,
    occurence: taskAssigneeSummary[name] || 0,
  }));
  console.log(data);

  // const data = Object.keys(taskAssigneeSummary).map((assignee) => ({
  //   assignee,
  //   occurence: taskAssigneeSummary[assignee] || 0,
  // }));

  return (
    <Card className=" w-96 m-2 ">
      <CardHeader>
        <CardTitle>Tasks per Member</CardTitle>
      </CardHeader>
      <CardContent className="pl-0">
        <ResponsiveContainer width={"100%"} height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              angle={-60}
              textAnchor="end"
              height={60}
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

export default TasksPerMemberChart;
