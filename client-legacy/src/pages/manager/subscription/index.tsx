import { SubscriptionCards } from "./components/subscription-cards";
import { SubscriptionTable } from "./components/subscription-table";

const SubscriptionManagement = () => {

    const subscriptionData = [
  {
    id: "1",
    name: "Full-time Membership",
    status: "Active" as const,
    duration: "Month",
    price: "PHP 7,000"
  },
  {
    id: "2",
    name: "Trial Membership",
    status: "Active" as const,
    duration: "Month",
    price: "PHP 5,000"
  },
  {
    id: "3",
    name: "30 Days Co-Working",
    status: "Active" as const,
    duration: "Month",
    price: "PHP 5,000"
  },
  {
    id: "4",
    name: "15 Days Co-Working",
    status: "Active" as const,
    duration: "Month",
    price: "PHP 5,000"
  },
  {
    id: "5",
    name: "Trial Membership",
    status: "Active" as const,
    duration: "Month",
    price: "PHP 5,000"
  },
]


  return (
    <div className="flex flex-col min-h-screen container px-2 md:px-12 pt-5">
      <div className="flex justify-between items-center flex-col md:flex-row mb-8 w-full">
        <div className="w-full md:w-auto text-left mb-4 md:mb-0">
          <h1 className="text-xl sm:text-2xl md:text-2xl font-bold leading-tight">Subscription Management</h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-md mt-1">
            Overview and control of your subscription services.
          </p>
        </div>
      </div>
      <SubscriptionCards />
      <SubscriptionTable data={subscriptionData} />

    </div>
  );
};

export default SubscriptionManagement;
