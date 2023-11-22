import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
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
  isTaskEffortOpen,
  setIsTaskEffortOpen,
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

    // dispatch here!
    // @ts-ignore
    dispatch(editTask({ ...values, status: "done", taskId })).then(() =>
      form.reset()
    );
    setIsTaskEffortOpen(false);
  }

  return (
    <Dialog open={isTaskEffortOpen} onOpenChange={setIsTaskEffortOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Effort Confirmation</DialogTitle>
          <DialogDescription>
            Enter the number of hours spent on this task. This will be used to
            improve peformance.
          </DialogDescription>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
}
