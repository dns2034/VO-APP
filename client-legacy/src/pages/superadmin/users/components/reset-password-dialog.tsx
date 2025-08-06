import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { KeyRound, AlertCircle, Copy, Mail, CheckCircle, Send } from "lucide-react"
import { toast } from "sonner"

type ResetPasswordDialogProps = {
  user: { name: string; email: string }
  open: boolean
  onOpenChange: (open: boolean) => void
  onResetPassword: () => string
  onPasswordGenerated: (password: string) => void
}

export const ResetPasswordDialog = ({
  user,
  open,
  onOpenChange,
  onResetPassword,
  onPasswordGenerated,
}: ResetPasswordDialogProps) => {
  const [tempPassword, setTempPassword] = useState<string | null>(null)

  const copyPasswordToClipboard = () => {
    if (tempPassword) {
      navigator.clipboard.writeText(tempPassword)
      toast.success("Password copied to clipboard")
    }
  }

  const handleContinue = () => {
    const newPassword = onResetPassword()
    setTempPassword(newPassword)
    onPasswordGenerated(newPassword)
  }

  const handleSendEmail = () => {
    // In a real app, this would send an email
    toast.success("Email sent", {
      description: `Temporary password sent to ${user.email}`,
    })
  }



  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open)
        if (!open) setTempPassword(null)
      }}
    >
      <DialogContent className="sm:max-w-md">
        {!tempPassword ? (
          <ResetPasswordConfirm userName={user.name} onContinue={handleContinue} onCancel={() => onOpenChange(false)} />
        ) : (
          <ResetPasswordResult
            userName={user.name}
            userEmail={user.email}
            tempPassword={tempPassword}
            onCopy={copyPasswordToClipboard}
            onDone={() => onOpenChange(false)}
            onSendEmail={handleSendEmail}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

const ResetPasswordConfirm = ({
  userName,
  onContinue,
  onCancel,
}: {
  userName: string
  onContinue: () => void
  onCancel: () => void
}) => (
  <>
    <DialogHeader>
      <div className="flex items-center gap-2 text-purple-600 mb-1">
        <KeyRound className="h-5 w-5" />
        <DialogTitle className="text-gray-800">Reset User Password</DialogTitle>
      </div>
      <p className="text-sm text-gray-600 mt-1">You are about to reset the password for {userName}</p>
    </DialogHeader>

    <div className="space-y-4">
      <div className="bg-purple-50 rounded-md p-3 border border-purple-100">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-purple-600 mt-0.5" />
          <div>
            <p className="font-medium text-sm mb-1 text-purple-600">Reminder</p>
            <p className="text-gray-600 text-xs">This action will:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 text-xs">
              <li>Generate a secure temporary password</li>
              <li>Force the user to change their password on next login</li>
              <li>Invalidate any active sessions for this user</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 rounded-md p-3 border border-purple-100">
        <p className="text-sm font-medium text-purple-600 mb-1">A new secure password will be generated</p>
        <p className="text-xs text-gray-600">
          After confirming, you'll receive a temporary password that you can share with the user.
        </p>
      </div>
    </div>

    <DialogFooter className="sm:justify-end gap-2 mt-2">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="button" className="bg-purple-600 hover:bg-purple-700" onClick={onContinue}>
        Continue
      </Button>
    </DialogFooter>
  </>
)

const ResetPasswordResult = ({
  userName,
  userEmail,
  tempPassword,
  onCopy,
  onSendEmail,
}: {
  userName: string
  userEmail: string
  tempPassword: string
  onCopy: () => void
  onDone: () => void
  onSendEmail: () => void
}) => (
  <>
   <DialogHeader className="space-y-2 pb-0">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-green-100 ">
          <CheckCircle className="h-5 w-5 text-green-500" />
        </div>
        <DialogTitle className="text-xl text-gray-700 font-semibold">Password Reset Successful</DialogTitle>
      </div>
      <p className="text-gray-600 font-normal text-sm">A new temporary password has been generated for {userName}</p>
    </DialogHeader>

    <div className="space-y-6 pt-2">
      <div className="space-y-2">
        <p className="text-purple-600 font-medium text-sm">Temporary Password:</p>
        <div className="flex items-center">
          <div className="flex-1 border rounded-l-md p-1 bg-white">
            <p className=" text-gray-800  px-2 ">{tempPassword}</p>
          </div>
          <Button
            type="button"
            className="h-[34px] w-[34px] rounded-l-none bg-purple-600 hover:bg-purple-700"
            onClick={onCopy}
          >
            <Copy className="h-5 w-5 text-white" />
            <span className="sr-only">Copy password</span>
          </Button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-md p-4 border">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="text-purple-600">
              <Send className="h-4 w-4" />
            </div>
            <p className="text-purple-600 font-medium text-sm">Send Password to User</p>
          </div>

          <p className="text-gray-600 text-sm">You can send this temporary password directly to {userName} via email.</p>

          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-sm" onClick={onSendEmail}>
            <Mail className="h-4 w-4 mr-2" />
            Send to {userEmail}
          </Button>
        </div>
      </div>
    </div>
  </>
)
