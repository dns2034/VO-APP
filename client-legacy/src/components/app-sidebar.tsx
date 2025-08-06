import {
  Box,
  Building2,
  Calendar,
  CircleUserRound,
  File,
  Gift,
  type LucideIcon,
  Settings,
  SquareUserRound,
  Ticket,
  Tickets,
  User2,
  UserCog,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
import type * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth-context";
import type { TUserRoleName } from "@/types";

const NAV_ITEMS: Record<
  TUserRoleName,
  { url: string; icon: LucideIcon; title: string; isActive?: boolean }[]
> = {
  client: [
    { url: "/client/referral", icon: Users, title: "Referral", isActive: true },
    { url: "/client/booking", icon: Calendar, title: "Booking" },
    { url: "/client/rewards", icon: Gift, title: "Rewards" },
    { url: "/client/engagements", icon: Gift, title: "Engagements" },
  ],
  superadmin: [
    { url: "/superadmin/users", icon: Users, title: "Users" },
    { url: "/superadmin/clients", icon: User2, title: "Clients" },
    { url: "/superadmin/referrals", icon: UserPlus, title: "Referrals" },
    // { url: "/superadmin/bookings", icon: CalendarDays, title: "Bookings" },
    { url: "/superadmin/managers", icon: UserCog, title: "Managers" },
    {
      url: "/superadmin/organizations",
      icon: Building2,
      title: "Organizations",
    },
    { url: "/superadmin/voucher", icon: Ticket, title: "Voucher" },
    // { url: "/superadmin/settings", icon: Settings, title: "Settings" },
  ],
  manager: [
    { url: "/manager/clients", icon: CircleUserRound, title: "Clients" },
    {
      url: "/manager/bookings",
      icon: Calendar,
      title: "Bookings",
    },
    { url: "/manager/resources", icon: Box, title: "Resources" },
    { url: "/manager/documents", icon: File, title: "Documents" },
    { url: "/manager/vouchers", icon: Tickets, title: "Vouchers" },
    { url: "/manager/subscriptions", icon: Wallet, title: "Subscriptions" },
    {
      url: "/manager/rewards-and-referrals",
      icon: SquareUserRound,
      title: "Rewards & Referrals",
    },
    { url: "/manager/settings", icon: Settings, title: "Settings" },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  const navItems = NAV_ITEMS[user?.user_role.name as TUserRoleName] || [];
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex w-full items-center justify-center">
            <img
              src="/logo_white.png"
              alt="Incub8Space Logo"
              className="size-20 self-center select-none object-contain"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
