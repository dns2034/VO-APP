import supabase from "./supabaseClient";
import { Availability } from "@/types/operator";

export const getResourceAvailabilities = async (resourceId: string) => {
	const { data, error } = await supabase
		.from("availability")
		.select("*")
		.eq("resource_id", resourceId)
		.order("date", { ascending: true });

	if (error) throw error;
	return data || [];
};

export const createAvailability = async (
	availability: Omit<Availability, "id">
) => {
	const { data, error } = await supabase
		.from("availability")
		.insert([availability])
		.select();

	if (error) throw error;
	return data[0];
};

export const updateAvailability = async (
	id: string,
	availability: Partial<Availability>
) => {
	const { data, error } = await supabase
		.from("availability")
		.update(availability)
		.eq("id", id)
		.select();

	if (error) throw error;
	return data[0];
};

export const deleteAvailability = async (id: string) => {
	const { error } = await supabase.from("availability").delete().eq("id", id);

	if (error) throw error;
};
