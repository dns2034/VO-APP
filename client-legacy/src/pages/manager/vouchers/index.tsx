import StatusCard from "./components/status-card";
import VouchersTable from "./components/table";

const statusCardData = [
  {
    title: "Available Vouchers",
    count: 12,
    description: "No. of Available Vouchers",
  },
  {
    title: "Issued Vouchers",
    count: 10,
    description: "No. of Issued Vouchers",
  },
  {
    title: "Redeemed Vouchers",
    count: 15,
    description: "No. of Redeemed Vouchers",
  },
  {
    title: "Expired Vouchers",
    count: 5,
    description: "No. of Expired Vouchers",
  },
];

export default function VoucherManagementPage() {
  return (
    <div className="flex flex-col min-h-screen container px-2 md:px-12 pt-5">
      <div className="flex justify-between items-center flex-col md:flex-row w-full mb-8">
        <div className="w-full md:w-auto text-left mb-4 md:mb-0">
          <h1 className="text-xl sm:text-2xl md:text-2xl font-bold leading-tight">Voucher Management</h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-md mt-1">
            Overview and control of your voucher services.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statusCardData.map((item) => (
          <StatusCard
            key={item.title}
            title={item.title}
            count={item.count}
            description={item.description}
          />
        ))}
      </div>
      <VouchersTable />
    </div>
  );
}
