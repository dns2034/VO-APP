export interface Client {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	phone_number?: string;
	password?: string;
	operator_id: string;
	created_at: string;
}

export interface Operator {
	id: string;
	name: string;
	email: string;
	contact_email: string;
	role: string;
	created_at: string;
}

export interface Resource {
	id: string;
	name: string;
	created_at?: string;
}

export interface Availability {
	id: string;
	resource_id: string;
	date: string;
	start_time: string;
	end_time: string;
	created_at: string;
	operator_id: string;
	status: string;
	is_available: boolean;
}

export interface ResourceAvailability {
	id: string;
	date: string;
	resource_id: string;
	from: string;
	to: string;
	created_at: string;
}

export interface Reward {
	id: string;
	name: string;
	description: string;
	price: number;
	created_at: string;
	type: "credits" | "points";
	image_url?: string
}
