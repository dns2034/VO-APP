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
  LogOut,
  Save,
  Edit2,
  KeyRound,
  Trash2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  // Mock user data (replace with real user data from context or API)
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane@example.com");
  const [phone, setPhone] = useState("09171234567");
  const [editing, setEditing] = useState(false);
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock handlers (replace with real API calls)
  const handleSave = () => {
    setEditing(false);
    // Save logic here
  };

  const handleResetPassword = () => {
    setPasswordResetSent(true);
    setTimeout(() => setPasswordResetSent(false), 2000);
    // Real implementation: trigger password reset email
  };

  const handleLogout = () => {
    // Real implementation: logout logic
    window.location.href = "/login";
  };

  const handleDeleteAccount = () => {
    // Real implementation: request account deletion
    alert("Account deletion requested.");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex flex-row items-center bg-white text-gray-900 p-4 border-b border-border">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="font-bold text-lg flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Profile
          </h1>
          <p className="text-xs text-gray-500">
            Manage your profile and account settings.
          </p>
        </div>
      </header>
      <main className="flex-1 flex flex-col gap-0 p-4 lg:p-6 max-w-2xl w-full mx-auto">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 mb-4">
            <TabsTrigger value="personal">Personal Details</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <div className="flex flex-col items-center mb-4 mt-4 relative">
              <Avatar className="w-20 h-20 mb-2 border-2 border-primary shadow">
                <AvatarImage src={avatarUrl || "/placeholder.png"} alt={name} />
                <AvatarFallback>
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
                {/* Overlay edit icon */}
                <button
                  type="button"
                  className="absolute bottom-1 right-1 bg-white rounded-full border border-border shadow p-1 flex items-center justify-center hover:bg-muted transition"
                  style={{ zIndex: 2 }}
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Change Photo"
                >
                  <Edit2 className="w-4 h-4 text-primary" />
                </button>
              </Avatar>
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
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
                <div>
                  <label className="block text-xs font-medium mb-1 flex items-center gap-1">
                    <User className="w-3 h-3 text-muted-foreground" />
                    Name
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!editing}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-muted-foreground" />
                    Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!editing}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    Phone
                  </label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!editing}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-row gap-2 mt-2">
                  {editing ? (
                    <>
                      <Button
                        type="submit"
                        className="flex-1 flex items-center gap-1"
                      >
                        <Save className="w-4 h-4" /> Save
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setEditing(false)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="button"
                      className="flex-1 flex items-center gap-1"
                      onClick={() => setEditing(true)}
                    >
                      <Edit2 className="w-4 h-4" /> Edit Profile
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="actions">
            <div className="bg-white rounded-lg border border-border p-4 flex flex-col gap-2 mt-4">
              <div className="flex flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={handleResetPassword}
                  disabled={passwordResetSent}
                  className="flex-1 flex items-center gap-2 justify-center"
                >
                  <KeyRound className="w-4 h-4" />
                  {passwordResetSent
                    ? "Password Reset Sent!"
                    : "Reset Password"}
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="flex-1 flex items-center gap-2 justify-center"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-2 justify-center mt-2 border-dashed text-red-600 border-red-300 hover:bg-red-50"
                onClick={handleDeleteAccount}
              >
                <Trash2 className="w-4 h-4" />
                Request Delete Account
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <BottomBar />
    </div>
  );
}
