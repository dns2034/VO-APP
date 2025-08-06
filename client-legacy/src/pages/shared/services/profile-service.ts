import supabase from "@/config/supabase-client";
import type { requestValidator } from "@/lib/validator";
import type { TUserProfile } from "@/types";
import type { z } from "zod";

export const updateProfile = async ({
	values,
	userId,
}: {
	values: z.infer<typeof requestValidator.updateProfile>;
	userId: string;
}) => {
	const { firstName, lastName } = values;

	const { error, data } = await supabase
		.from("user_profiles")
		.update({ first_name: firstName, last_name: lastName })
		.eq("user_id", userId)
		.select()
		.single();

	if (error) throw new Error(error.message);

	return data;
};

export const updatePassword = async (
	values: z.infer<typeof requestValidator.changePassword>
) => {
	const { password } = values;

	const { error, data } = await supabase.auth.updateUser({
		password: password,
	});

	if (error) throw new Error(error.message);

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

export const getAvatarUrl = (profilePicPath: string) => {
	const { data } = supabase.storage
		.from("avatars")
		.getPublicUrl(profilePicPath);

	if (!data) throw new Error("Error fetching avatar URL");

	return data;
};

export const updateAvatar = async ({
	userId,
	profilePicPath,
}: {
	userId: string;
	profilePicPath: string | null;
}) => {
	const { error } = await supabase
		.from("user_profiles")
		.update({ profile_pic: profilePicPath })
		.eq("user_id", userId)
		.select()
		.single();

	if (error) throw new Error(error.message);
};

export const deleteAvatar = async ({
	profilePicUrl,
}: {
	profilePicUrl: string;
}) => {
	const urlParts = new URL(profilePicUrl);
	const profilePicPath = urlParts.pathname.replace(
		"/storage/v1/object/public/avatars/",
		""
	);

	const { error } = await supabase.storage
		.from("avatars")
		.remove([profilePicPath]);

	if (error) throw new Error(error.message);
};

export const getUserProfile = async (
	userId: string
): Promise<TUserProfile | null> => {
	if (!userId) return null;

	const { data, error } = await supabase
		.from("user_profiles")
		.select("*")
		.eq("user_id", userId)
		.single();

	if (error) {
		// It's often okay if a profile doesn't exist initially, handle specific errors if needed
		if (error.code === "PGRST116") {
			// PostgREST error code for "exactly one row expected, zero rows found"
			console.warn(`No profile found for user ID: ${userId}`);
			return null;
		}
		console.error("Error fetching user profile:", error);
		throw new Error(`Failed to fetch user profile: ${error.message}`);
	}

	return data;
};
