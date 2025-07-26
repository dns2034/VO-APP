"use client";
import Header from "./components/Header";
import Branches from "./components/Branches";
import BottomBar from "@/components/bottom-bar";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookingPage() {
  return (
    <>
      <Header />

      <main className="flex flex-col text-center items-center bg-white text-gray-900 m-4">
        <a href="/book/my-bookings">
          <Button className="bg-white text-gray-900 hover:bg-gray-100 border border-gray-300 text-xs mb-4">
            <Calendar className="h-5 w-5 text-gray-900 " /> My Bookings
          </Button>
        </a>
        <Branches />
      </main>
      <BottomBar />
    </>
  );
}
