// @ts-nocheck
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
  // DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TaskEditSheet from "@/app/features/task/TaskEditSheet";
import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  editTask,
  getSingleTask,
} from "@/app/features/task/taskSlice";
import { statuses } from "@/app/features/task/taskProperties";
import useAuth from "@/hooks/useAuth";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TaskEffortForm } from "@/app/features/task/TaskEffortForm";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // access the row data using row.original in the cell function.
  const task = row.original;

  const { user } = useAuth();

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const { usersById, currentUsers } = useSelector(
    (state) => state.user,
    shallowEqual
  );

  const currentMembers = currentUsers.map((userId) => usersById[userId]);
  const members =
    user!.role === "manager"
      ? currentMembers
      : currentMembers.filter((member) => member._id === user._id);

  const navigate = useNavigate();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isTaskEffortOpenByTable, setIsTaskEffortOpenByTable] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-2 md:w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[160px]">
          {user!.role === "manager" && (
            <DropdownMenuItem
              onClick={async () => {
                // dispatch(getSingleTask(task._id));
                setIsOpen(true);
              }}
            >
              Edit
            </DropdownMenuItem>
          )}

          <RouterLink
            to={`/tasks/${task._id}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/tasks/${task._id}`);
            }}
          >
            <DropdownMenuItem
              onClick={async () => {
                dispatch(getSingleTask(task._id));
              }}
            >
              Details...
            </DropdownMenuItem>
          </RouterLink>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Set Status</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={task.status}
                onValueChange={(value) => {
                  if (value === "done") {
                    setIsTaskEffortOpenByTable(true);
                  } else {
                    dispatch(
                      editTask({
                        status: value,
                        taskId: task._id,
                      })
                    );
                  }
                }}
              >
                {statuses.map((status) => (
                  <DropdownMenuRadioItem
                    key={status.value}
                    value={status.value}
                  >
                    {status.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Assign to</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={task.assignedTo?._id}
                onValueChange={(value) => {
                  dispatch(
                    editTask({
                      assignedTo: value,
                      taskId: task._id,
                    })
                  );
                }}
              >
                {members.map((member) => (
                  <DropdownMenuRadioItem key={member._id} value={member._id}>
                    {`${member.name} - ${member.email}`}
                    {user?._id === member._id ? " (me)" : ""}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          {user!.role === "manager" && (
            <DropdownMenuItem onClick={() => setIsAlertOpen(true)}>
              Delete
              {/* <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <TaskEditSheet isOpen={isOpen} setIsOpen={setIsOpen} task={task} />
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        {/* <AlertDialogTrigger>Delete</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                dispatch(deleteTask(task._id));
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <TaskEffortForm
        isTaskEffortOpenByTable={isTaskEffortOpenByTable}
        setIsTaskEffortOpenByTable={setIsTaskEffortOpenByTable}
        taskId={task._id}
      />
    </>
  );
}
