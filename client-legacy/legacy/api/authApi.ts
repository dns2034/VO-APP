import { AuthResponse, UserRole } from "@/types/auth";
import { generateToken } from "@/utils/jwt";
import supabase from "./supabaseClient";

const hashPassword = async (password: string): Promise<string> => {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	return hashHex;
};

export const signIn = async (
	email: string,
	password: string
): Promise<AuthResponse> => {
	const hashedPassword = await hashPassword(password);
	console.log("Attempting login for:", email); // Debug log

	try {
		// Check client table first
		let { data: client } = await supabase
			.from("clients")
			.select("*")
			.eq("email", email)
			.eq("password", hashedPassword)
			.single();

		if (client) {
			const token = await generateToken({
				id: client.id,
				email: client.email,
				role: UserRole.CLIENT,
				type: "access_token",
			});
			return { ...client, role: UserRole.CLIENT, token };
		}

		// Check operator table if not found in clients
		let { data: operator } = await supabase
			.from("operators")
			.select("*")
			.eq("email", email)
			.eq("password", hashedPassword)
			.single();

		if (operator) {
			const token = await generateToken({
				id: operator.id,
				email: operator.email,
				role: UserRole.SUPERADMIN,
				type: "access_token",
			});
			return { ...operator, role: UserRole.SUPERADMIN, token };
		}

		// Check manager table if not found in operators
		let { data: manager } = await supabase
			.from("managers")
			.select("*")
			.eq("email", email)
			.eq("password", hashedPassword)
			.single();

		if (manager) {
			const token = await generateToken({
				id: manager.id,
				email: manager.email,
				role: UserRole.MANAGER,
				type: "access_token",
			});
			return { ...manager, role: UserRole.MANAGER, token };
		}

		// If we get here, no valid user was found
		console.log("No user found with provided credentials"); // Debug log
		throw new Error("Invalid credentials");
	} catch (error) {
		console.error("Sign in error details:", error); // Detailed error log
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error("Authentication failed");
	}
};

export const signOut = async (): Promise<void> => {
	localStorage.removeItem("isAuthenticated");
	localStorage.removeItem("userRole");
	localStorage.removeItem("userName");
	localStorage.removeItem("userId");
	localStorage.removeItem("token");
};

export const getCurrentUser = async () => {
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();
	if (error) throw error;
	return user;
};

interface PasswordResetResponse {
	data: unknown;
	error: Error | null;
}

export const sendPasswordResetEmail = async (
	email: string
): Promise<PasswordResetResponse> => {
	try {
		const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/reset-password`,
		});

		if (error) throw error;

		return { data, error: null };
	} catch (error) {
		console.error("Password reset error:", error);
		return {
			data: null,
			error: error instanceof Error ? error : new Error("Password reset failed"),
		};
	}
};

export const resetPassword = async (
	newPassword: string
): Promise<PasswordResetResponse> => {
	try {
		const { data, error } = await supabase.auth.updateUser({
			password: newPassword,
		});

		if (error) throw error;

		return { data, error: null };
	} catch (error) {
		console.error("Password update error:", error);
		return {
			data: null,
			error: error instanceof Error ? error : new Error("Password update failed"),
		};
	}
};
