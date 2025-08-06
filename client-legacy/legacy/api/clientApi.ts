import { TReferralSortField, TSortDirection } from "@/lib/types";
import supabase from "./supabaseClient";
import { Client } from "@/types/operator";
import { hashPassword } from "@/utils/auth";

export const getClients = async (): Promise<Client[]> => {
	const operatorId = localStorage.getItem("userId");

	const { data, error } = await supabase
		.from("clients")
		.select(
			"id, first_name, last_name, email, phone_number, operator_id, created_at"
		)
		.eq("operator_id", operatorId)
		.order("created_at", { ascending: false });

	if (error) throw error;
	return data || [];
};

export const createClient = async (
	client: Omit<Client, "id" | "created_at">
) => {
	const hashedPassword = await hashPassword(client.password!);

	// Simplified insert without any ID handling - let Supabase/Postgres handle it
	const { data, error } = await supabase.from("clients").insert({
		first_name: client.first_name,
		last_name: client.last_name,
		email: client.email,
		phone_number: client.phone_number,
		password: hashedPassword,
		operator_id: client.operator_id,
	});

	if (error) {
		console.error("Supabase error:", error);
		throw error;
	}
	return data;
};

export const updateClient = async (id: string, client: Partial<Client>) => {
	const updateData: any = { ...client };

	if (client.password) {
		updateData.password = await hashPassword(client.password);
	}

	delete updateData.id;
	delete updateData.created_at;

	const { data, error } = await supabase
		.from("clients")
		.update(updateData)
		.eq("id", id);

	if (error) throw error;
	return data;
};

export const deleteClient = async (id: string) => {
	const { error } = await supabase.from("clients").delete().eq("id", id);

	if (error) throw error;
};

export const getClientProfile = async (clientId: string) => {
	const { data, error } = await supabase
		.from("clients")
		.select("first_name, last_name, email") // Remove avatar_url
		.eq("id", clientId)
		.single();

	if (error) throw error;
	return data;
};

export const getFullProfile = async (clientId: string) => {
	const { data, error } = await supabase
		.from("clients")
		.select("id, first_name, last_name, email, phone_number")
		.eq("id", clientId)
		.single();

	if (error) throw error;
	return data;
};

export const updateProfile = async (
	clientId: string,
	updates: {
		first_name?: string;
		last_name?: string;
		phone_number?: string;
	}
) => {
	const { data, error } = await supabase
		.from("clients")
		.update(updates)
		.eq("id", clientId)
		.select()
		.single();

	if (error) throw error;
	return data;
};

export const updatePassword = async (clientId: string, newPassword: string) => {
	const hashedPassword = await hashPassword(newPassword);

	const { data, error } = await supabase
		.from("clients")
		.update({ password: hashedPassword })
		.eq("id", clientId)
		.select()
		.single();

	if (error) throw error;
	return data;
};

export const getClientCredits = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("credits")
      .select("*")
      .eq("user_id", userId) 
      .order("created_at", { ascending: false });

    if (error) throw error;

    console.log("Fetched Credits:", data); // Debugging

    const counts = {
      active: data?.filter((credit) => credit.status === "ACTIVE").length || 0,
      used: data?.filter((credit) => credit.status === "USED").length || 0,
      expired: data?.filter((credit) => credit.status === "EXPIRED").length || 0,
    };

    console.log("Counts:", counts); // Debugging

    return { data, counts };
  } catch (error) {
    console.error("Error fetching client credits:", error);
    throw error;
  }
};



export const getClientPoints = async (userId: string) => {
	try {
	  const { data, error } = await supabase
		.from("points")
		.select("*")
		.eq("user_id", userId) 
		.order("created_at", { ascending: false });
  
	  if (error) throw error;
  
	  const counts = {
		active: data?.filter((point) => point.status === "ACTIVE").length || 0,
		used: data?.filter((point) => point.status === "USED").length || 0,
		expired: data?.filter((point) => point.status === "EXPIRED").length || 0,
	  };
  
	  return { data, counts };
	} catch (error) {
	  console.error("Error fetching client points:", error);
	  throw error;
	}
  };
export const getClientRedemptions = async (clientId: string) => {
	const { data, error } = await supabase
		.from("redemptions")
		.select(
			`
      *,
      reward:rewards (*)
    `
		)
		.eq("client_id", clientId)
		.order("redeemed_at", { ascending: false });

	if (error) throw error;
	return data;
};

export const redeemReward = async (
	clientId: string,
	rewardId: string,
	quantity: number = 1
) => {
	// Generate a unique voucher code
	const voucherCode = Math.random().toString(36).substr(2, 8).toUpperCase();

	const { data, error } = await supabase.from("redemptions").insert([
		{
			client_id: clientId,
			reward_id: rewardId,
			quantity,
			voucher_code: voucherCode,
		},
	]);

	if (error) throw error;
	return data;
};

export const getClientReferralCount = async (userId: string): Promise<number> => {
	const { count, error } = await supabase
	  .from("referrals")
	  .select("*", { count: "exact", head: true })
	  .eq("user_id", userId) 

	if (error) throw error;
	return count || 0;
  };
  
  
  export const getClientReferrals = async (
	userId: string,
	options: {
		page: number;
		pageSize: number;
		status?: "PENDING" | "SUCCESS"; 
		sortField: TReferralSortField;
		sortDirection: TSortDirection;
	  
	}
  ): Promise<{ data: any[]; total: number }> => {
	let query = supabase
	  .from("masked_referrals")
	  .select("masked_client_name, status, created_at", { count: "exact" })
	  .eq("user_id", userId) 
	  .order("created_at")
  
	if (options.status) {
	  query = query.eq("status", options.status);
	}
  
	const start = (options.page - 1) * options.pageSize;
	const end = start + options.pageSize - 1;
  
	const { data, error, count } = await query.range(start, end);
  
	if (error) throw error;
	return { data: data || [], total: count || 0 };
  };

  
export const getUserReferralCode = async (userId: string): Promise<string | null> => {
	try {
	  const { data, error } = await supabase
		.from("user_profiles")
		.select("referral_code")
		.eq("user_id", userId) 
		.single();
  
	  if (error) throw error;
	  return data?.referral_code || null;
	} catch (error) {
	  console.error("Error fetching referral code:", error);
	  return null;
	}
};
