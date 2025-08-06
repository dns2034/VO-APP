import supabase from "./supabaseClient";
import { Booking } from "@/types/booking";

export const createBooking = async (
	booking: Omit<Booking, "id" | "status" | "resources">
): Promise<Booking[]> => {
	const clientId = localStorage.getItem("userId");
	if (!clientId) throw new Error("User not authenticated");

	const { error: insertError } = await supabase.from("bookings").insert([
		{
			...booking,
			status: "BOOKED",
			client_id: clientId,
			remarks: booking.remarks, // Add remarks to the insert
		},
	]);

	if (insertError) throw insertError;

	const { data, error: fetchError } = await supabase
		.from("bookings")
		.select(
			`
            date,
            start_time,
            end_time,
            resource_id,
            status,
            resources:resource_id (
                id,
                name
            )
        `
		)
		.eq("date", booking.date);

	if (fetchError) throw fetchError;
	return (data || []) as unknown as Booking[];
};

export const getBookingsByDate = async (date: string): Promise<Booking[]> => {
	const { data, error } = await supabase
		.from("bookings")
		.select(
			`
            date,
            start_time,
            end_time,
            resource_id,
            status,
            resources:resource_id (
                id,
                name
            )
        `
		)
		.eq("date", date);

	if (error) throw error;
	return (data || []) as unknown as Booking[];
};