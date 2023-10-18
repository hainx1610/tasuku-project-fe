"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TaskEditSheet from "@/app/features/task/TaskEditSheet";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "@/app/features/task/taskSlice";
import { statuses } from "@/app/features/task/taskProperties";

// import { labels } from "../../app/features/task/taskProperties";
// import { taskSchema } from "../data/schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // const task = taskSchema.parse(row.original);
  // You can access the row data using row.original in the cell function.
  // Use this to handle actions for your row eg. use the id to make a DELETE call to your API.
  const task = row.original;
  // console.log(task, "row original");

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={async () => {
              // dispatch(getSingleTask(task._id));
              setIsOpen(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          {/* <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Set Status</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={task.status}>
                {statuses.map((status) => (
                  <DropdownMenuRadioItem
                    key={status.value}
                    value={status.value}
                    data-set={status.value}
                    onClick={async (e) => {
                      const targetValue = (
                        e.target as HTMLTextAreaElement
                      ).getAttribute("data-set");
                      dispatch(
                        editTask({
                          status: targetValue,
                          taskId: task._id,
                        })
                      );
                    }}
                  >
                    {status.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TaskEditSheet isOpen={isOpen} setIsOpen={setIsOpen} task={task} />
    </>
  );
}
