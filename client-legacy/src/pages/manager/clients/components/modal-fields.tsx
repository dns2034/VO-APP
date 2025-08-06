import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { getOrganizationClient } from "../../../shared/services/client-service";

export default function ModalFields({
  selectedClient,
  setSelectedClient,
  clients,
  dateRangeText,
  setDate,
  date,
  setClients,
}: {
  setClients: Dispatch<SetStateAction<any[] | null>>;
  selectedClient: string;
  setSelectedClient: Dispatch<SetStateAction<string>>;
  clients: any[] | null;
  dateRangeText: string;
  setDate: Dispatch<SetStateAction<{ from?: Date; to?: Date }>>;
  date: { from?: Date; to?: Date };
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  async function getClients() {
    const { data } = await getOrganizationClient({});

    setClients(data);
  }

  useEffect(() => {
    if (open) {
      getClients().finally();
    }
  }, [open]);
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Client Name
        </label>
        <Select
          open={open}
          onOpenChange={setOpen}
          value={selectedClient}
          onValueChange={setSelectedClient}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All clients</SelectItem>
            {clients &&
              clients.map((client) => (
                <SelectItem key={client.id} value={client.user_id}>
                  {client.first_name} {client.last_name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date Range
        </label>
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between font-normal"
            >
              {dateRangeText}
              <Calendar className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="range"
              //   @ts-ignore
              selected={date!}
              onSelect={(range) => {
                setDate(range || { from: undefined, to: undefined });
                if (range?.from && range?.to) {
                  setIsCalendarOpen(false);
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
