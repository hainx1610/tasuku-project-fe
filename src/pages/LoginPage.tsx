import useAuth from "@/hooks/useAuth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
// import FormProvider from "@/components/form/FormProvider";
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
import { Toggle } from "@/components/ui/toggle";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
// import { toast } from "react-toastify";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, ShieldAlert } from "lucide-react";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Not a valid email"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim()
    .min(1, { message: "Password is required" }),
});

function LoginPage() {
  const auth = useAuth();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    const from = location.state?.from?.pathname || "/";
    const { email, password } = values;

    try {
      if (!auth.login) throw new Error("Logout func undefined");
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
        // this is the callback param of the login func in AuthProvider
      });
    } catch (error) {
      // console.log(error);
      form.reset();
      form.setError("responseError", error);
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
      <Alert className="w-70 my-2 pb-2 mb-5">
        <Info className="h-4 w-4" />
        {/* <AlertTitle>Don't have an account? Get Started</AlertTitle> */}
        <AlertDescription>
          {"Don't have an account? "}
          <RouterLink
            className=" text-green-600 hover:underline"
            to={"/register"}
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
          >
            Sign Up
          </RouterLink>
        </AlertDescription>
      </Alert>

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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="flex ">
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                  ></Input>
                </FormControl>
                <Toggle onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </Toggle>
              </div>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign in</Button>
      </form>
    </Form>
  );
}

export default LoginPage;
