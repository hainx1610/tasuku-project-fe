"use client";

import { ColumnDef } from "@tanstack/react-table";

// import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";

import { priorities, statuses } from "@/app/features/task/taskProperties";
// import { Task } from "../data/schema";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { TTask } from "@/types";

export const columns: ColumnDef<TTask>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("_id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "assigneeId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="AssigneeId" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("assigneeId")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2 w-16 lg:w-64 justify-center lg:justify-start">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px]  font-medium text-xs lg:text-base">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "assigneeName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assignee" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2 w-8 lg:w-16 justify-center lg:justify-start">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px]  font-medium text-xs lg:text-base">
            {row.getValue("assigneeName")}
          </span>
        </div>
      );
    },
    // enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: "dueDateDisplayed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due" />
    ),
    cell: ({ row }) => {
      const dueDateDisplayed: string = row.getValue("dueDateDisplayed");
      let dateColor = "";
      if (Date.parse(dueDateDisplayed) <= Date.now()) {
        dateColor = "#8b0000";
      }

      return (
        <div className="flex space-x-2 w-8 lg:w-28">
          <span
            className="max-w-[500px]  font-medium text-xs lg:text-base"
            style={{ color: dateColor }}
          >
            {dueDateDisplayed}
          </span>
        </div>
      );
    },
    // enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex  items-center w-5 md:w-28">
          {status.icon && (
            <status.icon
              className="mr-2 h-4 w-4 text-muted-foreground"
              style={{ color: `${status.color}` }}
            />
          )}
          <span
            className="hidden md:inline text-xs lg:text-base"
            style={{ color: `${status.color}` }}
          >
            {status.label}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Priority"} />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center w-5 md:w-28">
          {priority.icon && (
            <priority.icon
              className="mr-2 h-4 w-4 text-muted-foreground"
              style={{ color: `${priority.color}` }}
            />
          )}
          <span
            className="hidden md:inline text-xs lg:text-base"
            style={{ color: `${priority.color}` }}
          >
            {priority.label}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
