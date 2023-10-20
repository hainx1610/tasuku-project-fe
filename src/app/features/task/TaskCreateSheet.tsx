import {
  Sheet,
  // SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import TaskCreateForm from "./TaskCreateForm";
import { useState } from "react";

export default function TaskCreateSheet() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>+ New Task</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create task</SheetTitle>
          <SheetDescription>
            Create a new task here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <TaskCreateForm setIsOpen={setIsOpen} />
        <SheetFooter>
          {/* <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
