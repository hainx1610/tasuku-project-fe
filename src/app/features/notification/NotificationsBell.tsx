import { BASE_URL } from "@/app/config";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import useAuth from "@/hooks/useAuth";
import { Bell, BellDot, Check } from "lucide-react";
import { useEffect, useState } from "react";
//@ts-ignore
import { EventSourcePolyfill } from "event-source-polyfill";
import apiService from "@/app/apiService";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

function NotificationsBell() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  // first time
  useEffect(() => {
    const getNotifications = async () => {
      const response = await apiService.get(
        `/notifications/users/${user?._id}`
      );
      console.log(response.data);
      setNotifications(response.data.data);
    };
    getNotifications();
  }, [user]);

  const accessToken = window.localStorage.getItem("accessToken");
  if (!accessToken)
    toast.error("Token expired. Please refresh of sign in again.");

  const subscription = new EventSourcePolyfill(
    `${BASE_URL}/notifications/subscribe/users/${user?._id}`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      heartbeatTimeout: 1800000,
      withCredentials: true,
    }
  );

  // Default events
  // subscription.addEventListener("open", () => {
  //   console.log("Connection to Notifications opened");
  // });

  subscription.addEventListener("error", () => {
    toast.error("Subscription to Notifications error");
  });

  subscription.addEventListener("message", () => {
    console.log("Receive message");
  });

  // custom "connected" event
  subscription.addEventListener("notifications", async (e: any) => {
    const jsonData = JSON.parse(e.data);
    console.log(e, jsonData, "Subscription to Notifications successful!");
    setNotifications(jsonData);
  });

  const handleMarkAllRead = async () => {
    // await apiService.delete("/notifications/me");
    await apiService.delete(`/notifications/users/${user!._id}`);
    // setNotifications([]);

    window.location.reload();
  };

  return (
    <MenubarMenu>
      <MenubarTrigger>
        {notifications.length ? (
          <BellDot className="fill-red-400 hover:cursor-pointer" size={20} />
        ) : (
          <Bell size={20} />
        )}
      </MenubarTrigger>
      <MenubarContent>
        {notifications.length ? (
          <Card className="w-[380px] mt-5 border-none -mb-3 ">
            <CardFooter>
              <Button
                className="w-full"
                variant={"ghost"}
                onClick={handleMarkAllRead}
              >
                <Check className="mr-2 h-4 w-4" /> Mark all as read
              </Button>
            </CardFooter>
            <CardContent className="grid gap-4">
              <div className=" max-h-[70vh] overflow-auto">
                {notifications.map((notification: any) => (
                  <div
                    key={notification._id}
                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                  >
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                        {/* {"A task has been updated."} */}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <span>No notifications at the moment.</span>
        )}
      </MenubarContent>
    </MenubarMenu>
  );
}

export default NotificationsBell;
