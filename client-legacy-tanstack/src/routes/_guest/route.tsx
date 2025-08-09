import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest")({
  beforeLoad: async ({ context }) => {
    if (context.authStore.getState().user !== null) {
      throw redirect({ to: "/" });
    }
  },
});
