import { zodResolver } from "@hookform/resolvers/zod";
import { Gift, Loader, Mail, MessageSquare, Check, X } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDebounce } from "use-debounce";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/auth-context";
import { requestValidator, type TransferVoucherField } from "@/lib/validator";
import { queryClient } from "@/main";
import { handleMutationError } from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTransferVoucherMutation } from "../mutations";
import { userQueries, voucherQueries } from "../queries";
import { Textarea } from "@/components/ui/textarea";

export default function SendVoucherDialog() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const form = useForm<TransferVoucherField>({
    resolver: zodResolver(requestValidator.transferVoucher),
    defaultValues: {
      recipientEmail: "",
      selectedVoucherId: "",
      message: "",
    },
  });

  const watchedEmail = form.watch("recipientEmail");
  const [debouncedEmail] = useDebounce(watchedEmail, 500);

  const { data: voucherQueryData, isLoading } = useQuery(
    voucherQueries.user({ userId: user?.id as string })
  );

  const { data: userExists, isFetching } = useQuery({
    ...userQueries.checkIfUserExistsViaEmail({ email: debouncedEmail }),
    enabled: Boolean(debouncedEmail),
  });

  const { mutateAsync } = useTransferVoucherMutation();

  const onSubmit: SubmitHandler<TransferVoucherField> = async (data) => {
    if (!user) return;
    const { recipientEmail, selectedVoucherId, message } = data;

    await mutateAsync(
      {
        recipientEmail,
        userId: user.id,
        voucherId: selectedVoucherId,
        message,
      },
      {
        onSuccess: () => {
          toast.success(`Voucher transferred to ${recipientEmail}`);
          queryClient.invalidateQueries({
            queryKey: voucherQueries.user({ userId: user?.id as string })
              .queryKey,
          });
          form.resetField("selectedVoucherId", { defaultValue: "" });
          navigate("/client/rewards");
        },
        onError: handleMutationError,
      }
    );
  };

  return (
    <Dialog
      open={location.pathname === "/client/rewards/send-vouchers"}
      onOpenChange={(open) =>
        !open && !form.formState.isSubmitting && navigate("/client/rewards")
      }
    >
      <DialogContent className="w-[90%] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <Gift className="h-5 w-5" />
            Send Vouchers
          </DialogTitle>
          <DialogDescription>
            Send vouchers to your friends and spread joy!
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Available Vouchers</span>
              {isLoading ? (
                <Loader className="animate-spin size-4" />
              ) : (
                <Badge variant="outline" className="font-mono">
                  {voucherQueryData?.length}
                </Badge>
              )}
            </div>
            {isLoading ? (
              <Skeleton className="h-10 w-full rounded-lg" />
            ) : Array.isArray(voucherQueryData) &&
              voucherQueryData.length > 0 ? (
              <FormField
                control={form.control}
                name="selectedVoucherId"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Select Voucher</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger disabled={form.formState.isSubmitting}>
                          <SelectValue placeholder="Select a voucher" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {voucherQueryData.map((voucher) => (
                          <SelectItem key={voucher.id} value={voucher.id}>
                            <div className="flex items-center justify-between w-full">
                              <span>{voucher.voucher_code}</span>
                              <span className="text-sm text-muted-foreground ml-2">
                                {voucher.status}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className="text-sm text-muted-foreground">
                No vouchers available
              </div>
            )}

            <FormField
              control={form.control}
              name="recipientEmail"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    Recipient Email
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        disabled={
                          form.formState.isSubmitting ||
                          voucherQueryData?.length === 0 ||
                          isLoading
                        }
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </FormControl>
                    {debouncedEmail && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {isFetching && (
                          <Loader className="h-4 w-4 animate-spin text-muted-foreground" />
                        )}

                        {!isFetching && userExists !== undefined && (
                          userExists ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-red-500" />
                          )
                        )}
                      </div>
                    )}
                  </div>
                  {debouncedEmail && !isFetching && userExists !== undefined && (
                    <p
                      className={`text-sm ${
                        userExists ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {userExists
                        ? "Email is registered in the V.O App. You can proceed."
                        : "Email not found in the V.O App. Please check and try again."}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Message (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add a personal message..."
                      rows={3}
                      disabled={
                        form.formState.isSubmitting ||
                        voucherQueryData?.length === 0 ||
                        isLoading
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700"
              disabled={
                form.formState.isSubmitting ||
                voucherQueryData?.length === 0 ||
                isLoading ||
                !form.formState.isValid ||
                !userExists
              }
            >
              Send Voucher
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
