import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "./taskSlice";

const formSchema = z.object({
  title: z.string({ required_error: "Task title is required" }),
  description: z.string({ required_error: "Task description is required" }),
  status: z.string().optional(),
  priority: z.string().optional(),
});

function TaskCreateForm() {
  const dispatch = useDispatch();

  const { selectedProject } = useSelector((state: any) => state.project);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "pending",
      priority: "normal",
    },
  });

  // 2. Define a submit handler.

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    // dispatch here!
    dispatch(createTask({ ...values, inProject: selectedProject._id }));
    // .then(
    //   () => form.reset()
    // );
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
                <Input placeholder="Enter your title" {...field} />
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
                  <Input placeholder="Enter your description" {...field} />
                </FormControl>
              </div>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="review">review</SelectItem>
                  <SelectItem value="pending">pending</SelectItem>
                  <SelectItem value="working">working</SelectItem>
                  <SelectItem value="done">done</SelectItem>
                  <SelectItem value="archived">archived</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="high">high</SelectItem>
                  <SelectItem value="normal">normal</SelectItem>
                  <SelectItem value="low">low</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}

export default TaskCreateForm;
