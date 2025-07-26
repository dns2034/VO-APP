"use client";
import Header from "./components/Header";
import Branches from "./components/Branches";
import BottomBar from "@/components/bottom-bar";

export default function BookingPage() {
  return (
    <>
      <Header />

      <main className="">
        <Branches />
      </main>
      <BottomBar />
    </>
  );
}
