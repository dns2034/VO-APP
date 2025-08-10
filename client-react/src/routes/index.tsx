import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth.store";

export const Route = createFileRoute("/")({
  // component: RouteComponent,
  beforeLoad: ({ context: { auth } }) => {
    if (!auth?.user) {
      throw redirect({ to: "/auth/login", search: { redirect: undefined } });
    } else {
      throw redirect({ to: "/client/book" });
    }
  },
});
// function RouteComponent() {
//   const { user } = useAuthStore();

//   if (user === undefined) return <h1>Loading...</h1>;

//   return user ? <Navigate to="/client/book" /> : <Navigate to="/auth/login" />;
// }
