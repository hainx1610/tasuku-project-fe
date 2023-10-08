import React from "react";
import { Loader2 } from "lucide-react";

function LoadingScreen() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
}

export default LoadingScreen;
