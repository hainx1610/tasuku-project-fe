import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { createProject } from "./projectSlice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addHours, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  title: z
    .string({ required_error: "Project title is required" })
    .min(1, { message: "Project title is required" }),
  description: z
    .string({ required_error: "Project description is required" })
    .min(1, { message: "Project description is required" }),
  status: z.string().optional(),
  priority: z.string().optional(),
});

function ProjectCreateForm() {
  const dispatch = useDispatch();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addHours(new Date(), 72),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // 2. Define a submit handler.

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // dispatch here!

    const data = { ...values, from: date?.from, to: addHours(date?.to, 24) };
    dispatch(createProject(data)).then(() => form.reset());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input placeholder="Enter project title" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <div className="flex ">
                <FormControl>
                  <Input placeholder="Enter project description" {...field} />
                </FormControl>
              </div>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* date picker outside of form fields*/}
        <div className="flex flex-col ">
          {/* <FormLabel>length</FormLabel> */}
          <Label htmlFor="project-length" className="mb-3">
            length
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="project-length"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}

export default ProjectCreateForm;
