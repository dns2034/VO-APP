import type { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RootRedirect from "@/components/route/root-redirect";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/providers/auth-provider";
import { SidebarProvider } from "./components/ui/sidebar";
import GuestRoute from "./guards/guest-route";
import ProtectedRoute from "./guards/protected-route";
import AppLayout from "./layouts/app-layout";
import Booking from "./pages/client/booking";
import BookingsDialog from "./pages/client/booking/components/bookings-dialog";
import DocumentsPage from "./pages/client/document-page";
import EngagementPage from "./pages/client/engagement";
import Notification from "./pages/client/Notification";
import Profile from "./pages/client/profile";
import Referral from "./pages/client/referral";
import ReferralsDialog from "./pages/client/referral/components/referrals-dialog";
import Rewards from "./pages/client/rewards";
import RedemptionDialog from "./pages/client/rewards/components/redemption-dialog";
import SendVoucherDialog from "./pages/client/rewards/components/send-voucher-dialog";
import BookingManagement from "./pages/manager/_new-booking-management";
import ManagerClientManagement from "./pages/manager/clients";
import ManagerDocumentsPage from "./pages/manager/documents";
import ResourcesManagement from "./pages/manager/resources";
import RewardsAndReferralsPage from "./pages/manager/rewards-and-referrals";
import Settings from "./pages/manager/settings";
import SubscriptionManagement from "./pages/manager/subscription";
import VoucherManagementPage from "./pages/manager/vouchers";
import ForgetPassword from "./pages/shared/forget-password";
import Login from "./pages/shared/login";
import NewPassword from "./pages/shared/new-password";
import ClientManagement from "./pages/superadmin/clients";
import ManagerManagement from "./pages/superadmin/managers";
import ActivityLogs from "./pages/superadmin/managers/activity-logs";
import OrganizationManagement from "./pages/superadmin/organizations";
import ReferralManagement from "./pages/superadmin/referrals";
import UserManagement from "./pages/superadmin/users";
import Voucher from "./pages/superadmin/voucher";
import { USER_ROLES } from "./types";

const App: FC = () => (
  <AuthProvider>
    <SidebarProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            {/* ALL ROLES */}
            <Route element={<ProtectedRoute allowedRoles={["*"]} />}>
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* CLIENT ROUTES */}
            <Route
              element={<ProtectedRoute allowedRoles={[USER_ROLES.CLIENT]} />}
            >
              <Route path="/client/notifications" element={<Notification />} />
              <Route path="/client/documents" element={<DocumentsPage />} />
              <Route path="/client/referral" element={<Referral />}>
                <Route path="my-referrals" element={<ReferralsDialog />} />
              </Route>
              <Route path="/client/booking" element={<Booking />}>
                <Route path="my-bookings" element={<BookingsDialog />} />
              </Route>
              <Route path="/client/rewards" element={<Rewards />}>
                <Route path="my-redemptions" element={<RedemptionDialog />} />
                <Route path="send-vouchers" element={<SendVoucherDialog />} />
              </Route>
              <Route path="/client/engagements" element={<EngagementPage />} />
            </Route>

            {/* SUPERADMIN ROUTES */}
            <Route
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.SUPERADMIN]} />
              }
            >
              <Route path="/superadmin/users" element={<UserManagement />} />
              <Route
                path="/superadmin/clients"
                element={<ClientManagement />}
              />
              <Route
                path="/superadmin/referrals"
                element={<ReferralManagement />}
              />
              <Route
                path="/superadmin/bookings"
                element={<BookingManagement />} // Assuming this is superadmin booking management
              />
              <Route
                path="/superadmin/managers"
                element={<ManagerManagement />}
              />
              <Route
                path="/superadmin/organizations"
                element={<OrganizationManagement />}
              />
              <Route path="/superadmin/voucher" element={<Voucher />} />
              <Route path="/superadmin/settings" element={<Settings />} />
              Consider if Settings is role-specific
              <Route
                path="/superadmin/activity-logs"
                element={<ActivityLogs />}
              />
            </Route>

            {/* MANAGER ROUTES */}
            <Route
              element={<ProtectedRoute allowedRoles={[USER_ROLES.MANAGER]} />}
            >
              <Route
                path="/manager/clients"
                element={<ManagerClientManagement />}
              />
              <Route path="/manager/bookings" element={<BookingManagement />} />
              <Route
                path="/manager/resources"
                element={<ResourcesManagement />}
              />
              <Route
                path="/manager/documents"
                element={<ManagerDocumentsPage />}
              />
              <Route
                path="/manager/vouchers"
                element={<VoucherManagementPage />}
              />
              <Route
                path="/manager/subscriptions"
                element={<SubscriptionManagement />}
              />
              <Route
                path="/manager/rewards-and-referrals"
                element={<RewardsAndReferralsPage />}
              />
              <Route path="/manager/settings" element={<Settings />} />
            </Route>
          </Route>

          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
          </Route>

          {/* Do not put this on guest route */}
          <Route path="/reset-password" element={<NewPassword />} />
          <Route path="/" element={<RootRedirect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
    <Toaster richColors />
  </AuthProvider>
);

export default App;
