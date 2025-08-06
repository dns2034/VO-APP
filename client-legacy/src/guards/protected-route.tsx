import { useAuth } from "@/contexts/auth-context";
import type { TUserRoleName } from "@/types";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({
  allowedRoles,
}: {
  allowedRoles: (TUserRoleName | "*")[];
}) {
  const { user } = useAuth();
  const location = useLocation();

  if (
    user === null ||
    !user?.user_role ||
    (!allowedRoles.includes(user?.user_role.name as TUserRoleName) &&
      !allowedRoles.includes("*"))
  ) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className="flex-1 flex justify-center items-center">
      <Outlet />
    </div>
  );
}
