import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  FileCheck,
  LogOut,
  type LucideIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth-context";
import { getInitials } from "@/utils/avatar";
import { useNavigate } from "react-router-dom";
import type { TUserRoleName } from "@/types";

export function NavUser() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleItemClick = (navigateTo?: string) => {
    if (isMobile) {
      setOpenMobile(false);
    }
    if (navigateTo) navigate(navigateTo);
  };

  const DROPDOWN_MENU_ITEMS: Record<
    TUserRoleName,
    { onClick: () => void; icon: LucideIcon; title: string }[]
  > = {
    client: [
      {
        onClick: () => handleItemClick("/client/notifications"),
        icon: Bell,
        title: "Notifications",
      },
      {
        onClick: () => handleItemClick("/client/documents"),
        icon: FileCheck,
        title: "Documents",
      },
    ],
    superadmin: [],
    manager: [],
  };

  const dropDownMenuItems =
    DROPDOWN_MENU_ITEMS[user?.user_role.name as TUserRoleName];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:!p-0"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  className="object-cover object-center"
                  src={user?.profile_pic}
                  alt={`${user?.first_name} ${user?.last_name}`}
                />
                <AvatarFallback className="rounded-lg">
                  {getInitials(`${user?.first_name} ${user?.last_name}`)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{`${user?.first_name} ${user?.last_name}`}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    className="object-cover object-center"
                    src={user?.profile_pic}
                    alt={`${user?.first_name} ${user?.last_name}`}
                  />
                  <AvatarFallback className="rounded-lg">
                    {getInitials(`${user?.first_name} ${user?.last_name}`)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{`${user?.first_name} ${user?.last_name}`}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleItemClick("/profile")}
              >
                <BadgeCheck />
                Account
              </DropdownMenuItem>

              {dropDownMenuItems.length > 0 &&
                dropDownMenuItems.map((d) => (
                  <DropdownMenuItem
                    key={d.title}
                    className="cursor-pointer"
                    onClick={d.onClick}
                  >
                    <d.icon />
                    {d.title}
                  </DropdownMenuItem>
                ))}
              {/* <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/notifications")}
              >
                <Bell />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleDocumentClick}
              >
                <FileCheck />
                Documents
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
