import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { logout } from "@/services/auth.service";

export const Route = createFileRoute("/_authenticated/client/book/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Button
			onClick={async () => {
				await logout();
			}}
		>
			Logout
		</Button>
	);
}
