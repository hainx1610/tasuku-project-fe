//@ts-nocheck
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
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
import { Info, Loader2, LogInIcon, ShieldAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UserForgotPasswordForm from "@/app/features/user/userForgotPasswordForm";

import { BASE_URL } from "@/app/config";

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
  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    const from = location.state?.from?.pathname || "/";
    const { email, password } = values;

    try {
      if (auth.user)
        throw new Error("A user already logged in. Please log out first.");
      if (!auth.login) throw new Error("Logout func undefined");
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
        // this is the callback param of the login func in AuthProvider
      });
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
            Sign up
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
        {isSubmitting ? (
          <Button className=" cursor-not-allowed opacity-50">
            <Loader2 className="animate-spin" />
          </Button>
        ) : (
          <Button type="submit">Sign in</Button>
        )}
      </form>

      <Button
        variant={"ghost"}
        onClick={async (e) => {
          e.preventDefault();
          window.open(`${BASE_URL}/auth/login/google`, "_self");
        }}
      >
        <LogInIcon size={16} className="mr-1" />
        Sign in with Google
      </Button>

      <Alert className="w-70 my-2 pb-2 mb-5">
        <Info className="h-4 w-4" />
        {/* <AlertTitle>Don't have an account? Get Started</AlertTitle> */}
        <AlertDescription>
          <Dialog>
            <DialogTrigger className=" text-orange-500 hover:underline">
              Forgot password?
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Forgot your password?</DialogTitle>
                <DialogDescription>
                  A new temporary password will be sent to your email address.
                  After logging in, please change it immediately.
                </DialogDescription>
              </DialogHeader>
              <UserForgotPasswordForm />
              <DialogFooter>
                <Button type="submit">Send email</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </AlertDescription>
      </Alert>
    </Form>
  );
}

export default LoginPage;
