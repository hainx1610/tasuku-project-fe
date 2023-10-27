import apiService from "@/app/apiService";
import { Card, CardContent } from "@/components/ui/card";
import {
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import useAuth from "@/hooks/useAuth";
import { Bell, BellDot } from "lucide-react";
import { useEffect, useState } from "react";

function NotificationsMenu() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      const response = await apiService.get(
        `/notifications/users/${user?._id}`
      );
      console.log(response.data.data, "response");
      setNotifications(response.data.data);
    };
    getNotifications();
  }, [user]);

  return (
    <MenubarMenu>
      <MenubarTrigger>
        {notifications.length ? (
          <BellDot className="fill-red-400" size={20} />
        ) : (
          <Bell size={20} />
        )}
      </MenubarTrigger>
      <MenubarContent>
        {notifications.length ? (
          <Card className="w-[380px] mt-2 border-none">
            <CardContent className="grid gap-4">
              <div>
                {notifications.map((notification: any) => (
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
        ) : (
          <span>No notifications at the moment.</span>
        )}
      </MenubarContent>
    </MenubarMenu>
  );
}

export default NotificationsMenu;
