import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { getBookingHistory } from "@/pages/shared/services/booking-service";
import BookingHistoryModalTable from "./booking-history-modal-table";
import ModalFields from "./modal-fields";

export default function BookingHistoryReportTab({
  selectedClient,
  setSelectedClient,
  dateRangeText,
  setDate,
  date,
  page,
  pageSize,
}: {
  selectedClient: string;
  setSelectedClient: Dispatch<SetStateAction<string>>;
  dateRangeText: string;
  setDate: Dispatch<SetStateAction<{ from?: Date; to?: Date }>>;
  date: { from?: Date; to?: Date };
  page: number;
  pageSize: number;
}) {
  const [filteredBookings, setFilteredBookings] = useState<any[] | null>([]);
  const [bookingCount, setBookingCount] = useState<number>(0);
  const [clients, setClients] = useState<any[] | null>([]);

  async function getBookings() {
    const { data, count, error } = await getBookingHistory(
      date,
      {
        page,
        pageSize,
      },
      selectedClient
    );

    if (error) {
      toast.error(error.message);
    }

    setBookingCount(count ?? 0);

    console.log("booking history count:", count);

    console.log("booking history: ", data);
    setFilteredBookings(data);
  }

  useEffect(() => {
    getBookings().finally();
  }, [date, page, selectedClient]);

  return (
    <>
      <ModalFields
        clients={clients}
        setClients={setClients}
        dateRangeText={dateRangeText}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        setDate={setDate}
        date={date}
      />
      {date.from && date.to && (
        <BookingHistoryModalTable
          bookings={filteredBookings}
          count={bookingCount}
          page={page}
          pageSize={pageSize}
        />
      )}
    </>
  );
}
