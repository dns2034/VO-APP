
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrganizationAllocationsTabSettings } from "./organization-settings-tabs/organization-allocations-tab-settings";
import { OrganizationClientTabSettings } from "./organization-settings-tabs/organization-client-tab-settings";

type OrganizationSettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const OrganizationSettingsDialog = ({
  open,
  onOpenChange,
}: OrganizationSettingsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 text-violet-600" />
        </Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-violet-500" />
            <span>Organization Settings</span>
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Configure organization-wide settings and limitations for all clients
          </p>
        </DialogHeader>

        <Tabs defaultValue="client" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="client">Client Settings</TabsTrigger>
            <TabsTrigger value="allocations">Space Allocations</TabsTrigger>
          </TabsList>

          <TabsContent value="client" className="mt-6">
            <OrganizationClientTabSettings />
          </TabsContent>

          <TabsContent value="allocations" className="mt-6">
            <OrganizationAllocationsTabSettings />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
