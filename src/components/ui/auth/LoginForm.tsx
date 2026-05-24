import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "./auth.schema";
import { useLogin } from "../../../features/auth/auth.queries";

import { Input } from "../input";
import { Label } from "../label";
import { Button } from "../button";
import AuthLayout from "./AuthLayout";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login, isPending } = useLogin();

  function onSubmit(data: LoginFormData) {
    if (!data.email || !data.password) return;

    login(data, {
      onSettled: () => reset(),
    });
  }

  return (
    <AuthLayout
      title="Log in to your account"
      description="Welcome back! Please enter your details."
      footerText="Forgot password?"
      footerLinkText="Reset it"
      footerLinkTo="/reset-password"
      loginExtraFooterText="Don’t have an account?"
      loginExtraFooterLink="Signup"
      footerLinkToSignup="/signup"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-card ">
        {/* Email */}
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email address *
          </Label>

          <Input
            id="email"
            type="email"
            className="h-11 border-border bg-background focus-visible:ring-primary"
            {...register("email")}
            disabled={isPending}
          />

          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            Password *
          </Label>

          <Input
            id="password"
            type="password"
            className="h-11 border-border bg-background focus-visible:ring-primary"
            {...register("password")}
            disabled={isPending}
          />

          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="h-11 w-full bg-primary text-primary-foreground hover:opacity-90 text-base font-medium"
          disabled={isPending}
        >
          {isPending ? "Log in account..." : "Log in"}
        </Button>
      </form>
    </AuthLayout>
  );
}
