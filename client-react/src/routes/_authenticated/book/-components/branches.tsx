import { useSuspenseQuery } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Branch } from "@/types";
import { branchesQueryOptions } from "..";
import BookingDrawer from "./booking-drawer";

export default function Branches() {
  const { data: branches } = useSuspenseQuery(branchesQueryOptions);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  return (
    <div className="text-left">
      {branches.length === 0 ? (
        <p>No branches found.</p>
      ) : (
        <div>
          {branches.map((branch) => (
            <div key={branch.id} className="mb-4 py-0 relative">
              <img
                src={branch?.image_path || "/placeholder.png"}
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
                  <Button
                    className="inline-flex items-center text-xs"
                    onClick={() => setSelectedBranch(branch)}
                  >
                    <CalendarDays className="w-4 h-4" />
                    <span className="leading-none mt-[1px]">Book</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <BookingDrawer
        selectedBranch={selectedBranch}
        open={!!selectedBranch}
        onOpenChange={(open) => !open && setSelectedBranch(null)}
      />
    </div>
  );
}
