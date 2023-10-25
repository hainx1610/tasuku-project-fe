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
import { toast } from "react-toastify";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Not a valid email"),
  name: z
    .string({
      required_error: "name is required",
    })
    .min(1, { message: "Name is required" }),
});

function InvitationInput() {
  const [isSending, setIsSending] = useState(false);

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

    const { email, name } = values;
    setIsSending(true);
    try {
      const confirmLink = await apiService.post("/invitations", {
        email,
        name,
      });
      console.log(confirmLink, "confirmLink");
      setIsSending(false);
      toast.success("An invitation has been sent.");
    } catch (error: any) {
      // console.log(error);
      toast.error(error.message);
      setIsSending(false);
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
        {isSending ? (
          <Button className=" cursor-not-allowed opacity-50">
            <Loader2 className="animate-spin" />
          </Button>
        ) : (
          <Button type="submit">Invite</Button>
        )}
      </form>
    </Form>
  );
}

export default InvitationInput;
