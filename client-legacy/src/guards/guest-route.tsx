import { useAuth } from "@/contexts/auth-context";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute() {
  const { user } = useAuth();

  return user === null ?  <Outlet /> : <Navigate to="/" replace />;
}
