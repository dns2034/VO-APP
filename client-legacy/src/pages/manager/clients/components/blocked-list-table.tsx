import { Button } from "@/components/ui/button";
// import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleAlert, History } from "lucide-react";
import { useState } from "react";

const blockedListedClients = [
  {
    name: "John Doe",
    space: "Conference Room",
    blocked: true,
  },
  {
    name: "John Smith",
    space: "Conference Room",
    blocked: false,
  },
  {
    name: "John Smith",
    space: "Conference Room",
    blocked: false,
  },
  {
    name: "John Smith",
    space: "Conference Room",
    blocked: false,
  },
  {
    name: "John Smith",
    space: "Conference Room",
    blocked: false,
  },
];

export default function BlockedListTable() {
  const [open, setOpen] = useState<boolean>(false);

  const handleConfirm = () => {
    // Add your unblock logic here
    console.log("Client unblocked");
    setOpen(false);
  };

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium mb-3">Report: Booking History</h3>
      <div className="border rounded-md">
        <ScrollArea className="py-2 h-64">
          {blockedListedClients && blockedListedClients.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200 overflow-y-auto h-32">
              <thead className="bg-white">
                <tr className="text-xs text-gray-500">
                  <th className="px-3 py-2 text-left font-medium">
                    Client Name
                  </th>
                  <th className="px-3 py-2 text-left font-medium">
                    Space Type
                  </th>
                  <th className="px-3 py-2 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {blockedListedClients &&
                  blockedListedClients.map((client, idx) => (
                    <tr key={idx} className="text-xs">
                      <td className="px-3 py-4 w-[40%]">{client.name}</td>
                      <td className="px-3 py-2 w-[40%]">{client.space}</td>
                      <td className="px-3 py-2">
                        <Dialog open={open} onOpenChange={setOpen}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant={
                                client.blocked ? "default" : "destructive"
                              }
                              className={cn(
                                "w-full",
                                client.blocked &&
                                  "bg-gray-500 hover:bg-gray-400"
                              )}
                            >
                              {client.blocked ? "Unblock" : "Block"}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle className="text-base font-medium">
                                Are you sure you want to{" "}
                                {client.blocked ? "unblock" : "block"} this
                                client?
                              </DialogTitle>
                              <DialogDescription className="text-sm text-gray-500">
                                The client will{" "}
                                {client.blocked
                                  ? "regain access to the resource(s) and be able to book again"
                                  : "not be able to book and access the resource(s)"}
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="flex justify-end gap-2 sm:justify-end">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                className="h-9"
                              >
                                Cancel
                              </Button>
                              <Button
                                type="button"
                                onClick={handleConfirm}
                                className="h-9 bg-violet-600 hover:bg-violet-700"
                              >
                                Confirm
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-full py-16">
              <History className="h-16 w-16 text-slate-400" />
              <p>No history records</p>
            </div>
          )}
        </ScrollArea>
      </div>
      <div className="flex justify-between items-center py-2 w-full">
        <p className="text-xs text-muted-foreground w-full flex gap-1">
          <CircleAlert className="h-4 w-4" /> These settings control the blocked
          list in the Client Management section.
        </p>
        {/* <PaginationWithLinks
                page={1}
                pageSize={5}
                totalCount={blockedListedClients.length}
                pageSearchParam="p"
            /> */}
      </div>
    </div>
  );
}
