import { Button } from "@/components/ui/button";
import { Lock, Trash } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function AdvancedTabContent() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Password</h3>

        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="w-fit">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100">
                <Lock className="h-5 w-5 text-violet-600" />
              </div>
            </div>
            <div>
              <p className="font-medium">Password</p>
              <p className="text-sm text-muted-foreground">
                Reset your password via email
              </p>
            </div>
          </div>
          {/* <ChangePasswordForm /> */}
          <Button variant="outline" asChild>
            <NavLink to="/reset-password">Change Password</NavLink>
          </Button>
        </div>
      </div>

      {/* <div className="space-y-4">
        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>

        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="w-fit">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100">
                <Shield className="h-5 w-5 text-violet-600" />
              </div>
            </div>
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>
          <Switch
            checked={true}
            onCheckedChange={(checked) => alert(checked)}
          />
        </div>
      </div> */}

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-red-500">Danger Zone</h3>

        <div className="flex items-start gap-4 p-4 rounded-lg border flex-col">
          <div className="flex items-center gap-3">
            <div className="w-fit">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
                <Trash className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div className="w-auto">
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-muted-foreground">
                  Deleting your account is permanent and cannot be undone.
                  Please proceed only if you're absolutely sure you want to
                  delete your account.
                </p>
              </div>
            </div>
          </div>
          <Button
            className="self-end"
            variant="destructive"
            onClick={() => alert("Request")}
          >
            Request Account Deletion
          </Button>
        </div>
      </div>

      {/* <div className="rounded-lg border p-4 bg-muted/30">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 shrink-0">
            <Shield className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="font-medium">Security Recommendations</p>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Use a strong, unique password
              </li>
              <li className="flex items-center gap-2">
                {(user?.factors?.length as number) > 0 ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-amber-500" />
                )}
                Enable two-factor authentication
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Keep your contact information up to date
              </li>
            </ul>
          </div>
        </div>
      </div> */}

      {/* <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-violet-50 to-white">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100">
              <Shield className="h-5 w-5 text-violet-600" />
            </div>
            <h2 className="text-xl font-semibold">Security Settings</h2>
          </div>
        </div>

        <div className="divide-y">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100">
                  <Lock className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-muted-foreground">
                    Reset your password via email
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => alert("reset")}
                className="transition-all duration-300 hover:bg-violet-50 hover:text-violet-700"
              >
                Reset Password
              </Button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100">
                  <Shield className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground mr-2">
                  {is2FAEnabled ? "Enabled" : "Disabled"}
                </span>
                <Switch
                  checked={is2FAEnabled}
                  onCheckedChange={handle2FAToggle}
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full group">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100">
                    <Shield className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-left">
                      Security Recommendations
                    </p>
                    <p className="text-sm text-muted-foreground text-left">
                      Tips to keep your account secure
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-[3.25rem] pr-4 pb-4 pt-2 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 shrink-0" />
                  <p>Use a strong, unique password</p>
                </div>
                <div className="flex items-center gap-2">
                  {is2FAEnabled ? (
                    <Check className="h-4 w-4 text-green-500 shrink-0" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-amber-500 shrink-0" />
                  )}
                  <p>Enable two-factor authentication</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 shrink-0" />
                  <p>Keep your contact information up to date</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 shrink-0" />
                  <p>Sign out from shared devices</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 shrink-0" />
                  <p>Review recent login activity regularly</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>
      <section className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-red-50 to-white">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-red-700">Danger Zone</h2>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col justify-between gap-4">
            <div>
              <p className="font-medium text-red-700">Delete Account</p>
              <p className="text-sm text-red-600">
                Deleting your account is permanent and cannot be undone. Please
                proceed only if you're absolutely sure you want to delete your
                account.
              </p>
            </div>
            <Button
              variant="destructive"
              className="md:self-end"
              onClick={() => alert("1")}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Request Account Deletion
            </Button>
          </div>
        </div>
      </section> */}
    </div>
  );
}
