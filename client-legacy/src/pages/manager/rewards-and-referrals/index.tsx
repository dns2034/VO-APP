import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsDialog from "./components/settings/dialog";
import ReferralsTable from "./components/tabs/referrals-table";
import RewardsAndReferralsTable from "./components/tabs/rewards-and-referrals-table";

export default function RewardsAndReferralsPage() {
  const [activeTab, setActiveTab] = useState<string>("referrals");

  return (
    <div className="flex flex-col h-screen container px-2 md:px-12 pt-5">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-0 w-full mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Rewards and Referral Management</h1>
          <p className="text-gray-500 text-sm md:text-base">
            Review and manage referrals flagged as potentially fraudulent
          </p>
        </div>
        <div className="flex w-full md:w-auto justify-end">
          <SettingsDialog />
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full h-12">
          <TabsTrigger
            value="referrals"
            className="w-full data-[state=active]:bg-primary data-[state=active]:text-white h-full"
          >
            Referrals
          </TabsTrigger>
          <TabsTrigger
            value="rewards"
            className="w-full data-[state=active]:bg-primary data-[state=active]:text-white h-full"
          >
            Rewards
          </TabsTrigger>
        </TabsList>
        <TabsContent value="referrals">
          <ReferralsTable />
        </TabsContent>
        <TabsContent value="rewards">
          <RewardsAndReferralsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
