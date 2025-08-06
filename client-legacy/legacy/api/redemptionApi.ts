import supabase from "./supabaseClient";

export const redeemReward = async (
	clientId: string,
	rewardId: string,
	quantity: number = 1
) => {
	const { data: reward } = await supabase
		.from("rewards")
		.select("price")
		.eq("id", rewardId)
		.single();

	if (!reward) throw new Error("Reward not found");

	const { error } = await supabase.rpc("redeem_reward", {
		p_client_id: clientId,
		p_reward_id: rewardId,
		p_price: reward.price,
		p_quantity: quantity,
		p_expires_days: 30, // Configurable expiration period
	});

	if (error) throw error;
};
