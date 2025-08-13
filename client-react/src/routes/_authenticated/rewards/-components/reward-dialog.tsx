import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { storageService } from "@/services/storage.service";

type RewardDialogProps = {
  open: boolean;
  item: {
    id: string;
    name: string;
    description: string;
    image_path: string;
    price: number;
    type: "product" | "reward";
  } | null;
  onOpenChange: (open: boolean) => void;
};

export default function RewardDialog({
  open,
  item,
  onOpenChange,
}: RewardDialogProps) {
  if (!item) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription>
            {item.type === "product" ? "Product" : "Reward"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <img
            src={storageService.getFileUrl(
              item.type === "reward" ? "rewards" : "products",
              item.image_path || "/placeholder.png"
            )}
            alt={item.name}
            className="w-32 h-32 object-cover rounded-md border"
          />
          <div className="text-sm text-muted-foreground text-center">
            {item.description || "No description available."}
          </div>
          <div className="font-semibold text-primary">
            {item.price} {item.type === "product" ? "Credits" : "Points"}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
