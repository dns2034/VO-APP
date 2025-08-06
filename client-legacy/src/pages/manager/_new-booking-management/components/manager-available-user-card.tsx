import { useState } from "react";
import { CheckCircle2, Box, LampDesk, XCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const users = [
  { email: "johndoe@incub8space.com", valid: true },
  { email: "janedoe@incub8space.com", valid: true },
];
const locations = ["Dasma Branch", "Makati Branch", "Cebu Branch"];
const resourceTypes = ["Desk", "Room", "Table"];
const spaces = ["Table 1", "Room 1", "Room 2"];

const deskGrid = [
  ["D1", "D2", "D3"],
  ["Table 1"],
  ["D4", "D5", "D6"],
];

function validateEmail(email: string) {
  if (!email) return null;
  return users.some((u) => u.email === email) ? true : false;
}

export default function ManagerAvailableUserCard() {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [selectedResourceType, setSelectedResourceType] = useState(resourceTypes[0]);
  const [selectedSpace, setSelectedSpace] = useState(spaces[0]);

  const emailValid = validateEmail(selectedUser);

  return (
    <Card className="transition-all border-2 border-gray-200 shadow h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Box className="w-5 h-5 text-violet-600" />
          Available Resources
        </CardTitle>
      </CardHeader>
      <ScrollArea className="flex-1 max-h-[350px] px-1">
        <CardContent className="space-y-6 pb-2">
          <div>
            <Label htmlFor="user" className="text-xs text-muted-foreground mb-1 block">
              Select User
            </Label>
            <div className="relative">
              <Input
                id="user"
                value={selectedUser}
                onChange={e => setSelectedUser(e.target.value)}
                className={cn(
                  "pr-8",
                  selectedUser === ""
                    ? ""
                    : emailValid === true
                    ? "border-green-400"
                    : "border-red-400"
                )}
                placeholder="Enter user email"
                autoComplete="off"
              />
              {selectedUser !== "" && emailValid === true && (
                <CheckCircle2 className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
              )}
              {selectedUser !== "" && emailValid === false && (
                <XCircle className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="location" className="text-xs text-muted-foreground mb-1 block">
              Select location of resources
            </Label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(loc => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="resourceType" className="text-xs text-muted-foreground mb-1 block">
              Select a resource type
            </Label>
            <Select value={selectedResourceType} onValueChange={setSelectedResourceType}>
              <SelectTrigger id="resourceType">
                <SelectValue placeholder="Select resource type" />
              </SelectTrigger>
              <SelectContent>
                {resourceTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-1">
              <Box className="w-5 h-5 text-violet-600" />
              <span className="font-medium text-base">Available Spaces</span>
            </div>
            <Label htmlFor="space" className="text-xs text-muted-foreground mb-1 block">
              Select location and space
            </Label>
            <Select value={selectedSpace} onValueChange={setSelectedSpace}>
              <SelectTrigger >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
              </SelectContent>
            </Select>
            <div className="mt-4 rounded-xl border  p-4 flex flex-col gap-2">
              <div className="flex gap-2 justify-center">
                {deskGrid[0].map((desk) => (
                  <div
                    key={desk}
                    className="flex flex-col items-center justify-center w-20 h-16 border rounded-lg bg-muted cursor-pointer"
                  >
                    <LampDesk  className="w-5 h-5 text-muted-foreground mb-1" />
                    <span className="text-xs font-medium">{desk}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 justify-center">
                <div className="flex-1" />
                <div className="flex flex-col items-center justify-center w-48 h-10 border rounded-lg bg-muted/60 text-center flex-shrink-0 flex-grow-0">
                  <span className="text-sm font-semibold">Table 1</span>
                </div>
                <div className="flex-1" />
              </div>
              <div className="flex gap-2 justify-center ">
                {deskGrid[2].map((desk) => (
                  <div
                    key={desk}
                    className="flex flex-col items-center justify-center w-20 h-16 border rounded-lg bg-muted cursor-pointer "
                  >
                    <LampDesk  className="w-5 h-5 text-muted-foreground mb-1" />
                    <span className="text-xs font-medium">{desk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
