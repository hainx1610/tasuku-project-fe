//@ts-nocheck
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiService from "@/app/apiService";
import { Toggle } from "@/components/ui/toggle";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, ShieldAlert } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z
  .object({
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(1, { message: "New password is required" }),
    confirmPassword: z.string({
      required_error: "Password needs to be confirmed",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords did not match",
    path: ["confirmPassword"],
  });

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting, isSubmitSuccessful } = form.formState;
  const navigate = useNavigate();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.

    const { newPassword } = { ...values };

    try {
      await apiService.post(
        `/resets/reset_password?email=${email}&token=${token}`,
        {
          password: newPassword,
        }
      );
      form.reset();
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      form.setError("responseError", {
        type: "custom",
        message: error.message,
      });
    }
  }

  return (
    <div className="flex flex-col justify-center h-full w-80 lg:w-96">
      <Card>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Change your password for {email ? email : "?"} here. After changing,
            use the new password to log in.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
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
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <div className="flex ">
                      <FormControl>
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>
                      <Toggle
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                      </Toggle>
                    </div>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <div className="flex ">
                      <FormControl>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>
                      <Toggle
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOpenIcon />
                        ) : (
                          <EyeClosedIcon />
                        )}
                      </Toggle>
                    </div>
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
                <Button disabled>Password changed successfully!</Button>
              ) : (
                <Button type="submit">Reset</Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ResetPassword;
