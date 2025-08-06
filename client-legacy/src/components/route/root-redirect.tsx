import { type FC, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import type { TUserRoleName } from "@/types";

const ROLE_REDIRECT_MAP: Record<TUserRoleName, string> = {
  manager: "/manager/clients",
  superadmin: "/superadmin/users",
  client: "/client/referral",
};

const RootRedirect: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const redirectPath = useMemo(() => {
    if (!user) return "/login";
    return ROLE_REDIRECT_MAP[user.user_role.name as TUserRoleName] || "/login";
  }, [user]);

  useEffect(() => {
    if (user !== undefined) {
      navigate(redirectPath, { replace: true });
    }
  }, [redirectPath, navigate, user]);

  return null;
};

export default RootRedirect;
