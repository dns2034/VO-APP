import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    console.log(
      context.authStore.getState().user,
      "user from context b4 load, _auth"
    );
    if (context.authStore.getState().user === null) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
