import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDispatch } from "react-redux";
import { editTask } from "./taskSlice";
import apiService from "@/app/apiService";
import { toast } from "react-toastify";

const formSchema = z.object({
  effort: z.coerce
    .number({
      required_error: "Effort is required",
      invalid_type_error: "Effort must be a number",
    })
    .positive()
    .finite(),
});

export function TaskEffortForm({
  isTaskEffortOpenByTable,
  setIsTaskEffortOpenByTable,
  isTaskEffortOpenByKanban,
  setIsTaskEffortOpenByKanban,
  taskId,
}: any) {
  const dispatch = useDispatch();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      effort: 0,
    },
  });

  // 2. Define a submit handler.

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.

    // if opened by table
    if (isTaskEffortOpenByTable) {
      // @ts-ignore
      dispatch(editTask({ ...values, status: "done", taskId })).then(() =>
        form.reset()
      );
      setIsTaskEffortOpenByTable(false);
    }
    // if opened by kanban
    if (isTaskEffortOpenByKanban) {
      try {
        const response = await apiService.put(`/tasks/${taskId}`, {
          ...values,
          status: "done",
        });
        console.log(response);

        toast.success("Your task has been updated.");
      } catch (error: any) {
        toast.error(error.message);
      }
      setIsTaskEffortOpenByKanban(false);
    }
  }

  return (
    <AlertDialog
      open={isTaskEffortOpenByTable || isTaskEffortOpenByKanban}
      onOpenChange={() => {
        // if (isTaskEffortOpenByTable) setIsTaskEffortOpenByTable();
        // if (isTaskEffortOpenByKanban) setIsTaskEffortOpenByKanban();
      }}
    >
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Effort Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Enter the number of hours spent on this task. This will be used to
            improve productivity.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="effort"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>title</FormLabel> */}
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
