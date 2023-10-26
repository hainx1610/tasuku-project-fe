import { Loader2 } from "lucide-react";

function LoadingScreen() {
  return (
    <div className="w-full h-full flex items-center justify-center ">
      <Loader2 className="h-10 w-10 animate-spin absolute top-1/2 left-1/2" />
    </div>
  );
}

export default LoadingScreen;
