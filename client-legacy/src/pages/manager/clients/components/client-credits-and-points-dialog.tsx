import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { creditsKeys, pointsKeys } from "@/lib/query-factory";
import { getClientPoints } from "@/pages/shared/services/points-service";
import { getClientCreditsByUserId } from "@/pages/shared/services/credits-service";
import { updateClientPointsByUserId } from "@/pages/shared/services/points-service";
import { updateClientCreditsByUserId } from "@/pages/shared/services/credits-service";
import type { TUserProfile } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  client: TUserProfile | null;
}

export const ClientPointsAndCreditsDialog = ({
  client,
  onOpenChange,
  open,
}: Props) => {
  const [pointsAmount, setPointsAmount] = useState<number>(0);
  const [creditsAmount, setCreditsAmount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"credits" | "points">("credits");

  const { data: points, isLoading: pointLoading } = useQuery({
    enabled: !!client && !!client.user_id,
    queryKey: pointsKeys.list(client?.user_id || ""),
    queryFn: async () => await getClientPoints(client?.user_id || ""),
  });

  const { data: credits, isLoading: creditLoading } = useQuery({
    enabled: !!client && !!client.user_id,
    queryKey: creditsKeys.list(client?.user_id || ""),
    queryFn: async () => await getClientCreditsByUserId(client?.user_id || ""),
  });

  useEffect(() => {
    if (!pointLoading && !creditLoading) {
      setPointsAmount(points?.length || 0);
      setCreditsAmount(credits?.length || 0);
    }
  }, [pointLoading, points, creditLoading, credits]);

  const handleAdjustmentChange = (value: string) => {
    const numValue = Number.parseInt(value) || 0;
    // setAdjustAmount((prev) => prev + numValue);
    if (activeTab === "credits") {
      setCreditsAmount((prev) => prev + numValue);
    } else {
      setPointsAmount((prev) => prev + numValue);
    }
  };

  const handlePresetClick = (amount: number) => {
    if (activeTab === "credits") {
      setCreditsAmount((prev) => prev + amount);
    } else {
      setPointsAmount((prev) => prev + amount);
    }
  };

  const handleIncrement = () => {
    if (activeTab === "credits") {
      setCreditsAmount((prev) => prev + 1);
    } else {
      setPointsAmount((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (activeTab === "credits") {
      setCreditsAmount((prev) => (prev === 0 ? 0 : prev - 1));
    } else {
      setPointsAmount((prev) => (prev === 0 ? 0 : prev - 1));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 w-11/12 md:w-full rounded">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-lg font-semibold text-purple-600">Credits</h2>
        </div>
        {/* Profile Section */}
        <div className="flex flex-col items-center px-6 pb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
            <img
              src={client?.profile_pic ?? "https://github.com/shadcn.png"}
              alt="Client Avatar"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-semibold text-gray-900">
            {client?.first_name} {client?.last_name}
          </h3>
          <p className="text-sm text-gray-500">{client?.email}</p>
        </div>

        {/* Tabs */}
        <div className="px-6">
          <Tabs
            value={activeTab}
            onValueChange={(text) => {
              setActiveTab(text as "credits" | "points");
            }}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="credits"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Credits
              </TabsTrigger>
              <TabsTrigger value="points">Points</TabsTrigger>
            </TabsList>

            <TabsContent value="credits" className="space-y-6">
              {/* Adjust Credits */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">
                  Adjust Credits
                </h4>

                <ClientsAndPointsControlSection
                  adjustAmount={creditsAmount}
                  handleAdjustmentChange={handleAdjustmentChange}
                  handlePresetClick={handlePresetClick}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                />
              </div>

              {/* Details */}
              <CreditsAndPointsDetails
                oldBalance={credits?.length || 0}
                newBalance={creditsAmount}
              />
            </TabsContent>

            <TabsContent value="points">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">
                  Adjust Points
                </h4>

                <ClientsAndPointsControlSection
                  adjustAmount={pointsAmount}
                  handleAdjustmentChange={handleAdjustmentChange}
                  handlePresetClick={handlePresetClick}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                />
              </div>

              {/* Details */}
              <CreditsAndPointsDetails
                oldBalance={points?.length || 0}
                newBalance={pointsAmount}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 pt-6 border-t">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <ConfirmationAlertDialog
            onOpenChange={onOpenChange}
            email={client?.email || ""}
            userId={client?.user_id || ""}
            oldBalance={
              activeTab === "credits"
                ? credits?.length || 0
                : points?.length || 0
            }
            newBalance={activeTab === "credits" ? creditsAmount : pointsAmount}
            activeTab={activeTab}
          >
            <Button
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              onClick={() => {}}
            >
              Update Balance
            </Button>
          </ConfirmationAlertDialog>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientPointsAndCreditsDialog;

function CreditsAndPointsDetails({
  newBalance,
  oldBalance,
}: {
  newBalance: number;
  oldBalance: number;
}) {
  return (
    <div>
      <h4 className="font-medium text-gray-900 mb-4">Details</h4>
      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Current Balance:</span>
          <span className="font-medium">{oldBalance}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">New Balance:</span>
          <span className="font-medium text-green-600">{newBalance}</span>
        </div>
      </div>
    </div>
  );
}

function ClientsAndPointsControlSection({
  adjustAmount,
  handleDecrement,
  handleAdjustmentChange,
  handleIncrement,
  handlePresetClick,
}: {
  adjustAmount: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleAdjustmentChange: (value: string) => void;
  handlePresetClick: (amount: number) => void;
}) {
  return (
    <>
      <div className="flex items-center justify-center gap-3 mb-4">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-md border-purple-200"
          onClick={handleDecrement}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <Input
          type="number"
          value={adjustAmount}
          onChange={(e) => handleAdjustmentChange(e.target.value)}
          className="w-20 text-center border-purple-200 focus:border-purple-400"
        />

        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-md border-purple-200"
          onClick={handleIncrement}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[5, 10, 20, 30].map((amount) => (
          <Button
            key={amount}
            variant="outline"
            size="sm"
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
            onClick={() => handlePresetClick(amount)}
          >
            +{amount}
          </Button>
        ))}
      </div>
    </>
  );
}

function ConfirmationAlertDialog({
  onOpenChange,
  email,
  userId,
  children,
  oldBalance,
  newBalance,
  activeTab,
}: {
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
  email: string;
  userId: string;
  activeTab: "points" | "credits";
  oldBalance: number;
  newBalance: number;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Changes?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to update the (credits/points) of
            {email} account?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onOpenChange(false);
              if (activeTab === "credits") {
                updateClientCreditsByUserId(userId, oldBalance, newBalance)
                  .then(() => {
                    toast.success("Credit balance updated");
                  })
                  .catch((error) => {
                    toast.error(error.message);
                  });
              } else {
                updateClientPointsByUserId(userId, oldBalance, newBalance)
                  .then(() => {
                    toast.success("Point balance updated");
                  })
                  .catch((error) => {
                    toast.error(error.message);
                  });
              }
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
