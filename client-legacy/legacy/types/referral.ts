export type Referral = {
	id: string | number;
	masked_client_name: string; // Add this field
	status: "PENDING" | "SUCCESS"; // Update the status values
	created_at: string; // Add this field
	description: string;
	code: string;
	date: string | Date;
  };