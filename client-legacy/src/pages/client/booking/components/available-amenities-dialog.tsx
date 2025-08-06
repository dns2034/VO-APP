import type React from "react";

import { useState } from "react";
import { Wifi, Square, Edit3, Armchair } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Amenity {
  id: string;
  name: string;
  icon: React.ReactNode;
  available: boolean;
  quantity?: number;
}

interface AvailableAmenitiesDialogProps {
  resourceType?: string;
  amenities?: Amenity[];
  trigger?: React.ReactNode;
}

const defaultAmenities: Amenity[] = [
  {
    id: "wifi",
    name: "Wifi",
    icon: <Wifi className="h-4 w-4" />,
    available: true,
    quantity: 1,
  },
  {
    id: "whiteboard",
    name: "Whiteboard",
    icon: <Square className="h-4 w-4" />,
    available: true,
    quantity: 1,
  },
  {
    id: "markers",
    name: "Markers",
    icon: <Edit3 className="h-4 w-4" />,
    available: true,
    quantity: 2,
  },
  {
    id: "conference-table",
    name: "Conference Table",
    icon: <Square className="h-4 w-4" />,
    available: true,
    quantity: 1,
  },
  {
    id: "chairs",
    name: "Chairs",
    icon: <Armchair className="h-4 w-4" />,
    available: true,
    quantity: 8,
  },
];

export function AvailableAmenitiesDialog({
  resourceType = "Meeting Room",
  amenities = defaultAmenities,
  trigger,
}: AvailableAmenitiesDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            View Amenities
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
          <div>
            <DialogTitle className="text-xl font-semibold text-left">
              Available Amenities
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Shows the selected resource type for {resourceType}
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm font-medium text-muted-foreground border-b pb-2">
            <span>Amenity</span>
            <span>Quantity</span>
          </div>

          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                amenity.available
                  ? "border-violet-200 bg-violet-50/50"
                  : "border-red-200 bg-red-50/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-1.5 rounded-full ${
                    amenity.available
                      ? "bg-violet-100 text-violet-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {amenity.icon}
                </div>
                <span className="font-medium text-sm">{amenity.name}</span>
              </div>

              <Badge
                variant={amenity.available ? "default" : "destructive"}
                className={`${
                  amenity.available
                    ? "bg-violet-600 hover:bg-violet-700"
                    : "bg-red-500 hover:bg-red-600"
                } text-white`}
              >
                {amenity.available
                  ? `${amenity.quantity} Available`
                  : "Not Available"}
              </Badge>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <Button
            className="w-full bg-violet-600 hover:bg-violet-700"
            onClick={() => setOpen(false)}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
