"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ConfirmRedeemAlertDialog from "./components/ConfirmRedeemAlertDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import VoucherDialog from "./components/VoucherDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRewards } from "@/hooks/useRewards";
import { useProducts } from "@/hooks/useProducts";

type RedemptionCandidate = {
  id: string;
  name: string;
  type: "product" | "reward";
};

export default function RewardsPage() {
  const { rewards } = useRewards();
  const { products } = useProducts();

  const [redemptionCandidate, setRedemptionCandidate] =
    useState<RedemptionCandidate | null>(null);
  const [redeemingId, setRedeemingId] = useState<string | null>(null);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 w-full">
          <VoucherDialog />
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
        {/* Redemption dialog */}
        <ConfirmRedeemAlertDialog
          redemptionCandidate={redemptionCandidate}
          setRedemptionCandidate={setRedemptionCandidate}
          setRedeemingId={setRedeemingId}
        />
      </main>
    </>
  );
}
