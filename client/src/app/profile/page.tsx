"use client";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BottomBar from "@/components/bottom-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, Save, Edit2, User2, Camera } from "lucide-react";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { supabaseClient } from "@/services/supabase/client";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock user data (replace with real user data from context or API)
  const profileForm = useForm({
    defaultValues: {
      name: "John Doe",
      email: "johndoe@gmail.com",
      phone: "+1234567890",
    },
    resolver: zodResolver(profileSchema),
  });

  // Mock handlers (replace with real API calls)
  const handleSave: SubmitHandler<z.infer<typeof profileSchema>> = async (
    data
  ) => {
    await updateUserProfile(data);
    setEditing(false);
    // Save logic here
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
        <div className="flex flex-col items-center my-4">
          <div className="mb-2 relative">
            <Avatar className="size-20">
              <AvatarImage
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

            <button
              type="button"
              className="absolute -bottom-1 right-0 bg-white rounded-full border border-border shadow p-2 flex items-center justify-center hover:bg-muted transition"
              style={{ zIndex: 2 }}
              onClick={() => fileInputRef.current?.click()}
              aria-label="Change Photo"
            >
              <Camera className="size-4 text-primary" />
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                  setAvatarUrl(ev.target?.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
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
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={
                      !profileForm.formState.isValid ||
                      !profileForm.formState.isDirty
                    }
                    type="submit"
                    className="flex-1 flex items-center gap-1"
                  >
                    <Save className="w-4 h-4" /> Save
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
  );
}
