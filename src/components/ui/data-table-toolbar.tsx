// @ts-nocheck
"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "@/app/features/task/taskProperties";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import useAuth from "@/hooks/useAuth";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center  space-x-1 md:space-x-2 justify-between mr-5 ">
        <Input
          placeholder="Filter by title..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <Input
          placeholder="Filter by assignee..."
          value={
            (table.getColumn("assigneeName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("assigneeName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px] hidden md:inline"
        />

        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <Button
          value={user!._id}
          className="h-9  lg:px-3"
          onClick={(e) =>
            table.getColumn("assigneeId")?.setFilterValue(e.target.value)
          }
        >
          My tasks
        </Button>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
