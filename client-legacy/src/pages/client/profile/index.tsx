import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import ChangeAvatarDialog from "@/pages/client/profile/components/change-avatar-dialog";
import { useState } from "react";
import CustomAlertDialog from "@/components/generics/custom-alert-dialog";
import ProfileForm from "@/pages/client/profile/components/profile-form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AdvancedTabContent from "@/pages/client/profile/components/advanced-tab-content";
import PersonalDetails from "@/pages/client/profile/components/personal-details";
import { useDeleteAvatarMutation, useUpdateAvatarMutation } from "./mutations";
import { handleMutationError } from "@/utils/helper";

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [avatarUploadDialogVisible, setAvatarUploadDialogVisible] =
    useState<boolean>(false);
  const [removeAvatarAlertDialogVisible, setRemoveAvatarAlertDialogVisible] =
    useState<boolean>(false);

  const {
    mutateAsync: deleteAvatarMutateAsync,
    isPending: deleteAvatarIsPending,
  } = useDeleteAvatarMutation();
  const {
    mutateAsync: updateAvatarMutateAsync,
    isPending: updateAvatarIsPending,
  } = useUpdateAvatarMutation();

  const handleRemoveAvatar = async () => {
    if (!user?.profile_pic) {
      toast.error("Error", {
        description: "No avatar to remove",
      });

      return;
    }

    await deleteAvatarMutateAsync(
      { profilePicUrl: user.profile_pic },
      {
        onSuccess: async () => {
          if (user) {
            updateUser({ ...user, profile_pic: undefined });
          }

          await updateAvatarMutateAsync(
            {
              userId: user.id,
              profilePicPath: null,
            },
            {
              onSuccess: () => {
                toast.success("Success", {
                  description: "Avatar removed successfully",
                });
                setRemoveAvatarAlertDialogVisible((prev) => !prev);
              },
              onError: handleMutationError,
            }
          );
        },
        onError: handleMutationError,
      }
    );
  };

  return (
    <>
      <div className="flex items-center w-full flex-col gap-3 justify-center p-4 bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full md:max-w-4xl">
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <PersonalDetails
                onRemoveClick={() => setRemoveAvatarAlertDialogVisible(true)}
                onUploadCick={() => setAvatarUploadDialogVisible(true)}
              />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardContent className="p-0">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                {/* Personal Info Tab */}
                <TabsContent value="personal" className="p-6">
                  <ProfileForm />
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="advanced" className="p-6">
                  <AdvancedTabContent />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <ChangeAvatarDialog
        open={avatarUploadDialogVisible}
        onOpenChange={setAvatarUploadDialogVisible}
      />

      <CustomAlertDialog
        open={removeAvatarAlertDialogVisible}
        onOpenChange={setRemoveAvatarAlertDialogVisible}
        title="Are you absolutely sure?"
        description=" This action cannot be undone. This will permanently delete your profile picture and remove it from our servers."
        onConfirm={handleRemoveAvatar}
        cancelDisabled={deleteAvatarIsPending || updateAvatarIsPending}
        confirmDisabled={deleteAvatarIsPending || updateAvatarIsPending}
      />
    </>
  );
};

export default Profile;
