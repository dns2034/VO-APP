"use client";
import Header from "./components/Header";
import Branches from "./components/Branches";
import BottomBar from "@/components/bottom-bar";
import Bookings from "./components/Bookings";
export default function BookingPage() {
  return (
    <>
      <Header />

      <main className="">
        <Branches />
      </main>
      <BottomBar />
      <Bookings />
    </>
  );
}
