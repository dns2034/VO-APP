"use client";

import { useState } from "react";
import BottomBar from "@/components/bottom-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBusinesses } from "@/hooks/useBusinesses";
import { Database } from "@/types/supabase";
import { useAuthStore } from "@/store/useAuthStore";

export default function BusinessesPage() {
  type Business = Database["public"]["Tables"]["businesses"]["Row"];
  const { data: businessesData } = useBusinesses();
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );

  const { user } = useAuthStore();
  const myBusinesses =
    businessesData?.filter((biz) => biz.user_id === user?.id) || [];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex flex-row items-center bg-white text-gray-900 p-4">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="font-bold text-lg">Businesses</h1>
          <p className="text-xs text-gray-500">
            Explore and connect with our partner businesses.
          </p>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 flex flex-col gap-0 p-4 lg:p-6 max-w-4xl w-full mx-auto">
        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 mb-4">
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="my-businesses">My Businesses</TabsTrigger>
          </TabsList>
          <TabsContent value="explore">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {(businessesData ?? []).map((biz) => (
                <button
                  key={biz.id}
                  className="flex flex-col items-center bg-white rounded-lg border border-border p-2 hover:shadow-md transition cursor-pointer"
                  onClick={() => setSelectedBusiness(biz)}
                  type="button"
                >
                  <div className="w-full aspect-square rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={biz.logo_url || "/placeholder.png"}
                      alt={biz.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="mt-2 font-semibold text-sm text-primary text-center truncate w-full">
                    {biz.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Businees Details Dialog */}
            <Dialog
              open={!!selectedBusiness}
              onOpenChange={() => setSelectedBusiness(null)}
            >
              <DialogContent className="max-w-md w-full p-0 overflow-hidden rounded-2xl shadow-xl border bg-background">
                <DialogHeader className="p-6 pb-2 flex flex-col items-center gap-2">
                  <div className="w-20 h-20 rounded-full overflow-hidden border bg-muted flex items-center justify-center mb-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedBusiness?.logo_url || "/placeholder.png"}
                      alt={selectedBusiness?.name || "Business logo"}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <DialogTitle className="text-xl font-bold text-center w-full">
                    {selectedBusiness?.name}
                  </DialogTitle>
                  <DialogDescription className="text-center text-muted-foreground w-full">
                    {selectedBusiness?.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="px-6 pb-6 pt-2 space-y-4">
                  {selectedBusiness?.website && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-muted-foreground shrink-0">
                        Website:
                      </span>
                      <a
                        href={selectedBusiness.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline break-all text-sm"
                      >
                        {selectedBusiness.website}
                      </a>
                    </div>
                  )}

                  {selectedBusiness?.phone && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-muted-foreground shrink-0">
                        Phone:
                      </span>
                      <a
                        href={`tel:${selectedBusiness.phone}`}
                        className="text-primary underline text-sm"
                      >
                        {selectedBusiness.phone}
                      </a>
                    </div>
                  )}

                  {selectedBusiness?.email && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-muted-foreground shrink-0">
                        Email:
                      </span>
                      <a
                        href={`mailto:${selectedBusiness.email}`}
                        className="text-primary underline break-all text-sm"
                      >
                        {selectedBusiness.email}
                      </a>
                    </div>
                  )}
                </div>

                <div className="px-6 pb-6">
                  <DialogClose asChild>
                    <Button className="w-full" variant="outline">
                      Close
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* My Businesses Tab */}
          <TabsContent value="my-businesses">
            {myBusinesses.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {myBusinesses.map((biz) => (
                  <button
                    key={biz.id}
                    className="flex flex-col items-center bg-white rounded-lg border border-border p-2 hover:shadow-md transition cursor-pointer"
                    onClick={() => setSelectedBusiness(biz)}
                    type="button"
                  >
                    <div className="w-full aspect-square rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={biz.logo_url || "/placeholder.png"}
                        alt={biz.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="mt-2 font-semibold text-sm text-primary text-center truncate w-full">
                      {biz.name}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-border p-4 text-center">
                <h2 className="font-semibold text-base mb-2">My Businesses</h2>
                <p className="text-sm text-muted-foreground">
                  You have not added any businesses yet.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <BottomBar />
    </div>
  );
}
