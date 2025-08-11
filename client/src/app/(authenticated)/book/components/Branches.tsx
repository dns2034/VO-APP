import { useBranches } from "@/hooks/useBranches";
import Image from "next/image";
import BookingDrawer from "./BookingDrawer";

export default function Branches() {
  const { branches } = useBranches();

  return (
    <div className="text-left">
      {branches.length === 0 ? (
        <p>No branches found.</p>
      ) : (
        <div>
          {branches.map((branch) => (
            <div key={branch.id} className="mb-4 py-0 relative">
              <Image
                src={
                  branch?.image_path
                    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/branches/${branch.id}/${branch.image_path}`
                    : "/placeholder.png"
                }
                alt={branch.name}
                width={500}
                height={500}
                className="w-full h-auto object-cover"
                priority
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
