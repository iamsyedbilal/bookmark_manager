import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "./auth.service";
import { toast } from "sonner";

// Signup Mutation
export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupUser,
    onSuccess: (user) => {
      console.log(user);
      toast.success("Account created successfully!");
      navigate("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { signup, isPending };
}

// Login Mutation
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { login, isPending };
}

// Logout Mutation
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      navigate("/login");
    },
  });

  return { logout, isPending };
}

// Current User
export function useUser() {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
  });

  return { user, isPending };
}
