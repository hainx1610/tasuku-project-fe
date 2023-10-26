import { BASE_URL } from "@/app/config";
import { useState } from "react";

function NotiSub() {
  const subscription = new EventSource(`${BASE_URL}/notifications/subscribe`, {
    withCredentials: true,
  });

  const [data, setData] = useState("");

  // Default events
  subscription.addEventListener("open", () => {
    console.log("Connection opened");
  });

  subscription.addEventListener("error", () => {
    console.error("Subscription err'd");
  });

  subscription.addEventListener("message", () => {
    console.log("Receive message");
  });

  // custom "connected" event
  subscription.addEventListener("current-date", (e) => {
    console.log("Subscription successful!");
    setData(e.data);
  });

  return <div>{data}</div>;
}

export default NotiSub;
