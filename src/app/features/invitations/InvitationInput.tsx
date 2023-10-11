// import React, { useState } from "react";
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

import apiService from "@/app/apiService";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Not a valid email"),
  name: z.string({
    required_error: "name is required",
  }),
});

function InvitationInput() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  // 2. Define a submit handler.

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const { email, name } = values;

    try {
      const confirmLink = await apiService.post("/invitations", {
        email,
        name,
      });
      console.log(confirmLink);
    } catch (error) {
      console.log(error);
    }
    // console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>

              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>

              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Invite</Button>
      </form>
    </Form>
  );
}

export default InvitationInput;
