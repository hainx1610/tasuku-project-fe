import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

function NotificationsCard({ notifications }) {
  return (
    <Card className="w-[380px] mt-2 border-none">
      <CardContent className="grid gap-4">
        <div>
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {/* {notification.title} */}
                  {"A task has been updated."}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      {/* <CardFooter>
        <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter> */}
    </Card>
  );
}

export default NotificationsCard;
