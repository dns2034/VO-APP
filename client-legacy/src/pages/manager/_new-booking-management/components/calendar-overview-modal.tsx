import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Calendar as CalendarIcon } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface CalendarOverviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RESOURCE_OPTIONS = [
  { value: "all", label: "All Resources" },
  { value: "meeting-room", label: "Meeting Room" },
  { value: "desk", label: "Desk" },
];

const BOOKINGS = [
  {
    clientName: "Desmond Doss",
    resourceType: "Meeting Room",
    time: "09:00 - 16:00",
  },
  {
    clientName: "Desmond Doss",
    resourceType: "Meeting Room",
    time: "09:00 - 16:00",
  },
  {
    clientName: "Desmond Doss",
    resourceType: "Meeting Room",
    time: "09:00 - 16:00",
  },
  {
    clientName: "Desmond Doss",
    resourceType: "Meeting Room",
    time: "09:00 - 16:00",
  },
  {
    clientName: "Desmond Doss",
    resourceType: "Meeting Room",
    time: "09:00 - 16:00",
  },
];

const CalendarOverviewModal: React.FC<CalendarOverviewModalProps> = ({ open, onOpenChange }) => {
  const [selectedResource, setSelectedResource] = useState("all");

  const days = [
    [null, null, null, null, null, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30],
    [31, null, null, null, null, null, null],
  ];
  const selectedDay = 19;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl p-2 sm:p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-purple-700" />
            <DialogTitle>Calendar Overview</DialogTitle>
          </div>
          <DialogDescription>
            Calendar Overview of Bookings by Resource Type
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-2 sm:mt-4">
          {/* Left: Calendar and Resource Filter */}
          <div className="bg-white rounded-lg border p-3 sm:p-6 w-full sm:w-[340px] flex flex-col gap-3 sm:gap-4">
            <Select value={selectedResource} onValueChange={setSelectedResource}>
              <SelectTrigger className="w-full">
                <SelectValue>{RESOURCE_OPTIONS.find(o => o.value === selectedResource)?.label}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {RESOURCE_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">March 2025</span>
                <div className="flex gap-2">
                  <button className="rounded p-1 hover:bg-gray-100" disabled>{"<"}</button>
                  <button className="rounded p-1 hover:bg-gray-100" disabled>{">"}</button>
                </div>
              </div>
              <table className="w-full text-center select-none">
                <thead>
                  <tr className="text-xs text-gray-400">
                    <th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th>
                  </tr>
                </thead>
                <tbody>
                  {days.map((week, i) => (
                    <tr key={i}>
                      {week.map((day, j) => (
                        <td key={j}>
                          {day ? (
                            <button
                              className={`w-8 h-8 rounded-full transition-colors ${day === selectedDay ? "bg-purple-600 text-white" : "hover:bg-gray-100"}`}
                              disabled={day === selectedDay}
                            >
                              {day}
                            </button>
                          ) : (
                            <span className="w-8 h-8 inline-block" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Right: Bookings for Selected Date */}
          <div className="flex-1 bg-white rounded-lg border p-3 sm:p-6 flex flex-col gap-3 sm:gap-4 mt-3 sm:mt-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-1 sm:gap-0">
              <span className="font-medium text-gray-500">Date Selected</span>
              <span className="text-purple-600 font-medium cursor-pointer">March 19, 2025</span>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
              {BOOKINGS.map((booking, idx) => (
                <div key={idx} className="border rounded-lg p-3 sm:p-4 flex flex-col gap-1 bg-gray-50">
                  <span className="font-semibold text-black">{booking.clientName}</span>
                  <span className="text-xs text-gray-500">{booking.resourceType}</span>
                  <span className="text-xs text-gray-500">{booking.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarOverviewModal; 