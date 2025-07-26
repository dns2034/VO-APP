"use client";
import Header from "./components/Header";
import Branches from "./components/Branches";
import BottomBar from "@/components/bottom-bar";
import BookingDrawer from "./components/BookingDrawer";
export default function BookingPage() {
  return (
    <>
      <Header />

      <main className="">
        <Branches />
        <BookingDrawer />
      </main>
      <BottomBar />
    </>
  );
}
