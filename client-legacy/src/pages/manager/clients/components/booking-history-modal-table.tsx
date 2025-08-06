import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History } from "lucide-react";

export default function BookingHistoryModalTable({
  page,
  pageSize,
  count,
  bookings,
}: {
  page: number;
  pageSize: number;
  count: number;
  bookings: any[] | null;
}) {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium mb-3">Report: Booking History</h3>
      <div className="border rounded-md">
        <ScrollArea className="py-2 h-64">
          {bookings && count > 0 ? (
            <table className="min-w-full divide-y divide-gray-200 overflow-y-auto h-32">
              <thead className="bg-white">
                <tr className="text-xs text-gray-500">
                  <th className="px-3 py-2 text-left font-medium">
                    Client Name
                  </th>
                  <th className="px-3 py-2 text-left font-medium">
                    Booking Type
                  </th>
                  <th className="px-3 py-2 text-left font-medium">
                    Booking Date
                  </th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {bookings &&
                  bookings.map((booking) => (
                    <tr key={booking.booking_id} className="text-xs">
                      <td className="px-3 py-4">
                        {booking.first_name} {booking.last_name}
                      </td>
                      <td className="px-3 py-2">{booking.resource}</td>
                      <td className="px-3 py-2">{booking.date}</td>
                      <td className="px-3 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            booking.status === "COMPLETED"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "REJECTED"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-full py-16">
              <History className="h-16 w-16 text-slate-400" />
              <p>No history records</p>
            </div>
          )}
        </ScrollArea>
      </div>
      <div className="flex justify-center items-center py-2">
        <PaginationWithLinks
          page={page}
          pageSize={pageSize}
          totalCount={count}
          pageSearchParam="p"
        />
      </div>
    </div>
  );
}
