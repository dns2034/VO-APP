import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import BottomTabs from "@/components/bottom-tabs";

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    console.log("user from _authenticated", context.auth?.user);
    if (context.auth?.user === null) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: `${location.pathname}${location.search}`,
        },
      });
    }
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
      <BottomTabs />
    </>
  );
}
