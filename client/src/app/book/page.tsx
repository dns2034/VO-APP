"use client";

import { useBookings } from "@/hooks/useBookings";

export default function BookingPage() {
  const bookings = useBookings();
  return (
    <>
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="font-bold text-xl">Book</h1>
      </header>
      {bookings}
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"></main>
    </>
  );
}
