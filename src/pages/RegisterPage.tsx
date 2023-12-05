//@ts-nocheck
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { useLocation, useNavigate } from "react-router-dom";
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
import { Loader2, ShieldAlert } from "lucide-react";
// import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const formSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
    name: z
      .string({
        required_error: "Name is required",
      })
      .trim()
      .min(1, { message: "Name is required" }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .trim()
      .min(1, { message: "Password is required" }),
    confirmPassword: z.string({
      required_error: "Password needs to be confirmed",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords did not match",
    path: ["confirmPassword"],
  });

function RegisterPage() {
  const auth = useAuth();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  // const navigate = useNavigate();
  // const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // const from = location.state?.from?.pathname || "/";
    const { email, password, name } = values;

    try {
      if (!auth.register) throw new Error("Register func undefined");
      // await auth.register({ email, password, name }, () => {
      //   navigate(from, { replace: true });
      //   // this is the callback param of the register func in AuthProvider
      // });
      await auth.register({ email, password, name });
      // toast.success("Created");
      setIsAlertOpen(true);
    } catch (error) {
      // console.log(error);
      form.reset();
      form.setError("responseError", error);
    }
    // console.log(values);
  }

  return (
    <>
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
                  <Input placeholder="abc@gmail.com" {...field} />
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
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
                      placeholder="*********"
                      {...field}
                      className="rounded-r-none border-r-0"
                    ></Input>
                  </FormControl>
                  <Toggle
                    className=" border-[1px] rounded-l-none border-l-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
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
                      placeholder="*********"
                      {...field}
                      className="rounded-r-none border-r-0"
                    ></Input>
                  </FormControl>
                  <Toggle
                    className=" border-[1px] rounded-l-none border-l-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
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
          ) : (
            <Button type="submit">Sign up</Button>
          )}
        </form>
      </Form>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>User successfully created!</AlertDialogTitle>
            <AlertDialogDescription>
              Please verify your account using the link sent to your email.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default RegisterPage;
