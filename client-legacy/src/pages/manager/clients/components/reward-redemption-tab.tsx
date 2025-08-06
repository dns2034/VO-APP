import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { getRewardRedemptionHistory } from "@/pages/shared/services/rewards-service";
import ModalFields from "./modal-fields";
import RewardRedemptionModalTable from "./reward-redemption-modal-table";

export default function RewardRedemptionHistoryReportTab({
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
  const [filteredRedemptions, setFilteredRedemptions] = useState<any[] | null>(
    []
  );
  const [redemptionCount, setRedemptionCount] = useState<number>(0);
  const [clients, setClients] = useState<any[] | null>([]);

  async function getRewardRedemptions() {
    const { data, count, error } = await getRewardRedemptionHistory(
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

    setRedemptionCount(count ?? 0);

    console.log("reward redemptions count:", count);

    console.log("reward redemptions: ", data);
    setFilteredRedemptions(data);
  }

  useEffect(() => {
    getRewardRedemptions().finally();
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
        <RewardRedemptionModalTable
          redemptions={filteredRedemptions}
          count={redemptionCount}
          page={page}
          pageSize={pageSize}
        />
      )}
    </>
  );
}
