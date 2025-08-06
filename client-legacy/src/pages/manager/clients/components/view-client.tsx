import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditsTab } from "./view-client-tabs/credits-tab";
import { PointsTab } from "./view-client-tabs/points-tab";

interface AdjustClientsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: {
    id: string;
    name: string;
    email: string;
    points: number;
    credits: number;
    avatar: string;
  } | null;
}

export const AdjustClientsDialog = ({
  client,
  open,
  onOpenChange,
}: AdjustClientsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full bg-purple-800 h-[800px] ">
        <DialogHeader className="flex flex-col items-center gap-4 py-6  ">
          {client?.avatar && (
            <Avatar className="h-48 w-48 rounded-full overflow-hidden border-2 border-gray-200">
              <AvatarImage
                src={client.avatar}
                className="object-cover w-full h-full"
              />
              <AvatarFallback className="rounded-full bg-gray-100 text-3xl flex items-center justify-center">
                {client?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
          <DialogTitle className=" text-center flex flex-col ">
            <p className="text-3xl text-gray-200">{client?.name}</p>
            <p className="text-sm text-gray-300 text-center font-thin mt-1">
              {client?.email}
            </p>
          </DialogTitle>
        </DialogHeader>
        <div className="absolute top-96 w-full ">
          <Tabs
            defaultValue="credits"
            className="w-full bg-gray-50 rounded-t-3xl p-8 rounded-b-md"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4 gap-0 p-1 rounded-lg bg-gray-200">
              <TabsTrigger
                value="credits"
                className="w-full rounded-lg data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Credits
              </TabsTrigger>
              <TabsTrigger
                value="points"
                className="w-full rounded-lg data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Points
              </TabsTrigger>
            </TabsList>

            <TabsContent value="credits">
              <CreditsTab client={client} onClose={() => onOpenChange(false)} />
            </TabsContent>

            <TabsContent value="points">
              <PointsTab client={client} onClose={() => onOpenChange(false)} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
