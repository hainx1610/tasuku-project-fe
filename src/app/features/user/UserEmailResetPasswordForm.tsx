//@ts-nocheck
import apiService from "@/app/apiService";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import useAuth from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShieldAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Not a valid email"),
});

function UserEmailResetPasswordForm() {
  const auth = useAuth();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const { isSubmitting, isSubmitSuccessful } = form.formState;

  // 2. Define a submit handler.

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.

    try {
      if (auth.user)
        throw new Error("A user already logged in. Please log out first.");
      await apiService.post("/resets", { ...values });
      form.reset();
    } catch (error) {
      console.error(error);
      // form.reset();
      form.setError("responseError", {
        type: "custom",
        message: error.message,
      });
    }
    // console.log(values);
  }

  return (
    <Form {...form}>
      {!!form.formState.errors.responseError && (
        <Alert variant="destructive" className="w-70 my-2 pb-2">
          <ShieldAlert className="h-4 w-4" />

          <AlertDescription>
            {form.formState.errors.responseError.message}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {isSubmitting ? (
          <Button className=" cursor-not-allowed opacity-50">
            <Loader2 className="animate-spin" />
          </Button>
        ) : isSubmitSuccessful ? (
          <Button disabled>Email sent!</Button>
        ) : (
          <Button type="submit">Send Email</Button>
        )}
      </form>
    </Form>
  );
}

export default UserEmailResetPasswordForm;
