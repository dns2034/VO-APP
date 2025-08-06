import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangePasswordField, requestValidator } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "@supabase/supabase-js";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { updatePassword } from "../../../shared/services/profile-service";

const ChangePasswordForm = () => {
  const passwordForm = useForm<ChangePasswordField>({
    resolver: zodResolver(requestValidator.changePassword),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [openDialog, setDialogOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const {
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
    reset,
  } = passwordForm;

  const handlePasswordChange: SubmitHandler<ChangePasswordField> = async (
    values
  ) => {
    if (!isDirty || isSubmitting) return;
    try {
      await updatePassword(values);

      toast.success("Success", {
        description: "Password updated successfully",
      });

      reset();
    } catch (error) {
      const err = error as AuthError;
      toast.error("Profile Settings", { description: err.message });
    }
  };

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(open) => {
        setDialogOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Change Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 sm:rounded-t-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription className="text-white">
              Enter your current password and a new password to update your
              credentials.
            </DialogDescription>
          </DialogHeader>
        </div>
        <Form {...passwordForm}>
          <form
            className="space-y-6 px-6 pt-4 pb-6 w-full"
            onSubmit={handleSubmit(handlePasswordChange)}
          >
            <div className="flex flex-col justify-center w-full gap-6">
              <div className="space-y-2">
                <FormField
                  control={passwordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            className="w-full"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant={null}
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant={null}
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => {
                              setShowConfirmPassword(!showConfirmPassword);
                            }}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      {errors.confirmPassword && (
                        <FormMessage>
                          {errors.confirmPassword.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                disabled={!isDirty || isSubmitting}
                type="submit"
                variant="secondary"
                className="bg-primary hover:bg-violet-700 text-white w-full"
              >
                {isSubmitting ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordForm;
