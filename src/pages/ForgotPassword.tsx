import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "../components/ui/auth/auth.schema";
import supabase from "../lib/supabase";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(values: ForgotPasswordValues) {
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Password reset link sent to email");
  }

  return (
    <div className="flex bg-accent dark:bg-background min-h-screen items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 rounded-xl border bg-background p-6">
        <h1 className="text-xl font-semibold">Forgot Password</h1>

        <div>
          <Input
            className="w-full rounded-md border p-2"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <Button
          disabled={isSubmitting}
          className="w-full rounded-md bg-primary p-2 text-white">
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </div>
  );
}
