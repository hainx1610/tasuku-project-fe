import React, { useState } from "react";
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
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const formSchema = z.object({
  currentPassword: z
    .string({ required_error: "Current password is required" })
    .min(1, { message: "Password is required" }),
  newPassword: z
    .string({ required_error: "New password is required" })
    .min(1, { message: "New password is required" }),
});

function UserPasswordChangeForm() {
  const { logout } = useAuth();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // handleMenuClose();
      if (!logout) throw new Error("Logout func undefined");
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      toast.error(error);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.

    try {
      await apiService
        .post(`users/me/change_password`, { ...values })
        .then(() => form.reset());
      toast.success("Password changed succesfully. Logging out...");
      setTimeout(handleLogout, 3000);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current password</FormLabel>
              <div className="flex ">
                <FormControl>
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <Toggle
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </Toggle>
              </div>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <Toggle onClick={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </Toggle>
              </div>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

export default UserPasswordChangeForm;
