import supabase from "./supabaseClient";
import { Credit } from "@/types/credit";

export type CreditStatus = "ACTIVE" | "EXPIRED" | "USED";

export interface CreditFilters {
	status?: CreditStatus | undefined;
	sortDirection?: "asc" | "desc";
	page?: number;
	pageSize?: number;
}

export interface CreditResponse {
	data: Credit[];
	total: number;
}

export const getClientCredits = async (
	clientId: string,
	filters: CreditFilters = {}
): Promise<CreditResponse> => {
	try {
		console.log("Fetching credits with filters:", filters); // Add debug log
		const { status, sortDirection = "asc", page = 1, pageSize = 5 } = filters;

		let query = supabase
			.from("credits")
			.select("*", { count: "exact" })
			.eq("client_id", clientId);

		// Apply status filter if provided
		if (status) {
			query = query.eq("status", status);
		}

		// Apply sorting
		query = query.order("expiry_date", { ascending: sortDirection === "asc" });

		// Apply pagination
		const from = (page - 1) * pageSize;
		const to = from + pageSize - 1;
		query = query.range(from, to);

		console.log("Executing query..."); // Add debug log
		const { data, error, count } = await query;

		if (error) {
			console.error("Supabase error:", error); // Add error log
			throw error;
		}

		console.log("Query result:", { data, count }); // Add debug log

		return {
			data: (data || []) as Credit[],
			total: count || 0,
		};
	} catch (error) {
		console.error("Error fetching credits:", error);
		throw error;
	}
};
