import supabase from "./supabaseClient";

export const redeemReward = async (clientId: string, rewardId: string) => {
	const expiresAt = new Date();
	expiresAt.setDate(expiresAt.getDate() + 30);

	const { data, error } = await supabase
		.from("redemptions")
		.insert([
			{
				client_id: clientId,
				reward_id: rewardId,
			},
		])
		.select()
		.single();

	if (error) throw error;
	return data;
};
