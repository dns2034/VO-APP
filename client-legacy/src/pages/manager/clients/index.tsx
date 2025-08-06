import { useState } from "react";
import { ClientSettingsDialog } from "./components/client-settings-dialog";
import ClientsTable from "./components/clients-table";
import AddClientDialog from "./components/add-client-dialog";

const ClientManagement = () => {
  const [settingsDialogOpen, setSettingsDialogOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col  h-screen container px-2 md:px-12 pt-5 ">
      <div className="flex justify-between items-center flex-col md:flex-row ">
        <div>
          <h1 className="text-2xl font-bold">Client Management</h1>
          <p className="text-gray-600">
            Manage clients, view statuses, and business information
          </p>
        </div>
        <div className="flex gap-2 flex-row md:flex-row w-full justify-end pt-3 md:pt-0 ">
          <AddClientDialog />
          <ClientSettingsDialog
            open={settingsDialogOpen}
            onOpenChange={(open) => {
              setSettingsDialogOpen(open);
            }}
          />
        </div>
      </div>
      <div className="pt-10 ">
        <ClientsTable />
      </div>
      
    </div>
  );
};
export default ClientManagement;
