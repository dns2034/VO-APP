"use client";
import { useBookings } from "@/hooks/useBookings";
import { useSpaces } from "@/hooks/useSpaces";
import { useBranches } from "@/hooks/useBranches";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toast } from "sonner";
import BookingDrawer from "./components/BookingDrawer";

export default function BookingPage() {
  const { bookings, fetchBookings, cancelBooking, loading } = useBookings();
  const { spaces } = useSpaces();
  const { branches } = useBranches();

  // For displaying branch/space names in bookings list
  const [branchMap, setBranchMap] = useState<Record<string, string>>({});
  const [spaceMap, setSpaceMap] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Build branch/space maps for display
  useEffect(() => {
    // Build branch map from branches
    const branchNames: Record<string, string> = {};
    branches.forEach((branch) => {
      branchNames[branch.id] = branch.name;
    });
    setBranchMap(branchNames);

    // Build space map from spaces
    const spaceNames: Record<string, string> = {};
    spaces.forEach((space) => {
      spaceNames[space.id] = space.name;
    });
    setSpaceMap(spaceNames);
  }, [branches, spaces]);

  const handleCancel = async (id: string) => {
    try {
      await cancelBooking(id);
      toast.success("Booking cancelled");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to cancel booking" + error);
    }
  };

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4 w-full">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Virtual Office App</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Book</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="flex-1" />
              <BookingDrawer />
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {/* Bookings List */}
            <section>
              <h2 className="text-xl font-semibold mb-2">My Bookings</h2>
              {loading ? (
                <div className="text-muted-foreground">Loading bookings...</div>
              ) : bookings.length === 0 ? (
                <div className="text-muted-foreground">No bookings found.</div>
              ) : (
                <div className="flex flex-col gap-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="rounded-lg border p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-white shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
                        <span className="font-semibold">
                          {branchMap[
                            spaces.find((s) => s.id === booking.space_id)
                              ?.branch_id ?? ""
                          ] || "Branch"}
                        </span>
                        <span className="font-semibold">
                          {spaceMap[booking.space_id] ||
                            booking.space_id ||
                            "Space"}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {booking.date
                            ? format(new Date(booking.date), "PPP")
                            : ""}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {booking.start_time} - {booking.end_time}
                        </span>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancel(booking.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
