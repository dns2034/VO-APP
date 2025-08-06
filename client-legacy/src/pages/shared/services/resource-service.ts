import supabase from "@/config/supabase-client";
import type { TResource, TResourceInstance } from "@/types";
// Define TLocation based on the structure in supabase-client.ts
type TLocation = {
	id: string;
	created_at: string;
	name: string;
	organization_id: string | null;
	latitude: number | null;
	longitude: number | null;
};

// New function to fetch locations by organization
export const getLocationsByOrganization = async (
	organizationId: string | null | undefined
): Promise<TLocation[]> => {
	// Use TLocation[] as the return type

	if (!organizationId) {
		return [];
	}
	const { data, error } = await supabase
		.from("locations")
		// Explicitly type the select call
		.select<"*", TLocation>("*")
		.eq("organization_id", organizationId)
		.order("name", { ascending: true });

	if (error) {
		console.error("Error fetching locations:", error);
		throw new Error(`Failed to fetch locations: ${error.message}`);
	}
	// The data should now correctly be typed as TLocation[]
	return data || [];
};

export const getResources = async ({
	isAvailable,
	locationId, // Add locationId parameter
}: {
	isAvailable?: boolean;
	locationId?: string | null; // Make locationId optional
} = {}): Promise<TResource[]> => {
	// Explicit return type
	let query = supabase.from("resources").select<"*", TResource>("*"); // Explicit type for select

	if (isAvailable !== undefined) {
		query = query.eq("isAvailable", isAvailable);
	}

	// Add filtering by locationId if provided
	if (locationId) {
		query = query.eq("location_id", locationId);
	}
	// Removed the early return: else { return []; }
	// Let the query execute even without locationId if needed,
	// control fetching via the `enabled` option in useQuery.

	const { data, error } = await query;
	if (error) throw error;
	return data || []; // Type should now be inferred correctly
};

export const getResourceInstances = async (
	resourceId: string | null | undefined
): Promise<TResourceInstance[]> => {
	// Restore original return type
	// Use the alias
	if (!resourceId) {
		return []; // Return empty array if no resourceId is provided
	}

	const { data, error } = await supabase
		.from("resource_instances") // Keep the table name
		.select<"*", TResourceInstance>("*") // Restore explicit type parameter
		.eq("resource_id", resourceId)
		.order("name", { ascending: true }); // Optional: order by name

	if (error) {
		console.error("Error fetching resource instances:", error);
		throw new Error(`Failed to fetch resource instances: ${error.message}`);
	}

	return data || []; // Type should now be TResourceInstance[]
};
