import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ChevronRight, LogOut, Pen } from "lucide-react";
import { toast } from "sonner";
import AppHeader from "@/components/app-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export const Route = createFileRoute("/_authenticated/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await logout();

    if (error) {
      toast.error("Failed to log out");
    } else {
      router.navigate({ to: "/auth/login", search: { redirect: undefined } });
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background">
        <AppHeader
          title="Profile"
          description="Manage your profile and account settings."
        />
        <main className="flex-1 flex flex-col gap-0 p-4 lg:p-6 max-w-2xl w-full mx-auto">
          <div className="flex flex-col items-center">
            <div className="relative flex flex-col gap-4 mb-6 items-center justify-center font-semibold">
              <div className="relative group">
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 rounded-full transition-all duration-300" />

                <Avatar className="h-32 w-32 border-4 border-background shadow-md">
                  <AvatarImage
                    className="object-cover object-center"
                    src={user?.user_metadata.avatar_url || "/placeholder.png"}
                    alt={user?.user_metadata.display_name || "User Avatar"}
                  />
                  <AvatarFallback>User&apos;s avatar</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex items-center justify-center flex-col">
                <h1 className="text-lg">{user?.user_metadata.display_name}</h1>
                <span className="text-muted-foreground text-xs">
                  {user?.email}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-border px-4 py-2">
            <Link
              to="/profile/edit"
              className="w-full flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-8 rounded-lg bg-violet-100 items-center justify-center">
                  <Pen className="size-4 text-violet-700" />
                </div>
                <span className="text-sm">Edit Profile</span>
              </div>
              <ChevronRight className="size-3" />
            </Link>
            <button
              type="button"
              className="w-full flex items-center justify-between py-2 border-t"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-3">
                <div className="flex size-8 rounded-lg bg-red-100 items-center justify-center">
                  <LogOut className="size-4 text-red-700" />
                </div>
                <span className="text-sm">Logout</span>
              </div>
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
