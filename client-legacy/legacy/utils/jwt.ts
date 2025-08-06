import { jwtDecode } from "jwt-decode";

const JWT_SECRET = import.meta.env.VITE_JWT_SECRET || "your-secret-key";

export const generateToken = async (payload: any): Promise<string> => {
	const header = {
		alg: "HS256",
		typ: "JWT",
	};

	const now = Math.floor(Date.now() / 1000);
	const expiresIn = 24 * 60 * 60; // 24 hours in seconds

	const finalPayload = {
		...payload,
		exp: now + expiresIn,
		iat: now,
	};

	const base64Header = btoa(JSON.stringify(header));
	const base64Payload = btoa(JSON.stringify(finalPayload));
	const signatureInput = `${base64Header}.${base64Payload}.${JWT_SECRET}`;
	const signature = btoa(signatureInput);

	return `${base64Header}.${base64Payload}.${signature}`;
};

export const verifyToken = async (token: string): Promise<any | null> => {
	try {
		const [header, payload, receivedSignature] = token.split(".");

		// Verify signature
		const expectedSignature = btoa(`${header}.${payload}.${JWT_SECRET}`);
		if (receivedSignature !== expectedSignature) {
			return null;
		}

		const decoded = JSON.parse(atob(payload));
		const now = Date.now() / 1000;

		// Check expiration
		if (decoded.exp && decoded.exp < now) {
			localStorage.clear();
			return null;
		}

		return decoded;
	} catch (error) {
		return null;
	}
};

export const decodeToken = (token: string): any | null => {
	try {
		const [, payload] = token.split(".");
		return JSON.parse(atob(payload));
	} catch {
		return null;
	}
};

interface JWTPayload {
	id: string;
	role: string;
	table: string;
	exp: number;
}

export const getDecodedToken = (): JWTPayload | null => {
	const token = localStorage.getItem("token");
	if (!token) return null;

	try {
		return jwtDecode(token) as JWTPayload;
	} catch (error) {
		console.error("Error decoding token:", error);
		return null;
	}
};
