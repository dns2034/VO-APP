"use client";

import BottomBar from "@/components/bottom-bar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabaseClient } from "@/services/supabase/client";
import { useAuthStore } from "@/store/useAuthStore";
import { User2, Pen, ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user } = useAuthStore();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut({ scope: "local" });

    if (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
      throw new Error(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex flex-row items-center bg-white text-gray-900 p-4">
          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="font-bold text-lg flex items-center gap-2">
              Profile
            </h1>
            <p className="text-xs text-gray-500">
              Manage your profile and account settings.
            </p>
          </div>
        </header>
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
              href="/profile/edit"
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
              onClick={() => handleLogout()}
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
        <BottomBar />
      </div>
    </>
  );
}
