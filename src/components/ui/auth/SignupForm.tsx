import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "./auth.schema";
import { useSignup } from "../../../features/auth/auth.queries";

import { Input } from "../input";
import { Label } from "../label";
import { Button } from "../button";
import AuthLayout from "./AuthLayout";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const { signup, isPending } = useSignup();

  function onSubmit(data: SignupFormData) {
    signup(data, {
      onSettled: () => reset(),
    });
  }

  return (
    <AuthLayout
      title="Create your account"
      description="Join us and start saving your favorite links — organized, searchable, and always within reach."
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkTo="/login"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-card ">
        {/* Full Name */}
        <div className="space-y-2">
          <Label
            htmlFor="fullName"
            className="text-sm font-medium text-foreground"
          >
            Full name *
          </Label>

          <Input
            id="fullName"
            className="h-11 border-border bg-background focus-visible:ring-primary"
            {...register("fullName")}
            disabled={isPending}
          />

          {errors.fullName && (
            <p className="text-sm text-destructive">
              {errors.fullName.message}
            </p>
          )}
        </div>

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
          {isPending ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthLayout>
  );
}
