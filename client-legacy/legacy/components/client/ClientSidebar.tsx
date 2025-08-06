import { FC, useState } from "react";
import { Calendar, Users, User, LogOut, Gift } from "react-feather";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/utils/avatar";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";

const getGravatarUrl = (email: string) => {
  const hash = email.trim().toLowerCase();
  return `https://www.gravatar.com/avatar/${hash}?d=mp`;
};

const ClientSidebar: FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isHovered, setHover] = useState<boolean>(false);

  const links = [
    { to: "/refer", icon: Users, text: "Referral" },
    { to: "/booking", icon: Calendar, text: "Booking" },
    { to: "/rewards", icon: Gift, text: "Rewards" },
  ];

	return (
    <div className="fixed md:sticky top-0 left-0 bottom-0 flex flex-col h-full md:h-auto lg:h-auto bg-[#150c2b] text-white duration-200 group w-24 hover:w-64 z-10"
      onMouseEnter={() => {
      setHover(true)
    }}
      onMouseLeave={() => {
      setHover(false)
    }}>
			{/* Logo */}
			<div className="flex items-center justify-center py-6 select-none">
				<img src="/logo_white.png" alt="" className="w-16 my-4" />
			</div>

      {/* Navigation Links */}
      <ul className="flex flex-col w-full">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `flex h-10 my-2 items-center transition-colors duration-200 ${
                  isActive
                    ? "bg-[#32ffa8] text-[#150c2b] font-extrabold"
                    : "hover:bg-[#47ffb1] hover:text-[#150c2b]"
                }`
              }
            >
              <div className="min-w-[6rem] flex justify-center">
                <link.icon className="h-6 w-6" />
              </div>
              <span className={cn("opacity-0 group-hover:opacity-100 transition-opacity duration-100 font-bold", !isHovered && "hidden")}>
                {link.text}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex-grow" />

      {/* Profile Dropdown with better centering */}
      <div className="w-full px-4 pb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex flex-col items-center hover:bg-[#150c2b] hover:text-none p-2"
            >
              <Avatar className="h-8 w-8 ring-0 ring-offset-0 border-0 select-none">
                {user?.email && (
                  <AvatarImage
                    src={user.profile_pic ?? getGravatarUrl(user?.email)}
                    className="border-0 object-center object-cover"
                  />
                )}
                <AvatarFallback className="border-0">
                  {user
                    ? getInitials(`${user.first_name} ${user.last_name}`)
                    : "??"}
                </AvatarFallback>
              </Avatar>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-100 font-medium mt-1">
                {user ? `${user.first_name} ${user.last_name}` : "Loading..."}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ClientSidebar;
