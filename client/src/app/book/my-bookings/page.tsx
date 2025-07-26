"use client";
import { useBookings } from "@/hooks/useBookings";
import { useSpaces } from "@/hooks/useSpaces";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { History, Clock, ChevronLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from "date-fns";

export default function Bookings() {
  const { bookings, loading } = useBookings();
  const { spaces } = useSpaces();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-center bg-white text-gray-900 p-4 border-b">
        <a href="/book" className="absolute left-4">
          <ChevronLeft className="h-5 w-5 text-gray-900" />
        </a>
        <div className="flex flex-col items-center text-center">
          <h1 className="font-bold text-lg">My Bookings</h1>
          <p className="text-xs text-gray-500">
            View and manage your bookings here.
          </p>
        </div>
      </header>

      <main className="pt-[85px] p-4 flex-1 flex flex-col h-screen">
        <Tabs
          defaultValue="current-bookings"
          className="flex-1 flex flex-col h-full"
        >
          <TabsList className="w-full">
            <TabsTrigger value="current-bookings">
              <Clock className="h-4 w-4 mr-2" /> Current Bookings
            </TabsTrigger>
            <TabsTrigger value="booking-history">
              <History className="h-4 w-4 mr-2" /> Booking History
            </TabsTrigger>
          </TabsList>

          {/* Current Bookings Section */}
          <TabsContent
            value="current-bookings"
            className="flex-1 flex flex-col h-full"
          >
            <div className="border rounded-lg w-full flex-1 flex flex-col min-h-0 h-full px-4">
              <ScrollArea className="flex-1 min-h-0 h-full">
                {bookings
                  .filter((booking) => booking.status === "booked")
                  .map((booking) => (
                    <div key={booking.id}>
                      <Accordion type="single" collapsible className="py-0">
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="py-3">
                            {booking.date
                              ? format(new Date(booking.date), "PPP")
                              : ""}
                            {" [ "}
                            {
                              spaces.find(
                                (space) => space.id === booking.space_id
                              )?.name
                            }
                            {" ] "}
                          </AccordionTrigger>
                          <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  ))}
              </ScrollArea>
            </div>
            <Pagination className="w-full flex justify-center mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TabsContent>

          {/* Booking History Section */}
          <TabsContent
            value="booking-history"
            className="flex-1 flex flex-col h-full"
          >
            <div className="border rounded-lg w-full flex-1 flex flex-col min-h-0 h-full">
              <ScrollArea className="flex-1 min-h-0 h-full">
                <ul>
                  {bookings
                    .filter(
                      (booking) =>
                        booking.status === "completed" ||
                        booking.status === "cancelled" ||
                        booking.status === "pending"
                    )
                    .map((booking) => (
                      <li key={booking.id}>
                        {booking.date
                          ? format(new Date(booking.date), "PPP")
                          : ""}
                        {" - "}
                        {
                          spaces.find((space) => space.id === booking.space_id)
                            ?.name
                        }
                      </li>
                    ))}
                </ul>
              </ScrollArea>
              <Pagination className="w-full flex justify-center mt-auto">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
