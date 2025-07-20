import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { useState } from "react";
import { useProductVouchers } from "@/hooks/useProductVouchers";
import { useRewardVouchers } from "@/hooks/useRewardVouchers";

export default function VoucherDialog() {
  const [voucherDialogOpen, setVoucherDialogOpen] = useState(false);
  const { productVouchers, loading: productVouchersLoading } =
    useProductVouchers();
  const { rewardVouchers, loading: rewardVouchersLoading } =
    useRewardVouchers();

  return (
    <>
      <Dialog open={voucherDialogOpen} onOpenChange={setVoucherDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="ml-auto" size="sm">
            My Vouchers
          </Button>
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
              <TabsTrigger value="reward-vouchers">Reward Vouchers</TabsTrigger>
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
                          <span className="capitalize">{voucher.status}</span>
                        </p>
                        {voucher.expiring_at && (
                          <p className="text-sm text-muted-foreground">
                            Expires:{" "}
                            {new Date(voucher.expiring_at).toLocaleDateString()}
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
                          <span className="capitalize">{voucher.status}</span>
                        </p>
                        {voucher.expiring_at && (
                          <p className="text-sm text-muted-foreground">
                            Expires:{" "}
                            {new Date(voucher.expiring_at).toLocaleDateString()}
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
    </>
  );
}
