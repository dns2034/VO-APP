import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { logout } from "@/services/auth.service";

export const Route = createFileRoute("/_authenticated/client/book/")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await logout();
        console.log("logged out");
        router.navigate({ to: "/auth/login", search: { redirect: undefined } });
      }}
    >
      Logout
    </Button>
  );
}
