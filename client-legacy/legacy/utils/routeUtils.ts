export const getDefaultRoute = (role: string): string => {
	switch (role) {
		case "MANAGER":
			return "/operator-management";
		case "OPERATOR":
			return "/clients";
		case "CLIENT":
			return "/refer";
		default:
			return "/refer";
	}
};
