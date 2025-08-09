import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import supabase from "@/config/supabase-client";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const { authStore } = Route.useRouteContext();
	const { setUser } = authStore();

	useEffect(() => {
		const { data: authStateChange } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				if (!session) {
					setUser(null);
				} else {
					setUser(session.user);
				}
			},
		);

		supabase.auth.getSession().then(({ data }) => {
			if (data.session) {
				setUser(data.session.user);
			} else {
				setUser(null);
			}
		});

		return () => {
			authStateChange.subscription.unsubscribe();
		};
	}, [setUser]);

	return <Outlet />;
}
