import supabase from "../../lib/supabase";
import type {
  LoginFormData,
  SignupFormData,
} from "../../components/ui/auth/auth.schema";

// Login
export async function loginUser(data: LoginFormData) {
  const { data: userData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) throw new Error(error.message);

  return userData;
}

// Signup
export async function signupUser(data: SignupFormData) {
  const { data: userData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.fullName,
      },
    },
  });

  if (error) throw new Error(error.message);

  return userData;
}

// Logout
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

// Current User
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}
