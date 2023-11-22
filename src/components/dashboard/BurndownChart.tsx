import { fAddHours, fDateMD, getWeekDayList } from "@/utils/formatTime";
import {
  Card,
  CardContent,
  //   CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BurndownChart({ tasksData, projectData }: any) {
  const daysList = getWeekDayList(projectData.startAt, projectData.endAt).map(
    (day) => fDateMD(day)
  );
  // add day 0 before list
  daysList.unshift(fDateMD(fAddHours(projectData.startAt, -24)));

  const totalEffortHrs =
    (daysList.length - 1) * 8 * projectData.includeMembers.length;

  let remaingEffortHrs =
    (daysList.length - 1) * 8 * projectData.includeMembers.length;

  const effortByDate = tasksData
    .map((task: any) => ({
      date: task.dateCompleted ? fDateMD(task.dateCompleted) : null,
      effort: task.effort ? task.effort : null,
    }))
    .reduce(
      // @ts-ignore
      (acc, { date, effort }) => ({
        ...acc,
        [date]: (acc[date] || 0) + effort,
      }),
      {}
    );

  const data: any = [];
  daysList.forEach((day, index) => {
    const item = {
      name: day,
      idealBurndown:
        totalEffortHrs - index * 8 * projectData.includeMembers.length,

      actualEffort: effortByDate[day] || 0,
    };
    remaingEffortHrs -= item.actualEffort;
    data.push({ ...item, remainingEffort: remaingEffortHrs });
  });
  console.log(data);

  return (
    <Card className=" w-96 m-2">
      <CardHeader>
        <CardTitle>Burndown</CardTitle>
      </CardHeader>
      <CardContent className="pl-0 pr-5">
        <ResponsiveContainer width={"100%"} height={350}>
          <ComposedChart width={730} height={250} data={data}>
            <XAxis
              dataKey="name"
              angle={-60}
              textAnchor="end"
              fontSize={12}
              height={50}
            />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend verticalAlign="top" align="right" height={36} />
            <CartesianGrid stroke="gray" strokeOpacity={0.4} />

            <Area
              type="monotone"
              dataKey="remainingEffort"
              fill="#8884d8"
              name="remaining (hrs)"
              stroke="#8884d8"
            />

            <Line
              type="monotone"
              dataKey="idealBurndown"
              name="ideal (hrs)"
              stroke="blue"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default BurndownChart;
