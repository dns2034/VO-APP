import supabase from "@/config/supabase-client";
import type { ProfileSchema } from "@/lib/zod-schemas";

export const deleteAvatar = async ({ avatarUrl }: { avatarUrl: string }) => {
  const { error: metaDataError } = await supabase.auth.updateUser({
    data: { avatar_url: null },
  });

  if (metaDataError) throw new Error(metaDataError.message);

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .remove([avatarUrl]);

  if (storageError) throw new Error(storageError.message);
};

export const updateUserProfile = async (formValues: ProfileSchema) => {
  const { data, error } = await supabase.auth.updateUser({
    data: {
      display_name: formValues.name,
    },
    phone: formValues.phone,
  });

  return { data, error };
};

export const getAvatarUrl = (avatarPath: string) => {
  const { data } = supabase.storage.from("avatars").getPublicUrl(avatarPath);

  if (!data) throw new Error("Error fetching avatar URL");

  return data;
};

export const uploadAvatar = async ({
  path,
  file,
  upsert = true,
}: {
  path: string;
  file: File;
  upsert?: boolean;
}) => {
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(path, file, {
      upsert,
    });

  if (error) throw new Error(error.message);

  return data;
};

export const updateAvatar = async ({
  avatarPath,
}: {
  avatarPath: string | null;
}) => {
  const { error } = await supabase.auth.updateUser({
    data: { avatar_url: avatarPath },
  });

  if (error) throw new Error(error.message);
};
