import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "../components/ui/auth/auth.schema";
import supabase from "../lib/supabase";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function ResetPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(values: ResetPasswordValues) {
    const { error } = await supabase.auth.updateUser({
      password: values.password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Password updated successfully");
    navigate("/login");
  }

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        console.log("Recovery session detected");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex bg-accent dark:bg-background min-h-screen items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 rounded-xl border bg-background p-6">
        <h1 className="text-xl font-semibold">Reset Password</h1>

        <div>
          <Input
            type="password"
            className="w-full rounded-md border p-2"
            placeholder="New password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type="password"
            className="w-full rounded-md border p-2"
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />
          <p className="text-sm text-destructive">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <Button
          disabled={isSubmitting}
          className="w-full rounded-md bg-primary p-2 text-white">
          {isSubmitting ? "Updating..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
