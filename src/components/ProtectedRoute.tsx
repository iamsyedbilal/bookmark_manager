import { Navigate } from "react-router-dom";
import { useUser } from "../features/auth/auth.queries";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isPending } = useUser();

  if (isPending) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
