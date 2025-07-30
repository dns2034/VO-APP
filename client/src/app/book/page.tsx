"use client";
import Header from "./components/Header";
import Branches from "./components/Branches";
import BottomBar from "@/components/bottom-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyBookings from "./components/MyBookings";

export default function BookingPage() {
  return (
    <>
      <Header />

      <main className="flex flex-col text-center items-center bg-white text-gray-900 m-4">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="w-full justify-center">
            <TabsTrigger value="account">Book</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Branches />
          </TabsContent>
          <TabsContent value="bookings">
            <MyBookings />
          </TabsContent>
        </Tabs>
      </main>
      <BottomBar />
    </>
  );
}
