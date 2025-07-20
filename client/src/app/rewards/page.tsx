"use client";

import Image from "next/image";
import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useRewards } from "@/hooks/useRewards";
import { useProducts } from "@/hooks/useProducts";
import { useRewardVouchers } from "@/hooks/useRewardVouchers";
import { useProductVouchers } from "@/hooks/useProductVouchers";

type RedemptionCandidate = {
  id: string;
  name: string;
  type: "product" | "reward";
};

export default function RewardsPage() {
  const { rewards } = useRewards();
  const { products } = useProducts();
  const {
    rewardVouchers,
    loading: rewardVouchersLoading,
    createRewardVoucher,
  } = useRewardVouchers();
  const {
    productVouchers,
    loading: productVouchersLoading,
    createProductVoucher,
  } = useProductVouchers();
  const [redeemingId, setRedeemingId] = useState<string | null>(null);
  const [voucherDialogOpen, setVoucherDialogOpen] = useState(false);
  const [redemptionCandidate, setRedemptionCandidate] =
    useState<RedemptionCandidate | null>(null);

  const handleRedeemReward = async (rewardId: string, rewardName: string) => {
    setRedeemingId(rewardId);
    const { voucher, error } = await createRewardVoucher(rewardId);
    if (voucher) {
      toast.success("Reward Redeemed!", {
        description: `Successfully redeemed ${rewardName}. Check your vouchers.`,
      });
    } else {
      toast.error("Redemption Failed", {
        description: error || "Failed to redeem reward. Please try again.",
      });
    }
    setRedeemingId(null);
  };

  const handleRedeemProduct = async (
    productId: string,
    productName: string
  ) => {
    setRedeemingId(productId);
    const { voucher, error } = await createProductVoucher(productId);
    if (voucher) {
      toast.success("Product Redeemed!", {
        description: `Successfully redeemed ${productName}. Check your vouchers.`,
      });
    } else {
      toast.error("Redemption Failed", {
        description: error || "Failed to redeem product. Please try again.",
      });
    }
    setRedeemingId(null);
  };

  const handleConfirmRedemption = () => {
    if (!redemptionCandidate) return;

    if (redemptionCandidate.type === "product") {
      handleRedeemProduct(redemptionCandidate.id, redemptionCandidate.name);
    } else {
      handleRedeemReward(redemptionCandidate.id, redemptionCandidate.name);
    }
    setRedemptionCandidate(null);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AlertDialog
          open={!!redemptionCandidate}
          onOpenChange={(open) => !open && setRedemptionCandidate(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Redemption</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to redeem &quot;
                {redemptionCandidate?.name}&quot;?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmRedemption}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Virtual Office App</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Rewards</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Rewards</h1>
              <p className="text-muted-foreground">
                Redeem your points for amazing products and rewards.
              </p>
            </div>
            <Dialog
              open={voucherDialogOpen}
              onOpenChange={setVoucherDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline">View Vouchers</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>My Vouchers</DialogTitle>
                  <DialogDescription>
                    View your redeemed product and reward vouchers.
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="product-vouchers" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="product-vouchers">
                      Product Vouchers
                    </TabsTrigger>
                    <TabsTrigger value="reward-vouchers">
                      Reward Vouchers
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="product-vouchers">
                    {productVouchersLoading ? (
                      <p>Loading product vouchers...</p>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
                        {productVouchers.map((voucher) => (
                          <Card key={voucher.id}>
                            <CardHeader>
                              <CardTitle className="text-lg">
                                {voucher.code}
                              </CardTitle>
                              <CardDescription>Product Voucher</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground">
                                Status:{" "}
                                <span className="capitalize">
                                  {voucher.status}
                                </span>
                              </p>
                              {voucher.expiring_at && (
                                <p className="text-sm text-muted-foreground">
                                  Expires:{" "}
                                  {new Date(
                                    voucher.expiring_at
                                  ).toLocaleDateString()}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                        {productVouchers.length === 0 && (
                          <p className="text-muted-foreground col-span-full text-center py-8">
                            No product vouchers found.
                          </p>
                        )}
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="reward-vouchers">
                    {rewardVouchersLoading ? (
                      <p>Loading reward vouchers...</p>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
                        {rewardVouchers.map((voucher) => (
                          <Card key={voucher.id}>
                            <CardHeader>
                              <CardTitle className="text-lg">
                                {voucher.code}
                              </CardTitle>
                              <CardDescription>Reward Voucher</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground">
                                Status:{" "}
                                <span className="capitalize">
                                  {voucher.status}
                                </span>
                              </p>
                              {voucher.expiring_at && (
                                <p className="text-sm text-muted-foreground">
                                  Expires:{" "}
                                  {new Date(
                                    voucher.expiring_at
                                  ).toLocaleDateString()}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                        {rewardVouchers.length === 0 && (
                          <p className="text-muted-foreground col-span-full text-center py-8">
                            No reward vouchers found.
                          </p>
                        )}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </header>
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:w-1/3 lg:w-1/4">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>
            <TabsContent value="products">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                {products.map((product) => (
                  <Card key={product.id} className="pt-0">
                    <CardHeader className="p-0">
                      <div className="relative aspect-video">
                        <Image
                          src={product.image_path || "/placeholder.png"}
                          alt={product.name}
                          fill
                          className="rounded-t-lg object-cover"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription className="mt-2 h-10">
                        {product.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <p className="font-semibold">{product.price}</p>
                      <Button
                        onClick={() =>
                          setRedemptionCandidate({
                            id: product.id,
                            name: product.name,
                            type: "product",
                          })
                        }
                        disabled={redeemingId === product.id}
                      >
                        {redeemingId === product.id ? "Redeeming..." : "Redeem"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="rewards">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                {rewards.map((reward) => (
                  <Card key={reward.id} className="pt-0">
                    <CardHeader className="p-0">
                      <div className="relative aspect-video">
                        <Image
                          src={reward.image_path || "/placeholder.png"}
                          alt={reward.name}
                          fill
                          className="rounded-t-lg object-cover"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <CardTitle>{reward.name}</CardTitle>
                      <CardDescription className="mt-2 h-10">
                        {reward.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <p className="font-semibold">{reward.price}</p>
                      <Button
                        onClick={() =>
                          setRedemptionCandidate({
                            id: reward.id,
                            name: reward.name,
                            type: "reward",
                          })
                        }
                        disabled={redeemingId === reward.id}
                      >
                        {redeemingId === reward.id ? "Redeeming..." : "Redeem"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
