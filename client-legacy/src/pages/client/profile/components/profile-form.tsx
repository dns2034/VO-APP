import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { type UpdateProfileField, requestValidator } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader, Mail, Phone, User } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useUpdateProfileMutation } from "../mutations";
import { handleMutationError } from "@/utils/helper";

const ProfileForm = () => {
  const { user, updateUser } = useAuth();

  const profileForm = useForm<UpdateProfileField>({
    resolver: zodResolver(requestValidator.updateProfile),
    defaultValues: {
      firstName: user?.first_name,
      lastName: user?.last_name,
    },
  });

  const { mutateAsync: updateProfileMutateAsync } = useUpdateProfileMutation();

  const handleProfileUpdate: SubmitHandler<UpdateProfileField> = async ({
    firstName,
    lastName,
  }) => {
    if (!profileForm.formState.isDirty || !user) return;
    
    const values = {
      firstName,
      lastName,
    };

    await updateProfileMutateAsync(
      { values, userId: user.id },
      {
        onSuccess: () => {
          updateUser({ ...user, first_name: firstName, last_name: lastName });
          profileForm.reset({ firstName, lastName });

          toast.success("Success", {
            description: "Profile updated successfully",
          });
        },
        onError: handleMutationError,
      }
    );
  };

  return (
    <Form {...profileForm}>
      <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <FormField
                control={profileForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} className="pr-10" />
                        <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={profileForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl className="relative">
                      <div className="relative">
                        <Input {...field} className="pr-10" />
                        <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  value={user?.email}
                  disabled
                  className="pr-10 bg-muted/50"
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                Your email cannot be changed
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  value={user?.phone || ""}
                  disabled
                  placeholder="No phone number"
                  className="pr-10 bg-muted/50"
                />
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              disabled={
                !profileForm.formState.isDirty ||
                profileForm.formState.isSubmitting
              }
              type="submit"
              className="bg-primary hover:bg-violet-700"
            >
              {profileForm.formState.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader className="animate-spin h-4 w-4" />
                  Saving
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Save Changes
                </span>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
