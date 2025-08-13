import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import AppHeader from "@/components/app-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  bookingsKeys,
  branchesKeys,
  productsKeys,
  productVouchersKeys,
  spacesKeys,
  spaceUnitsKeys,
} from "@/lib/query-keys";
import { bookingsService } from "@/services/booking.service";
import { branchesService } from "@/services/branch.service";
import { productsService } from "@/services/product.service";
import { productVouchersService } from "@/services/product-voucher.service";
import { spacesService } from "@/services/space.service";
import { spaceUnitsService } from "@/services/space-units.service";
import Branches from "./-components/branches";
import MyBookings from "./-components/my-bookings";

export const branchesQueryOptions = queryOptions({
  queryKey: branchesKeys.all,
  queryFn: branchesService.getAll,
});

export const bookingsQueryOptions = queryOptions({
  queryKey: bookingsKeys.all,
  queryFn: bookingsService.getAll,
});

export const productVouchersQueryOptions = queryOptions({
  queryKey: productVouchersKeys.all,
  queryFn: productVouchersService.getAll,
});

export const productsQueryOptions = queryOptions({
  queryKey: productsKeys.all,
  queryFn: productsService.getAll,
});

export const spacesQueryOptions = queryOptions({
  queryKey: spacesKeys.all,
  queryFn: spacesService.getAll,
});

export const spaceUnitsQueryOptions = queryOptions({
  queryKey: spaceUnitsKeys.all,
  queryFn: spaceUnitsService.getAll,
});

export const Route = createFileRoute("/_authenticated/book/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient?.prefetchQuery(branchesQueryOptions),
      context.queryClient?.prefetchQuery(bookingsQueryOptions),
      context.queryClient?.prefetchQuery(productVouchersQueryOptions),
      context.queryClient?.prefetchQuery(productsQueryOptions),
    ]);
  },
});

function RouteComponent() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader
        title="Book"
        description="Book at your own pace and convenience."
      />

      <main className="flex-1 flex flex-col gap-0 p-4 lg:p-6 max-w-2xl w-full mx-auto">
        <Tabs defaultValue="book" className="w-full">
          <TabsList className="w-full justify-center mb-1">
            <TabsTrigger value="book">Book</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>
          <TabsContent value="book">
            <ScrollArea className="h-full">
              <Branches />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="bookings">
            <ScrollArea className="h-full">
              <MyBookings />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
