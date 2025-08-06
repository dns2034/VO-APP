import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GlobalTab from "./booking-settings-tabs/global-tabs";
import ResourceTypeTab from "./booking-settings-tabs/type-resource-tabs";
import BookingDurationTab from "./booking-settings-tabs/booking-duration-tab";
import { toast } from "sonner";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const BookingSettingsTabs = () => {
  const [activeTab, setActiveTab] = useState("global");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleSaveChanges = () => {
    // Show specific toast based on active tab
    switch (activeTab) {
      case "global":
        toast.success("Global booking settings saved successfully!");
        break;
      case "resource-type":
        toast.success("Resource type settings saved successfully!");
        break;
      case "booking-duration":
        toast.success("Booking duration settings saved successfully!");
        break;
      default:
        toast.success("All booking settings saved successfully!");
    }
  };

  const handleCancel = () => {
    toast.info("Changes cancelled");
  };

  return (
    <div className="space-y-4">
      {/* Mobile: Select dropdown for tab selection */}
      <div className="sm:hidden">
        <Select value={activeTab} onValueChange={handleTabChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Tab" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="global">Global</SelectItem>
            <SelectItem value="resource-type">Per Resource Type</SelectItem>
            <SelectItem value="booking-duration">Booking Duration</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Desktop: Tabs grid */}
      <Tabs value={activeTab} defaultValue="global" className="space-y-4" onValueChange={handleTabChange}>
        <TabsList className="hidden sm:grid sm:grid-cols-3 gap-2 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger
            value="global"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md text-sm py-2"
          >
            Global
          </TabsTrigger>
          <TabsTrigger
            value="resource-type"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md text-sm py-2"
          >
            Per Resource Type
          </TabsTrigger>
          <TabsTrigger
            value="booking-duration"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md text-sm py-2"
          >
            Booking Duration
          </TabsTrigger>
        </TabsList>
        <TabsContent value="global" forceMount={true} hidden={activeTab !== "global"}>
          <GlobalTab />
        </TabsContent>
        <TabsContent value="resource-type" forceMount={true} hidden={activeTab !== "resource-type"}>
          <ResourceTypeTab />
        </TabsContent>
        <TabsContent value="booking-duration" forceMount={true} hidden={activeTab !== "booking-duration"}>
          <BookingDurationTab />
        </TabsContent>
      </Tabs>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>
    </div>
  );
};

export default BookingSettingsTabs;
