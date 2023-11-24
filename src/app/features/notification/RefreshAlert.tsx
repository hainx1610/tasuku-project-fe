import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  // AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function RefreshAlert() {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Session expired</AlertDialogTitle>
          <AlertDialogDescription>
            Your session has expired. Please refresh or log in again.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex justify-end space-x-2">
          <Button
            onClick={() => {
              window.location.reload();
            }}
          >
            Refresh
          </Button>
          <Button variant={"ghost"}>Log in</Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
