import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import AppHeader from "@/components/app-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { businessesKeys } from "@/lib/query-keys";
import { businessesService } from "@/services/business.service";
import { useAuthStore } from "@/store/auth.store";
import type { Business } from "@/types";
import { storageService } from "@/services/storage.service";

const businessQueryOptions = queryOptions({
  queryKey: businessesKeys.all,
  queryFn: businessesService.getAll,
});

export const Route = createFileRoute("/_authenticated/businesses/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient?.prefetchQuery(businessQueryOptions),
    ]);
  },
});

function RouteComponent() {
  const { data: businessesData } = useSuspenseQuery(businessQueryOptions);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );

  const { user } = useAuthStore();
  const myBusinesses =
    businessesData?.filter((biz) => biz.user_id === user?.id) || [];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader
        title="Businesses"
        description="Explore and connect with our partner businesses."
      />

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
                      src={storageService.getFileUrl(
                        "businesses",
                        biz.logo_url || "/placeholder.png"
                      )}
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
                      src={storageService.getFileUrl(
                        "businesses",
                        selectedBusiness?.logo_url || "/placeholder.png"
                      )}
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
                        src={storageService.getFileUrl(
                          "businesses",
                          biz.logo_url || "/placeholder.png"
                        )}
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
    </div>
  );
}
