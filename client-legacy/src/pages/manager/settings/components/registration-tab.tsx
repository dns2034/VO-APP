import { useState } from "react";
import { CircleUserRound, Shield, Clock, UserPlus, UserX } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import CustomAlertDialog from "@/components/generics/custom-alert-dialog";

interface RegistrationTabProps {
  allowRegistration: boolean;
  setAllowRegistration: (value: boolean) => void;
}

export const RegistrationTab = ({
  allowRegistration,
  setAllowRegistration,
}: RegistrationTabProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingValue, setPendingValue] = useState(allowRegistration);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleToggleChange = (checked: boolean) => {
    setPendingValue(checked);
    setShowConfirmDialog(true);
  };

  const confirmToggleChange = (confirmed: boolean) => {
    if (!confirmed) {
      setShowConfirmDialog(false);
      return;
    }
  
    const newValue = pendingValue;
    setAllowRegistration(newValue);
    setLastUpdated(new Date());
    setShowConfirmDialog(false);
  
    const action = newValue ? "enabled" : "disabled";
  
    toast[newValue ? "success" : "error"](
      <div className="flex flex-col">
        <span className="font-medium">
          User Registration: {action.charAt(0).toUpperCase() + action.slice(1)}
        </span>
        <span className="text-xs text-gray-400">
          {lastUpdated.toLocaleString([], {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>,
      {
        icon: newValue ? (
          <UserPlus className="w-4 h-4" />
        ) : (
          <UserX className="w-4 h-4" />
        ),
        classNames: {
          toast: newValue
            ? "group-[.toaster]:bg-green-500 group-[.toaster]:text-white"
            : "group-[.toaster]:bg-red-500 group-[.toaster]:text-white",
          description: "group-[.toast]:text-white/80",
        },
      }
    );
  };
  

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">User Registration</CardTitle>
        <CardDescription>
          Manage the ability for new users to register accounts on the platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between py-6 px-5 border rounded">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <CircleUserRound className="h-4 w-4 text-[#7844ec]" />
            </div>
            <Label htmlFor="allow-registration" className="font-medium">
              Allow User Registration
            </Label>
          </div>
          <Switch
            id="allow-registration"
            checked={allowRegistration}
            onCheckedChange={handleToggleChange}
            className="data-[state=checked]:bg-[#39FF9C] data-[state=unchecked]:bg-gray-200"
          />
        </div>

        <div className="flex items-center justify-between py-6 px-5 border rounded">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Shield className="h-4 w-4 text-[#7844ec]" />
            </div>
            <span className="font-medium text-sm">Current Status</span>
          </div>
          <div className={`flex items-center ${allowRegistration ? "text-green-500" : "text-red-500"}`}>
            {allowRegistration ? (
              <>
                <UserPlus className="h-4 w-4 mr-1" />
                <span>Enabled</span>
              </>
            ) : (
              <>
                <UserX className="h-4 w-4 mr-1" />
                <span>Disabled</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t">
        <div className="flex items-center mt-4 text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-2 text-purple-600" />
          <span>Last updated: {lastUpdated.toLocaleString()}</span>
        </div>
      </CardFooter>

      <CustomAlertDialog
        open={showConfirmDialog}
        onOpenChange={(open) => {
          if (!open) confirmToggleChange(false);
          setShowConfirmDialog(open);
        }}
        title={`Confirm ${pendingValue ? "Enable" : "Disable"} Registration`}
        description={
          pendingValue
            ? "Enable user registration. New users will be able to create accounts on the platform."
            : "Disable user registration. Existing users will still be able to log in."
        }
        cancelText="Cancel"
        confirmText={pendingValue ? "Enable" : "Disable"}
        variant={pendingValue ? "info" : "danger"} 
        onConfirm={() => confirmToggleChange(true)}
      />
    </Card>
  );
};
