import supabase from "./supabaseClient";

export const getResourceCategories = async () => {
	const { data, error } = await supabase
		.from("resources")
		.select("name")
		.eq("isAvailable", true);

	if (error) throw error;

	// Get unique categories from resource names
	const categories =
		data?.map((item) => {
			const name = item.name.toLowerCase();
			return name.includes("meeting") || name.includes("room")
				? "meeting"
				: "desk";
		}) || [];

	return [...new Set(categories)];
};

export const getAvailableResources = async () => {
	const { data, error } = await supabase
		.from("resources")
		.select("id, name, isAvailable, created_at")
		.eq("isAvailable", true);

	if (error) throw error;
	return data || [];
};

export const getAllResources = async () => {
	const { data, error } = await supabase
		.from("resources")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) throw error;
	return data || [];
};

export const createResource = async (name: string) => {
	const { data, error } = await supabase
		.from("resources")
		.insert([{ name }])
		.select();

	if (error) throw error;
	return data[0];
};

export const updateResource = async (id: string, name: string) => {
	const { data, error } = await supabase
		.from("resources")
		.update({ name })
		.eq("id", id)
		.select();

	if (error) throw error;
	return data[0];
};

export const deleteResource = async (id: string) => {
	const { error } = await supabase.from("resources").delete().eq("id", id);

	if (error) throw error;
};
