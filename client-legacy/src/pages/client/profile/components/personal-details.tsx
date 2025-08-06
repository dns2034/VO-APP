import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/auth-context";
import { getInitials } from "@/utils/avatar";
import { getGravatarUrl } from "@/utils/helper";
import { formatDate } from "date-fns";
import { Camera, Image, Mail, Phone, Trash, User } from "lucide-react";
import { useState } from "react";
import CustomAlertDialog from "@/components/generics/custom-alert-dialog";


type TPersonalDetailsProps = {
  onRemoveClick: () => void;
  onUploadCick: () => void;
};

export default function PersonalDetails({
  onRemoveClick,
  onUploadCick,
}: TPersonalDetailsProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false); 

  const handleItemClick = (cb: () => void) => {
    setOpen(false);
    cb();
  };


  const handleConfirmRemove = () => {
    onRemoveClick();
    setAlertOpen(false);
  };

  return (
    <div className="flex flex-col items-center text-center">
      <CustomAlertDialog
        open={alertOpen}
        onOpenChange={setAlertOpen}
        title="Remove Profile Picture"
        description="Are you sure you want to remove your profile picture? This action cannot be undone."
        onConfirm={handleConfirmRemove}
        cancelText="Cancel"
        confirmText="Remove"
        variant="danger"
      />

      <div className="relative group mb-6">
        <div className="absolute inset-0 bg-violet-500 bg-opacity-0 group-hover:bg-opacity-10 rounded-full transition-all duration-300" />
        <Avatar className="h-32 w-32 border-4 border-background shadow-md">
          <AvatarImage
            className="object-cover object-center"
            src={user?.profile_pic ?? getGravatarUrl(user?.email as string)}
            alt={`${user?.first_name} ${user?.last_name}`}
          />
          <AvatarFallback className="text-3xl bg-violet-100 text-violet-600">
            {getInitials(`${user?.first_name} ${user?.last_name}`)}
          </AvatarFallback>
        </Avatar>

        <DropdownMenu open={open} onOpenChange={setOpen}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 h-10 w-10 rounded-full shadow-md opacity-90 hover:opacity-100"
                  >
                    <Camera className="h-5 w-5" />
                    <span className="sr-only">Change profile picture</span>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit profile picture</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenuContent>
            <DropdownMenuLabel>Profile Picture</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-x-2"
              onClick={() => handleItemClick(onUploadCick)}
            >
              <Image className="h-4 w-4" />
              Upload photo
            </DropdownMenuItem>

            {user?.profile_pic && (
              <DropdownMenuItem
                className="cursor-pointer flex items-center gap-x-2"
                onClick={() => handleItemClick(onRemoveClick)}
              >
                <Trash className="h-4 w-4" />
                Remove
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <h2 className="text-xl font-bold">
        {user?.first_name} {user?.last_name}
      </h2>
      <p className="text-sm text-muted-foreground mb-3">{user?.email}</p>

      <Badge variant="outline" className="mb-6 uppercase">
        {user?.user_role.name}
      </Badge>

      <div className="w-full space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100">
              <Mail className="h-6 w-6 text-violet-600" />
            </div>
            <div className="text-left">
              <p className="text-base font-medium">Email</p>
              <p className="text-sm text-muted-foreground mb-3">
                {user?.email
                  ? user.email.length > 22
                    ? `${user.email.slice(0, 22)}...`
                    : user.email
                  : ""}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100">
              <Phone className="h-6 w-6 text-violet-600" />
            </div>
            <div className="text-left">
              <p className="text-base font-medium">Phone</p>
              <p className="text-sm text-muted-foreground">
                {user?.phone || "No phone number"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100">
              <User className="h-6 w-6 text-violet-600" />
            </div>
            <div className="text-left">
              <p className="text-base font-medium">Member Since</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(user?.created_at as string, "MMMM dd, yyyy")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}