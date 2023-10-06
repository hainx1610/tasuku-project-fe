import React from "react";
import { Progress } from "./ui/progress";

function LoadingScreen() {
  return (
    <div className=" absolute w-full h-full flex items-center justify-center">
      <Progress />
    </div>
  );
}

export default LoadingScreen;
