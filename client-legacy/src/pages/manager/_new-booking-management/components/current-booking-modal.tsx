import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, MoreHorizontal, ArrowUp, ArrowDown } from "lucide-react";
import { DataTable, ExtendedColumnDef } from "@/components/ui/data-table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { ResourceTypeFilter, StatusFilter } from "@/lib/types";
import { RESOURCE_TYPE_OPTIONS, STATUS_OPTIONS } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import BookingCancellationModal from "./booking-cancellation-modal";
import QRCodeModal from "./qr-code-modal";
import QRCode from "react-qr-code";
import CalendarOverviewModal from "./calendar-overview-modal";

interface CurrentBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Booking {
  clientName: string;
  resourceType: string;
  date: string;
  time: string;
  status: string;
}

const bookings: Booking[] = [
  {
    clientName: "Michael Smith",
    resourceType: "Meeting Room",
    date: "April 4, 2025",
    time: "09:00 - 17:00",
    status: "Cancelled",
  },
  {
    clientName: "John Doe",
    resourceType: "Desk",
    date: "April 4, 2025",
    time: "09:00 - 17:00",
    status: "Booked",
  },
  {
    clientName: "David Johnson",
    resourceType: "Meeting Room",
    date: "April 4, 2025",
    time: "09:00 - 17:00",
    status: "Booked",
  },
  {
    clientName: "Daniel Wilson",
    resourceType: "Meeting Room",
    date: "April 4, 2025",
    time: "09:00 - 17:00",
    status: "Booked",
  },
  {
    clientName: "Robert Brown",
    resourceType: "Desk",
    date: "April 4, 2025",
    time: "09:00 - 17:00",
    status: "Booked",
  },
];

const PAGE_SIZE = 5;

const CurrentBookingModal: React.FC<CurrentBookingModalProps> = ({ open, onOpenChange }) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | undefined>(undefined);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [resourceType, setResourceType] = useState<ResourceTypeFilter>("all");
  const [page, setPage] = useState(1);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [calendarOverviewOpen, setCalendarOverviewOpen] = useState(false);

  const handleSort = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = status === "all" ? true : b.status === status;
    const matchesResource = resourceType === "all" ? true : b.resourceType === resourceType;
    const matchesSearch = b.clientName.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesResource && matchesSearch;
  });

  const totalCount = filteredBookings.length;
  const pageSize = PAGE_SIZE;
  const paginatedBookings = filteredBookings.slice((page - 1) * pageSize, page * pageSize);

  const ResourceTypeFilterDropdown = (
    <Select
      value={resourceType}
      onValueChange={(value: ResourceTypeFilter) => {
        setResourceType(value);
        setPage(1);
      }}
    >
      <SelectTrigger className="min-w-[150px] text-normal">
        <SelectValue>
          {RESOURCE_TYPE_OPTIONS.find((o) => o.value === resourceType)?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {RESOURCE_TYPE_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value} className="text-normal">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  const StatusFilterDropdown = (
    <Select
      value={status}
      onValueChange={(value: StatusFilter) => {
        setStatus(value);
        setPage(1);
      }}
    >
      <SelectTrigger className="min-w-[150px] text-normal">
        <SelectValue>
          {STATUS_OPTIONS.find((o) => o.value === status)?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {STATUS_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value} className="text-normal">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const columns: ExtendedColumnDef<Booking>[] = [
    {
      accessorKey: "clientName",
      header: () => (
        <button
          type="button"
          className="flex items-center gap-1 group text-inherit font-medium"
          onClick={handleSort}
        >
          Client Name
          {sortDirection === 'asc' ? (
            <ArrowUp className="w-3.5 h-3.5 text-gray-500 group-hover:text-black" />
          ) : sortDirection === 'desc' ? (
            <ArrowDown className="w-3.5 h-3.5 text-gray-500 group-hover:text-black" />
          ) : (
            <ArrowUp className="w-3.5 h-3.5 text-gray-300 group-hover:text-black rotate-180" />
          )}
        </button>
      ),
      cell: (info) => info.getValue() as string,
      sortable: true,
      className: "min-w-[160px]",
    },
    {
      accessorKey: "resourceType",
      header: "Resource Type",
      cell: (info) => info.getValue() as string,
      className: "min-w-[120px]",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: (info) => info.getValue() as string,
      className: "min-w-[120px]",
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: (info) => info.getValue() as string,
      className: "min-w-[120px]",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        const value = info.getValue() as string;
        return (
          <span className={
            value === "Cancelled"
              ? "text-red-500 font-medium"
              : "text-green-500 font-medium"
          }>
            {value}
          </span>
        );
      },
      className: "min-w-[100px]",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: (info) => {
        const booking = info.row.original as Booking;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="p-1 rounded hover:bg-gray-100 transition-colors"
                aria-label="Actions"
              >
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setSelectedBooking(booking);
                  setQrModalOpen(true);
                }}
              >
                View QR Code
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCancelModalOpen(true)}>
                Cancel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      className: "min-w-[60px] text-center",
    },
  ];

  const handleOpenCalendarOverview = () => {
    onOpenChange(false);
    setCalendarOverviewOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl h-[700px]">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenCalendarOverview}
                className="p-2 rounded hover:bg-gray-100"
                aria-label="Open Calendar Overview"
              >
                <Calendar className="w-5 h-5 text-purple-700" />
              </button>
              <DialogTitle className="m-0 p-0">
                <div className="flex flex-col">
                  <span className="text-2xl">Current Booking</span>
                  <span className="text-sm font-normal">Track ongoing bookings and stay on top of client schedules</span>
                </div>
              </DialogTitle>
            </div>
          </DialogHeader>
          <DataTable
            columns={columns}
            data={paginatedBookings}
            searchPlaceholder="Search bookings..."
            searchValue={search}
            onSearchChange={handleSearchChange}
            filters={
              <div className="flex gap-2">
                {ResourceTypeFilterDropdown}
                {StatusFilterDropdown}
              </div>
            }
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
            noDataText="No bookings found."
          />
          <BookingCancellationModal open={cancelModalOpen} onOpenChange={setCancelModalOpen} />
          <QRCodeModal
            open={qrModalOpen}
            onOpenChange={(open) => {
              setQrModalOpen(open);
              if (!open) setSelectedBooking(null);
            }}
            qrCodeNode={selectedBooking ? (
              <QRCode
                value={selectedBooking.clientName}
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%", background: "white", padding: 8, borderRadius: 8 }}
              />
            ) : null}
          />
        </DialogContent>
      </Dialog>
      <CalendarOverviewModal open={calendarOverviewOpen} onOpenChange={setCalendarOverviewOpen} />
    </>
  );
};

export default CurrentBookingModal;
