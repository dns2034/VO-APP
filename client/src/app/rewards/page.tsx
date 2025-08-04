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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRewards } from "@/hooks/useRewards";
import { useProducts } from "@/hooks/useProducts";
import BottomBar from "@/components/bottom-bar";
import VoucherDialog from "./components/VoucherDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter as FilterIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SortAsc, SortDesc } from "lucide-react";

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

  // Filter state: "all", "product", "reward"
  const [filterType, setFilterType] = useState<"all" | "product" | "reward">(
    "all"
  );
  const [search, setSearch] = useState<string>("");
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Crunch products and rewards into one array
  const allItems = [
    ...products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      image_path: product.image_path,
      price: product.price,
      type: "product" as const,
    })),
    ...rewards.map((reward) => ({
      id: reward.id,
      name: reward.name,
      description: reward.description ?? "",
      image_path: reward.image_path ?? "",
      price: reward.price,
      type: "reward" as const,
    })),
  ];

  // Search and filter
  const filteredItems =
    filterType === "all"
      ? allItems
      : allItems.filter((item) => item.type === filterType);

  const searchedItems = filteredItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedItems = [...searchedItems].sort((a, b) =>
    sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 z-50 bg-background border-b border-border">
        <div className="flex items-center gap-2 px-4 w-full">
          <h1 className="text-xl font-bold tracking-tight">Rewards</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-y-auto pb-24">
        <Tabs defaultValue="rewards" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-1/3 lg:w-1/4">
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="vouchers">My Vouchers</TabsTrigger>
          </TabsList>
          <TabsContent value="rewards">
            <div className="flex items-center gap-2 mb-4 w-full">
              <Input
                type="search"
                placeholder="Search rewards..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 max-w-xs"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <FilterIcon className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-40 p-2">
                  <div className="flex flex-col gap-2">
                    <Button
                      variant={filterType === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterType("all")}
                    >
                      All
                    </Button>
                    <Button
                      variant={filterType === "product" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterType("product")}
                    >
                      Products
                    </Button>
                    <Button
                      variant={filterType === "reward" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterType("reward")}
                    >
                      Rewards
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <button
                className="h-9 w-9 flex items-center justify-center rounded-md bg-white border shadow-sm text-gray-700 hover:bg-gray-100 transition"
                onClick={() => setSortAsc((prev) => !prev)}
                type="button"
                aria-label="Sort"
              >
                {sortAsc ? (
                  <SortAsc className="w-5 h-5" />
                ) : (
                  <SortDesc className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2">
              {sortedItems.map((item) => (
                <Card key={item.id} className="pt-0">
                  <CardHeader className="p-0">
                    <div className="relative aspect-video">
                      <Image
                        src={item.image_path || "/placeholder.png"}
                        alt={item.name}
                        fill
                        className="rounded-t-lg object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription className="mt-2 h-10">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <p className="font-semibold">{item.price}</p>
                    <Button
                      onClick={() =>
                        setRedemptionCandidate({
                          id: item.id,
                          name: item.name,
                          type: item.type,
                        })
                      }
                      disabled={redeemingId === item.id}
                    >
                      {redeemingId === item.id ? "Redeeming..." : "Redeem"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              {sortedItems.length === 0 && (
                <div className="text-center text-muted-foreground py-8 col-span-full">
                  No rewards found.
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="vouchers">
            <VoucherDialog />
          </TabsContent>
        </Tabs>
        <ConfirmRedeemAlertDialog
          redemptionCandidate={redemptionCandidate}
          setRedemptionCandidate={setRedemptionCandidate}
          setRedeemingId={setRedeemingId}
        />
      </main>
      <BottomBar />
    </div>
  );
}
