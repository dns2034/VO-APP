// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { AppContext } from "@/lib/app-context";

export const Route = createRootRouteWithContext<AppContext>()({
  component: () => (
    <>
      <Outlet />
      {/* {import.meta.env.DEV && (
        <>
          <ReactQueryDevtools position="right" />
          <TanStackRouterDevtools position="bottom-left" />
        </>
      )} */}
    </>
  ),
});
