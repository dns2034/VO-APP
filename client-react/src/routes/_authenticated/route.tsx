import {
  createFileRoute,
  Outlet,
  redirect,
  useMatchRoute,
} from "@tanstack/react-router";
import BottomTabs from "@/components/bottom-tabs";
import type { FileRouteTypes } from "@/routeTree.gen";

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
  const matchRoute = useMatchRoute();

  // add the path if you want to hide the bottom tabs
  const hideNavRoutes: FileRouteTypes["fullPaths"][] = ["/profile/edit"];

  const matchedNoNavRoutes = hideNavRoutes.some((route) =>
    matchRoute({ to: route })
  );
  return (
    <>
      <Outlet />
      {!matchedNoNavRoutes && <BottomTabs />}
    </>
  );
}
