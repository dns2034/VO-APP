import { ChartConfig } from "@/components/ui/chart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import DialogChart from "./dialog-chart";

type TCreditsDialog = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  creditCounts: {
    active: number;
    used: number;
    expired: number;
  };
};
interface ChartData {
  state: string;
  credits: number;
  fill: string;
}

const chartConfig = {
  credits: {
    label: "Credits",
  },
  used: {
    label: "Used",
    color: "hsl(258, 79%, 66%)",
  },
  active: {
    label: "Active",
    color: "hsl(155, 71%, 52%)",
  },
  expired: {
    label: "Expired",
    color: "hsl(359, 100%, 65%)",
  },
  none: {
    label: "No Points",
    color: "hsl(240, 2%, 34%)",
  },
} satisfies ChartConfig;

const CreditsDialog = ({
  open,
  onOpenChange,
  creditCounts,
}: TCreditsDialog) => {
  const [chartData, setChartData] = useState<ChartData[] | undefined>([]);

  useEffect(() => {
    const total =
      creditCounts.active + creditCounts.used + creditCounts.expired;
    if (total > 0) {
      setChartData([
        {
          state: "active",
          credits: creditCounts.active,
          fill: "var(--color-active)",
        },
        {
          state: "used",
          credits: creditCounts.used,
          fill: "var(--color-used)",
        },
        {
          state: "expired",
          credits: creditCounts.expired,
          fill: "var(--color-expired)",
        },
      ]);
    } else {
      setChartData([
        {
          state: "none",
          credits: 1,
          fill: "var(--color-none)",
        },
      ]);
    }
  }, [creditCounts]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[60rem] h-[20rem] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Your Credits Summary</DialogTitle>
        </DialogHeader>
        <div className="w-full h-full flex items-center gap-8 p-4">
          <div className="w-1/2 h-full">
            {" "}
            {/* Container for the chart */}
            <DialogChart
              type={"credits"}
              chartConfig={chartConfig}
              chartData={chartData}
              totalPoints={
                creditCounts.active + creditCounts.expired + creditCounts.used
              }
            />
          </div>
          <div className="flex flex-col justify-center gap-y-4 w-1/2">
            {[
              {
                label: "Active Credits",
                value: creditCounts.active,
                color: chartConfig.active.color,
              },
              {
                label: "Used Credits",
                value: creditCounts.used,
                color: chartConfig.used.color,
              },
              {
                label: "Expired Credits",
                value: creditCounts.expired,
                color: chartConfig.expired.color,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-3 rounded-lg border bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="font-medium text-sm">{item.label}</p>
                </div>
                <p
                  className="font-bold text-lg"
                  style={{ color: item.color }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreditsDialog;
