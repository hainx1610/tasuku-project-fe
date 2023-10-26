// @ts-nocheck
import {
  Sheet,
  // SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  // SheetTrigger,
} from "@/components/ui/sheet";

import TaskEditForm from "./TaskEditForm";

export default function TaskEditSheet({ isOpen, setIsOpen, task }) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger> */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit task</SheetTitle>
          <SheetDescription>
            Make changes to the task here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <TaskEditForm task={task} />
        <SheetFooter>
          {/* <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
