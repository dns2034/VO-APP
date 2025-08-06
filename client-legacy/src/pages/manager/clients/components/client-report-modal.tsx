import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

import usePaginationState from "@/hooks/use-pagination-state";
import { useSearchParamsHandler } from "@/hooks/use-search-param-handler";
import { format } from "date-fns";
import { Files, Info } from "lucide-react";
import { useEffect, useState } from "react";
import BookingHistoryReportTab from "./booking-history-report-tab";
import RewardRedemptionHistoryReportTab from "./reward-redemption-tab";
import ActivityHistoryReportTab from "./activity-history-report-tab";

export default function ClientReportModal() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { page, pageSize } = usePaginationState("p");
  const { updateSearchParam } = useSearchParamsHandler();
  const [selectedClient, setSelectedClient] = useState("all");
  const [date, setDate] = useState<{
    from?: Date;
    to?: Date;
  }>({
    // from: new Date(2025, 3, 1), // April 1, 2025
    // to: new Date(2025, 3, 10), // April 10, 2025
    from: new Date(),
    to: new Date(),
  });
  const [activeTab, setActiveTab] = useState("bookings");

  // Format the date range for display
  const dateRangeText =
    date.from && date.to
      ? `${format(date.from, "MMMM d, yyyy")} - ${format(date.to, "MMMM d, yyyy")}`
      : "Select a date range";

  useEffect(() => {
    // @ts-expect-error updateSearchParam expects a string but receives a number
    updateSearchParam("p", 1);
  }, [activeTab, selectedClient]);
  return (
    <>
      {/* Report Generation Modal */}
      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Files className="h-4 w-4 text-violet-600" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px] p-0 w-11/12 overflow-hidden">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Info className="h-5 w-5 mr-2 text-purple-600" />
                <h2 className="text-xl font-semibold">
                  Generate Client Report
                </h2>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-sm text-gray-500 mb-5">
              Select report type, client, and date range to generate a report
            </p>

            {/* Tabs */}
            <div className="block md:hidden mb-4">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bookings">Bookings</SelectItem>
                  <SelectItem value="redemptions">Reward redemptions</SelectItem>
                  <SelectItem value="activity">Activity History</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className=" w-32 md:w-full justify-between items-center hidden md:flex">
                <TabsTrigger
                  value="bookings"
                  className="w-full data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                >
                  Bookings
                </TabsTrigger>
                <TabsTrigger
                  value="redemptions"
                  className="w-full data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                >
                  Reward redemptions
                </TabsTrigger>
                <TabsTrigger
                  value="activity"
                  className="w-full data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                >
                  Activity History
                </TabsTrigger>
              </TabsList>
              <TabsContent value="bookings">
                <BookingHistoryReportTab
                  dateRangeText={dateRangeText}
                  selectedClient={selectedClient}
                  setSelectedClient={setSelectedClient}
                  setDate={setDate}
                  date={date}
                  page={page}
                  pageSize={pageSize}
                />
              </TabsContent>
              <TabsContent value="redemptions">
                <RewardRedemptionHistoryReportTab
                  date={date}
                  dateRangeText={dateRangeText}
                  selectedClient={selectedClient}
                  setSelectedClient={setSelectedClient}
                  page={page}
                  pageSize={pageSize}
                  setDate={setDate}
                />
              </TabsContent>
              <TabsContent value="activity">
                <ActivityHistoryReportTab
                  dateRangeText={dateRangeText}
                  selectedClient={selectedClient}
                  setSelectedClient={setSelectedClient}
                  setDate={setDate}
                  date={date}
                  page={page}
                  pageSize={pageSize}
                />
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsReportModalOpen(false)}
              >
                Cancel
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Export
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// function ClientFormField({
//   client,
//   setClient,
// }: {
//   client: string;
//   setClient: React.Dispatch<React.SetStateAction<string>>;
// }) {
//   return (
//     <div className="grid grid-cols-2 gap-4 mb-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Client Name
//         </label>
//         <Select value={client} onValueChange={setClient}>
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Select client" />
//           </SelectTrigger>
//           <SelectContent>
//             {clients.map((client) => (
//               <SelectItem key={client.id} value={client.id}>
//                 {client.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Date Range
//         </label>
//         <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               className="w-full justify-between font-normal"
//             >
//               {dateRangeText}
//               <Calendar className="h-4 w-4 opacity-50" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0" align="start">
//             <CalendarComponent
//               mode="range"
//               //   @ts-ignore
//               selected={date!}
//               onSelect={(range) => {
//                 setDate(range || { from: undefined, to: undefined });
//                 if (range?.from && range?.to) {
//                   setIsCalendarOpen(false);
//                 }
//               }}
//               initialFocus
//             />
//           </PopoverContent>
//         </Popover>
//       </div>
//     </div>
//   );
// }
