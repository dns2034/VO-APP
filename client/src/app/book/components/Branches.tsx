import { useBookings } from "@/hooks/useBookings";
import { useBranches } from "@/hooks/useBranches";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BookingDrawer from "./BookingDrawer";

export default function Branches() {
  const { bookings, fetchBookings } = useBookings();
  const { branches } = useBranches();

  return (
    <div className="max-w-4xl mx-auto p-4">
      {branches.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div>
          {branches.map((branch) => (
            <div key={branch.id} className="mb-4 py-0 relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/branch-images/${branch.image_path}`}
                alt={branch.name}
                width={500}
                height={500}
                className="w-full h-auto object-cover"
              />
              <div className="bg-gray-800/40 absolute bottom-0 left-0 w-full text-white p-2 flex flex-row">
                <div className="flex flex-col">
                  <h3 className="font-bold text-sm">{branch.name}</h3>
                  <p className="text-xs">{branch.location}</p>
                </div>

                <div className="ml-auto flex items-center">
                  <BookingDrawer branchId={branch.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
