import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ModalFields from "./modal-fields";
import ActivityHistoryModalTable from "./activity-history-modal-table";


const sampleData = [
    {
        first_name: "John",
        last_name: "Doe",
        type: "Redeemed Rewards",
        date: "May 13, 2025",
        status: "COMPLETED"
    },
    {
        first_name: "John",
        last_name: "Doe",
        type: "Redeemed Rewards",
        date: "May 13, 2025",
        status: "COMPLETED"
    },
       {
        first_name: "John",
        last_name: "Doe",
        type: "Redeemed Rewards",
        date: "May 13, 2025",
        status: "COMPLETED"
    },
          {
        first_name: "John",
        last_name: "Doe",
        type: "Redeemed Rewards",
        date: "May 13, 2025",
        status: "COMPLETED"
    },
    {
        first_name: "John",
        last_name: "Doe",
        type: "Redeemed Rewards",
        date: "May 13, 2025",
        status: "COMPLETED"
    }
]

export default function ActivityHistoryReportTab({
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
  const [filteredActivityHistory, setFilteredActivityHistory] = useState<any[] | null>([]);
  const [activityCount, setActivityCount] = useState<number>(0);
  const [clients, setClients] = useState<any[] | null>([]);

  async function getBookings() {
    // const { data, count, error } = await getBookingHistory(
    //   date,
    //   {
    //     page,
    //     pageSize,
    //   },
    //   selectedClient
    // );

    // if (error) {
    //   toast.error(error.message);
    // }

    setActivityCount(sampleData.length);
    setFilteredActivityHistory(sampleData);
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
        <ActivityHistoryModalTable
          acitvityHistory={filteredActivityHistory}
          count={activityCount}
          page={page}
          pageSize={pageSize}
        />
      )}
    </>
  );
}
