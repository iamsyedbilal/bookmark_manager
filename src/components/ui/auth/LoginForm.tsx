import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "./auth.schema";

import { Input } from "../input";
import { Label } from "../label";
import { Button } from "../button";
import AuthLayout from "./AuthLayout";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    console.log(data);
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email address *</Label>

          <Input
            id="email"
            type="email"
            className="h-10"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>

          <Input
            id="password"
            type="password"
            className="h-10"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="h-10 w-full text-base font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Log in account..." : "Log in"}
        </Button>
      </form>
    </AuthLayout>
  );
}
