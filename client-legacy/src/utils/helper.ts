import supabase from "@/config/supabase-client";
import type { IUserProfile } from "@/contexts/auth-context";
import { format, parse } from "date-fns";
import { toast } from "sonner";

export const fetchUserProfileWithRoleById = async (userId: string) => {
  const { data: profileQueryData, error: profileQueryError } = await supabase
    .from("user_profiles")
    .select(
      "first_name, last_name, profile_pic, referral_code, role: user_roles(id, name), organization_id"
    )
    .eq("user_id", userId)
    .single();

  if (profileQueryError) {
    console.error("Error fetching user profile data:", profileQueryError);
    return { error: profileQueryError };
  }

  const profile: IUserProfile = {
    first_name: profileQueryData.first_name,
    last_name: profileQueryData.last_name,
    user_role: Array.isArray(profileQueryData.role)
      ? profileQueryData.role[0]
      : profileQueryData.role,
    profile_pic: profileQueryData.profile_pic || undefined,

    referral_code: profileQueryData.referral_code,
    organization_id: profileQueryData.organization_id,
  };

  return { profile };
};

export const formatCurrency = (
  value: number,
  currency: "credits" | "points"
) => {
  if (value === 1) {
    return `1 ${currency}`;
  }
  return `${value} ${currency}s`;
};

export const getGravatarUrl = (email: string) => {
  const hash = email.trim().toLowerCase();
  return `https://www.gravatar.com/avatar/${hash}?d=mp`;
};

export const convertToAMPM = (time: string) => {
  const parsedTime = parse(time, "HH:mm:ss", new Date());
  return format(parsedTime, "h:mm a");
};

export const handleMutationError = (error: unknown) => {
  toast.error("Error", {
    description: error instanceof Error ? error.message : "An error occurred",
  });
};
