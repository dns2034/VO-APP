"use client";
import Header from "./components/Header";
import Branches from "./components/Branches";
import BottomBar from "@/components/bottom-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyBookings from "./components/MyBookings";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function BookingPage() {
  return (
    <>
      <Header />

      <main className="flex flex-col text-center items-center bg-white text-gray-900 m-2">
        <Tabs defaultValue="book" className="w-full p-2">
          <TabsList className="w-full justify-center mb-1">
            <TabsTrigger value="book">Book</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>
          <TabsContent value="book">
            <ScrollArea className="h-full">
              <Branches />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="bookings">
            <ScrollArea className="h-full">
              <MyBookings />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>
      <BottomBar />
    </>
  );
}
