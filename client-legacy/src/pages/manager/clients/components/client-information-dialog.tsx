import { useState } from "react";
import {
  Info,
  ChevronRight,
  ChevronLeft,
  Save,
  BriefcaseBusiness,
  Contact,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { TBusiness, TUserProfile } from "@/types";

interface ClientInformationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: TUserProfile | null;
}

export const ClientInformationDialog = ({
  open,
  onOpenChange,
  client,
}: ClientInformationDialogProps) => {
  // Mock data - in a real app, this would come from an API or props
  const [businesses, setBusinesses] = useState<TBusiness[]>([
    {
      id: "1",
      name: "IT - Innovators Techtacks",
      business_type: "IT Marketing Company",
      address: "123 Main Street, Apt 4B, Springfield, IL, 62704, USA",
      client_id: "1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Green Solutions",
      business_type: "Environmental Consulting",
      address: "456 Oak Avenue, Suite 200, Springfield, IL, 62704, USA",
      client_id: "1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Financial Wizards",
      business_type: "Financial Services",
      address: "789 Elm Boulevard, Tower 3, Springfield, IL, 62704, USA",
      client_id: "1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [businessToEdit, setBusinessToEdit] = useState<TBusiness | null>(null);

  const currentBusiness = businesses[currentIndex];

  const handleNext = () => {
    if (businessToEdit) return;
    setCurrentIndex((prev) => (prev + 1) % businesses.length);
  };

  const handlePrevious = () => {
    if (businessToEdit) return;
    setCurrentIndex(
      (prev) => (prev - 1 + businesses.length) % businesses.length
    );
  };

  const handleSaveEdit = () => {
    if (!businessToEdit) return;
    const updatedBusinesses = [...businesses];
    updatedBusinesses[currentIndex] = businessToEdit;
    setBusinesses(updatedBusinesses);
    setBusinessToEdit(null);
    toast.success("Business details updated", {
      description: `Updated details for ${businessToEdit.name}`,
    });
  };

  const handleInputChange = (field: keyof TBusiness, value: string) => {
    if (!businessToEdit) return;
    setBusinessToEdit({ ...businessToEdit, [field]: value });
  };

  if (!client || !currentBusiness) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open && businessToEdit) {
          setBusinessToEdit(null);
        }
        onOpenChange(open);
      }}
    >
      <DialogContent className="sm:max-w-md w-11/12 md:w-full rounded">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2 text-purple-600">
            <Info className="h-5 w-5" />
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Client Information
            </DialogTitle>
          </div>
          <p className="text-sm text-gray-600 font-normal">
            Details for client: {client.first_name} {client.last_name}
          </p>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Client */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">Name</Label>
                <p className="text-sm font-medium">
                  {client.first_name} {client.last_name}
                </p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">Contact</Label>
                <p className="text-sm font-medium">0922 - 4112 - 3103</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">Email Address</Label>
                <p className="text-sm font-medium">{client.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">Organization</Label>
                <p className="text-sm font-medium">Beta Inc.</p>
              </div>
            </div>
          </div>

          {/* Business Information Details */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 font-bold text-lg">
                <BriefcaseBusiness className="text-purple-500" /> Business
                Information
              </div>
              <span className="text-sm text-gray-700">
                Client Business Overview
              </span>
            </div>
            <div className="flex items-center justify-between border-y py-2">
              <div className="flex items-center gap-2 text-purple-600">
                <Contact className="h-4 w-4" />
                <h3 className="text-sm font-medium">Business Details</h3>
              </div>
              {!businessToEdit && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500"
                    onClick={handlePrevious}
                    disabled={businesses.length <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous business</span>
                  </Button>
                  <span className="text-xs border py-1 px-4 border-purple-700 text-purple-700 rounded-full">
                    {currentIndex + 1} of {businesses.length} Businesses
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500"
                    onClick={handleNext}
                    disabled={businesses.length <= 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next business</span>
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">Name</Label>
                {businessToEdit ? (
                  <Input
                    value={businessToEdit?.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm font-medium">{currentBusiness.name}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-gray-500">Business Type</Label>
                {businessToEdit ? (
                  <Select
                    value={businessToEdit?.business_type || ""}
                    onValueChange={(value) =>
                      handleInputChange("business_type", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT Marketing Company">
                        IT Marketing Company
                      </SelectItem>
                      <SelectItem value="Environmental Consulting">
                        Environmental Consulting
                      </SelectItem>
                      <SelectItem value="Financial Services">
                        Financial Services
                      </SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm font-medium">
                    {currentBusiness.business_type}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-gray-500">Address</Label>
              {businessToEdit ? (
                <Textarea
                  value={businessToEdit?.address || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              ) : (
                <p className="text-sm font-medium">{currentBusiness.address}</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <div className="flex justify-end mt-4 gap-2">
            {businessToEdit ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setBusinessToEdit(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={handleSaveEdit}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={() => {
                    alert("show export details screen");
                  }}
                >
                  Export Details
                </Button>
                <Button
                  type="button"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => setBusinessToEdit(currentBusiness)}
                >
                  Edit Details
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
