"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BottomBar from "@/components/bottom-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  Save,
  Edit2,
  User2,
  Camera,
  Trash,
  Image as ImageIcon,
  Loader,
} from "lucide-react";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabaseClient } from "@/services/supabase/client";
import { useMutation } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ChangeAvatarDialog from "./components/ChangeAvatarDialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

const updateUserProfile = async (formValues: z.infer<typeof profileSchema>) => {
  const { data, error } = await supabaseClient.auth.updateUser({
    data: {
      display_name: formValues.name,
    },
    phone: formValues.phone,
  });

  return { data, error };
};

const deleteAvatar = async ({ avatarUrl }: { avatarUrl: string }) => {
  const { error: metaDataError } = await supabaseClient.auth.updateUser({
    data: { avatar_url: null },
  });

  if (metaDataError) throw new Error(metaDataError.message);

  const urlParts = new URL(avatarUrl);
  const avatarPath = urlParts.pathname.replace(
    "/storage/v1/object/public/avatars/",
    ""
  );

  const { error: storageError } = await supabaseClient.storage
    .from("avatars")
    .remove([avatarPath]);

  if (storageError) throw new Error(storageError.message);
};

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const [avatarUploadDialogVisible, setAvatarUploadDialogVisible] =
    useState(false);
  const [removeAvatarDialogVisible, setRemoveAvatarDialogVisible] =
    useState(false);

  const profileForm = useForm({
    defaultValues: {
      name: user?.user_metadata.display_name,
      email: user?.email,
      phone: user?.phone,
    },
    resolver: zodResolver(profileSchema),
  });

  const {
    mutateAsync: saveProfileMutateAsync,
    isPending: saveProfileIsPending,
  } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      console.log("Profile updated successfully:", data);
      profileForm.reset({
        name:
          data.data?.user?.user_metadata?.display_name ||
          profileForm.getValues("name"),
        email: data.data?.user?.email || profileForm.getValues("email"),
        phone: data.data?.user?.phone || profileForm.getValues("phone"),
      });
      setEditing(false);
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      profileForm.reset();
    },
  });

  const {
    mutateAsync: deleteAvatarMutateAsync,
    isPending: deleteAvatarIsPending,
  } = useMutation({
    mutationFn: deleteAvatar,
    onSuccess: () => {
      setRemoveAvatarDialogVisible(false);
      toast.success("Avatar deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting avatar:", error);
      toast.error("Failed to delete avatar");
    },
  });

  const handleSave: SubmitHandler<z.infer<typeof profileSchema>> = async (
    data
  ) => {
    await saveProfileMutateAsync(data);
    setEditing(false);
  };

  // const handleLogout = () => {
  //   // Real implementation: logout logic
  //   window.location.href = "/login";
  // };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex flex-row items-center bg-white text-gray-900 p-4 border-b border-border">
          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="font-bold text-lg flex items-center gap-2">
              <User2 className="w-5 h-5 text-primary" />
              Profile
            </h1>
            <p className="text-xs text-gray-500">
              Manage your profile and account settings.
            </p>
          </div>
        </header>
        <main className="flex-1 flex flex-col gap-0 p-4 lg:p-6 max-w-2xl w-full mx-auto">
          <div className="flex flex-col items-center">
            <div className="mb-2 relative">
              <div className="relative group mb-6">
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 rounded-full transition-all duration-300" />
                <Avatar className="h-32 w-32 border-4 border-background shadow-md">
                  <AvatarImage
                    className="object-cover object-center"
                    src={user?.user_metadata.avatar_url || "/placeholder.png"}
                    alt={profileForm.getValues("name")}
                  />
                  <AvatarFallback>User&apos;s avatar</AvatarFallback>
                </Avatar>

                <DropdownMenu
                  open={dropdownMenuOpen}
                  onOpenChange={setDropdownMenuOpen}
                >
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
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Profile Picture</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="cursor-pointer flex items-center gap-x-2"
                      onClick={() => setAvatarUploadDialogVisible(true)}
                    >
                      <ImageIcon className="size-4" />
                      Upload photo
                    </DropdownMenuItem>

                    {user?.user_metadata.avatar_url && (
                      <DropdownMenuItem
                        className="cursor-pointer flex items-center gap-x-2"
                        onClick={() => {
                          setRemoveAvatarDialogVisible(true);
                        }}
                      >
                        <Trash className="h-4 w-4" />
                        Remove
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-border p-4">
            <h2 className="font-semibold text-base mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Profile Details
            </h2>
            <Form {...profileForm}>
              <form
                className="flex flex-col gap-4"
                onSubmit={profileForm.handleSubmit(handleSave)}
              >
                <FormField
                  name="name"
                  control={profileForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">
                        <User className="w-3 h-3 text-muted-foreground" />
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!editing}
                          className="w-full"
                        />
                      </FormControl>
                      {profileForm.formState.errors.name && (
                        <FormMessage className="text-red-500 text-xs">
                          {profileForm.formState.errors.name.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={profileForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input {...field} disabled className="w-full" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="phone"
                  control={profileForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!editing}
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {editing ? (
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      disabled={saveProfileIsPending}
                      onClick={() => {
                        profileForm.reset();
                        setEditing(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={
                        !profileForm.formState.isValid ||
                        !profileForm.formState.isDirty ||
                        saveProfileIsPending
                      }
                      type="submit"
                      className="flex-1 flex items-center gap-1"
                    >
                      <Save className="w-4 h-4" />{" "}
                      {saveProfileIsPending ? "Saving..." : "Save"}
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    className="flex-1 flex items-center gap-1"
                    onClick={() => {
                      setEditing(true);
                    }}
                  >
                    <Edit2 className="w-4 h-4" /> Edit Profile
                  </Button>
                )}
              </form>
            </Form>
          </div>
        </main>
        <BottomBar />
      </div>

      <ChangeAvatarDialog
        open={avatarUploadDialogVisible}
        onOpenChange={setAvatarUploadDialogVisible}
      />

      <AlertDialog
        open={removeAvatarDialogVisible}
        onOpenChange={(open) => !open && !deleteAvatarIsPending && setRemoveAvatarDialogVisible(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              profile picture and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex flex-row gap-3 mt-4">
            <Button
              disabled={deleteAvatarIsPending}
              variant={"outline"}
              onClick={() => setRemoveAvatarDialogVisible(false)}
              className="mt-0 flex-1"
            >
              Cancel
            </Button>
            <Button
              disabled={deleteAvatarIsPending}
              className="mt-0 flex-1"
              onClick={async () => {
                await deleteAvatarMutateAsync({
                  avatarUrl: user?.user_metadata.avatar_url || "",
                });
              }}
            >
              {deleteAvatarIsPending ? (
                <span className="flex items-center gap-2">
                  <Loader className="animate-spin h-4 w-4" />
                  Deleting
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Trash className="h-4 w-4" />
                  Delete Avatar
                </span>
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
