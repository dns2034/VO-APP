"use client";
import { useState, useRef } from "react";
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

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const [avatarUploadDialogVisible, setAvatarUploadDialogVisible] =
    useState(false);

  // Mock user data (replace with real user data from context or API)
  const profileForm = useForm({
    defaultValues: {
      name: "test",
      email: "test@incub8space.com",
      phone: "+639123456789",
    },
    resolver: zodResolver(profileSchema),
  });

  const { mutateAsync: saveProfileMutation, isPending: isSavingProfile } =
    useMutation({
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

  const handleSave: SubmitHandler<z.infer<typeof profileSchema>> = async (
    data
  ) => {
    await saveProfileMutation(data);
    setEditing(false);
  };

  const onRemoveClick = () => {
    alert("Remove profile picture clicked");
  };

  // const handleLogout = () => {
  //   // Real implementation: logout logic
  //   window.location.href = "/login";
  // };

  return (
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
                  src={avatarUrl || "/placeholder.png"}
                  alt={profileForm.getValues("name")}
                />
                <AvatarFallback>
                  {profileForm
                    .getValues("name")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
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

                  {1 && (
                    <DropdownMenuItem
                      className="cursor-pointer flex items-center gap-x-2"
                      onClick={() => onRemoveClick()}
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
                    disabled={isSavingProfile}
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
                      isSavingProfile
                    }
                    type="submit"
                    className="flex-1 flex items-center gap-1"
                  >
                    <Save className="w-4 h-4" />{" "}
                    {isSavingProfile ? "Saving..." : "Save"}
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

      <ChangeAvatarDialog
        open={avatarUploadDialogVisible}
        onOpenChange={setAvatarUploadDialogVisible}
      />
    </div>
  );
}
