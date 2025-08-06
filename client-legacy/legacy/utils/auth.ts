/**
 * Hashes a password using SHA-256
 * @param password The plain text password to hash
 * @returns A promise that resolves to the hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
	return hashHex;
};

/**
 * Verifies a password against a hash
 * @param password The plain text password to verify
 * @param hash The hash to verify against
 * @returns A promise that resolves to true if the password matches
 */
export const verifyPassword = async (
	password: string,
	hash: string
): Promise<boolean> => {
	const hashedPassword = await hashPassword(password);
	return hashedPassword === hash;
};

interface DecodedToken {
	id: string;
	email: string;
	table: string;
	iat: number;
	exp: number;
}

export const getDecodedToken = (): DecodedToken | null => {
	const token = localStorage.getItem("token");
	if (!token) return null;

	try {
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
				.join("")
		);

		return JSON.parse(jsonPayload);
	} catch (error) {
		console.error("Error decoding token:", error);
		return null;
	}
};
