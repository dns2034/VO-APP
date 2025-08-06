
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

export default function Voucher() {
  return (
    <div className="flex flex-col h-screen container px-2 md:px-12 pt-5">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Voucher Management</h1>
        <p className="text-gray-500">
          Efficiently Create, Track, and Manage Vouchers
        </p>
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
