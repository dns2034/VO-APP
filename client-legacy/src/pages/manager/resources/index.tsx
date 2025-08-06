// src/pages/manager/resources/index.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Plus, Settings } from "lucide-react";
import { useState } from "react";
import { ResourceTypeModal } from "./components/add-resource-type-modal";
import { ResourceHistoryTable } from "./components/resource-history-table";
import { ResourceManagementModal } from "./components/resource-management-modal";
import { ResourceManagementTable } from "./components/resource-management-table";
import { ResourceSettingsModal } from "./components/resource-settings-modal";
import { ExportTransactionModal } from "../clients/components/export-transaction-modal";

const ResourcesManagement = () => {
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);

  const handleAddResourceType = (data: {
    name: string;
    description: string;
    spaceType: string;
  }) => {
    console.log("Adding new resource type:", data);
    // Add your API call logic here
  };

  return (
    <div className="flex flex-col h-full container px-4 sm:px-6 lg:px-8 py-6">
      <ResourceTypeModal
        open={isTypeModalOpen}
        onOpenChange={setIsTypeModalOpen}
        onSubmit={handleAddResourceType}
      />

      <ResourceSettingsModal
        open={isSettingsModalOpen}
        onOpenChange={setIsSettingsModalOpen}
      />

      <div className="mb-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0 w-full">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Resources Management</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Manage Spaces and History</p>
          </div>
          <div className="flex w-full sm:w-auto gap-3 sm:justify-end">
            <Button className="w-full sm:w-auto" onClick={() => setIsTypeModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Space Type
            </Button>
            <Button
              className="w-full sm:w-auto"
              variant={"outline"}
              onClick={() => setIsPriorityModalOpen(true)}
            >
              <Building className="text-purple-700" />
            </Button>
            <Button
              className="w-full sm:w-auto"
              variant={"outline"}
              onClick={() => setIsSettingsModalOpen(true)}
            >
              <Settings className="text-purple-700" />
            </Button>
          </div>
        </div>

        <ExportTransactionModal
          open={isExportModalOpen}
          onOpenChange={setIsExportModalOpen}
          onExport={(format) => {
            console.log(`Exporting transactions as ${format}`);
            // Add your export logic here
            setIsExportModalOpen(false);
          }}
        />

        <ResourceManagementModal
          open={isPriorityModalOpen}
          onOpenChange={setIsPriorityModalOpen}
          onSubmit={(data) => {
            console.log("Priority access assigned:", data);
            // Add your API call logic here
          }}
        />
      </div>

      <Tabs defaultValue="resources" className="w-full">
        <TabsList className="w-full grid grid-cols-2 rounded p-1">
          <TabsTrigger
            value="resources"
            className="w-full data-[state=active]:bg-[#7844ec] data-[state=active]:text-white rounded-md transition"
          >
            Spaces
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="w-full data-[state=active]:bg-[#7844ec] data-[state=active]:text-white rounded-md transition"
          >
            Spaces History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resources">
          <Card className="p-4 mt-4">
            <ResourceManagementTable />
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <ResourceHistoryTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourcesManagement;
