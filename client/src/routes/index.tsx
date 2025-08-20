import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context: { auth } }) => {
    if (!auth?.user) {
      throw redirect({ to: "/auth/login", search: { redirect: undefined } });
    } else {
      throw redirect({ to: "/book" });
    }
  },
});

