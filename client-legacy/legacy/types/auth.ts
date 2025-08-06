export enum UserRole {
	CLIENT = "client",
	SUPERADMIN = "superadmin",
	MANAGER = "manager",
}

export interface BaseUser {
	id: string;
	email: string;
	password: string;
	name: string;
	created_at: string;
}

export interface AuthResponse {
	id: string;
	email: string;
	role: UserRole;
	name?: string;
	token: string;
}
