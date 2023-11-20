import {
  Card,
  CardContent,
  //   CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Legend, LineChart, ResponsiveContainer } from "recharts";

function BurndownChart() {
  return (
    <Card className=" w-96 m-2">
      <CardHeader>
        <CardTitle>Burndown</CardTitle>
      </CardHeader>
      <CardContent className="pl-0">
        <ResponsiveContainer width={"100%"} height={350}>
          <LineChart>
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default BurndownChart;
