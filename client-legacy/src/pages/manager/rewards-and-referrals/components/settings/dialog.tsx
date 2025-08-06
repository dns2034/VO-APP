"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import { useState } from "react";
import DateAndThresholdsTab from "./tabs/date-and-thresholds";
import PreventionTab from "./tabs/prevention";
import ReferralProgramTab from "./tabs/referral-program";
import RewardsTab from "./tabs/rewards";

export default function SettingsDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <Settings className="text-purple-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className=" p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="w-5 h-5 text-purple-600" />
            <DialogTitle className="text-lg font-semibold">
              Settings
            </DialogTitle>
          </div>
          <p className="text-sm text-gray-600">
            Configure settings for Rewards & Referrals.
          </p>
        </DialogHeader>

        <div className="px-6">
          <Tabs defaultValue="dates-thresholds" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 h-auto">
              <TabsTrigger
                value="prevention"
                className="text-xs px-2 py-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Prevention
              </TabsTrigger>
              <TabsTrigger
                value="dates-thresholds"
                className="text-xs px-2 py-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Dates & Thresholds
              </TabsTrigger>
              <TabsTrigger
                value="referral-program"
                className="text-xs px-2 py-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Referral Program
              </TabsTrigger>
              <TabsTrigger
                value="rewards"
                className="text-xs px-2 py-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Rewards
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dates-thresholds" className="mt-6 space-y-6">
              <DateAndThresholdsTab
                setClose={() => {
                  setOpen(false);
                }}
              />
            </TabsContent>

            <TabsContent value="prevention" className="mt-6">
              <PreventionTab
                setClose={() => {
                  setOpen(false);
                }}
              />
            </TabsContent>

            <TabsContent value="referral-program" className="mt-6">
              <ReferralProgramTab
                setClose={() => {
                  setOpen(false);
                }}
              />
            </TabsContent>

            <TabsContent value="rewards" className="mt-6">
              <RewardsTab
                setClose={() => {
                  setOpen(false);
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
