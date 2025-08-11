"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ConfirmRedeemAlertDialog from "./components/ConfirmRedeemAlertDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRewards } from "@/hooks/useRewards";
import { useProducts } from "@/hooks/useProducts";
import BottomBar from "@/components/bottom-bar";
import MyVouchers from "./components/MyVouchers";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter as FilterIcon, SortAsc, SortDesc } from "lucide-react";
import { Input } from "@/components/ui/input";
import Header from "./components/Header";

type RedemptionCandidate = {
  id: string;
  name: string;
  type: "product" | "reward";
};

export default function RewardsPage() {
  const { rewards } = useRewards();
  const { products } = useProducts();

  // Explicitly type state as RedemptionCandidate | null
  const [redemptionCandidate, setRedemptionCandidate] =
    useState<RedemptionCandidate | null>(null);
  const [redeemingId, setRedeemingId] = useState<string | null>(null);

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
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex flex-col gap-0 p-4 lg:p-6 max-w-2xl w-full mx-auto">
        <Tabs defaultValue="rewards" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 mb-1">
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="vouchers">My Vouchers</TabsTrigger>
          </TabsList>
          <TabsContent value="rewards">
            {/* Search, Filter, Sort Row */}
            <div className="flex flex-row items-center justify-between gap-2 w-full mb-4">
              <Input
                type="search"
                placeholder="Search rewards..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 max-w-xs shadow-none"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex items-center justify-center"
                    aria-label="Filter"
                    type="button"
                  >
                    <FilterIcon className="w-5 h-5" />
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
              <Button
                variant="outline"
                size="icon"
                className="flex items-center justify-center"
                onClick={() => setSortAsc((prev) => !prev)}
                type="button"
                aria-label="Sort"
              >
                {sortAsc ? (
                  <SortAsc className="w-5 h-5" />
                ) : (
                  <SortDesc className="w-5 h-5" />
                )}
              </Button>
            </div>
            {/* Rewards/Product List */}
            <div className="flex flex-col gap-3">
              {sortedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-row items-center gap-3 bg-white rounded-lg border border-border px-3 py-3"
                >
                  <div className="flex-shrink-0 relative w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                    <img
                      src={
                        item?.image_path
                          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/branches/${item.id}/${item.image_path}`
                          : "/placeholder.png"
                      }
                      alt={item.name}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <span className="font-semibold text-base text-primary truncate">
                      {item.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </span>
                    <span className="text-xs text-gray-500 mt-1 font-medium">
                      {item.price} points
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="whitespace-nowrap"
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
                </div>
              ))}
              {sortedItems.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  No rewards found.
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="vouchers">
            <MyVouchers />
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
