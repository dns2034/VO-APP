import type { LoginField } from "@/lib/validator";
import type {
  AuthError,
  Session,
  User,
  WeakPassword,
} from "@supabase/supabase-js";
import { createContext, useContext } from "react";

export interface IUserProfile {
  first_name: string;
  last_name: string;
  user_role: {
    id: string;
    name: string;
  };
  profile_pic?: string;
  referral_code: string | null;
  
  organization_id: string | null;
}

export type TUser = (User & IUserProfile) | null | undefined;

export interface IAuthContext {
  session: Session | null;
  logout: () => Promise<
    | { error: AuthError; message: undefined }
    | { error: undefined; message: string }
  >;
  login: (credentials: LoginField) => Promise<
    | {
        error: AuthError;
        data?: undefined;
      }
    | {
        data: {
          user: User;
          session: Session;
          weakPassword?: WeakPassword;
        };
        error?: undefined;
      }
  >;
  user: TUser;
  updateUser: (user: TUser) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
