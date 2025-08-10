import { Link } from "@tanstack/react-router";
import { Briefcase, Calendar, Gift, Users } from "lucide-react";
import { getAvatarUrl } from "@/services/user.service";
import { useAuthStore } from "@/store/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function BottomTabs() {
  const { user } = useAuthStore();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 w-full bg-background shadow-[0_-2px_4px_rgba(0,0,0,0.1)] px-2 py-2 md:py-3">
      <div className="grid grid-cols-5 gap-2 max-w-lg mx-auto">
        <Link
          to="/refer"
          className="flex flex-col items-center justify-end gap-1 text-xs font-medium text-muted-foreground hover:text-primary focus:text-primary py-1"
        >
          <Users className="size-6" />
          <span className="truncate w-full text-center block">Refer</span>
        </Link>
        <Link
          to="/rewards"
          className="flex flex-col items-center justify-end gap-1 text-xs font-medium text-muted-foreground hover:text-primary focus:text-primary py-1"
        >
          <Gift className="size-6" />
          <span className="truncate w-full text-center block">Rewards</span>
        </Link>
        <div className="flex flex-col items-center justify-end">
          <Link
            to="/book"
            className="flex flex-col items-center justify-end z-[2]"
          >
            <span className="bg-primary size-[60px] rounded-full shadow-lg border-2 border-primary flex items-center justify-center -mt-8">
              <Calendar className="size-7 text-white" />
            </span>
            <span className="block text-xs font-medium text-primary mt-2 pb-1 text-center min-h-[18px]">
              Book
            </span>
          </Link>
        </div>
        <Link
          to="/businesses"
          className="flex flex-col items-center justify-end gap-1 text-xs font-medium text-muted-foreground hover:text-primary focus:text-primary py-1"
        >
          <Briefcase className="size-6" />
          <span className="truncate w-full text-center block">Businesses</span>
        </Link>
        <Link
          to="/profile"
          className="flex flex-col items-center justify-end gap-1 text-xs font-medium text-muted-foreground hover:text-primary focus:text-primary py-1"
        >
          <Avatar className="size-6">
            <AvatarImage
              src={user?.user_metadata.avatar_url ? getAvatarUrl(user?.user_metadata.avatar_url).publicUrl : "/placeholder.png"}
              alt={user?.user_metadata.display_name || "User Avatar"}
            />
            <AvatarFallback>
              {"Placeholder Image"
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span className="truncate w-full text-center block">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
