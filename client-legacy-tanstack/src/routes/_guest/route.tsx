import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest")({
  beforeLoad: async ({ context }) => {
    console.log('user from _guest', context.auth?.user)
    if (context.auth?.user !== null) {
      throw redirect({ to: "/" });
    }
  },
});
