import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import { convertToAMPM } from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  CalendarFold,
  Info,
  LampDesk,
  Loader2,
  MapPin,
  Package,
  Plus,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  availabilityQueries,
  bookingQueries,
  locationQueries,
  resourceInstanceQueries,
  resourceQueries,
} from "../queries";
import type { CreateBookingField } from "@/lib/validator";
import { useBookingWorkflowStore } from "../store";
import { getResources } from "../../../shared/services/resource-service";
import type { TResourceInstance } from "@/types";

const ResourcesCard = () => {
  const { setWorkflow, workflow } = useBookingWorkflowStore();
  const { control, setValue, trigger, watch } =
    useFormContext<CreateBookingField>();

  const { user } = useAuth();

  const { date, resource_id, resource_instance_id, location_id } = watch();

  const [selectedTable, setSelectedTable] = useState<number>(1);

  // Location fetching
  const {
    data: locations,
    isLoading: isLoadingLocations,
    isError: isLocationsError,
  } = useQuery(locationQueries.listByOrg(user?.organization_id));

  const filters = {
    isAvailable: true,
    locationId: location_id,
  };

  // Resource fetching
  const {
    data: resources,
    isLoading: isLoadingResources,
    isError: isResourcesError,
  } = useQuery({
    queryKey: resourceQueries.list(filters),
    queryFn: () => getResources(filters),
    enabled: !!user?.organization_id && !!location_id && !!date,
  });

  const selectedResource = useMemo(
    () => resources?.find((r) => r.id === resource_id),
    [resources, resource_id]
  );

  const {
    data: resourceInstanceQueryData,
    isLoading: isLoadingResourceInstances,
  } = useQuery({
    ...resourceInstanceQueries.list(resource_id),
    enabled: !!resource_id && selectedResource?.name === "Desk",
  });

  // Set default location if only one exists
  useEffect(() => {
    if (
      user?.organization_id &&
      locations &&
      locations.length === 1 &&
      !location_id
    ) {
      setValue("location_id", locations[0].id, { shouldValidate: true });
    }
  }, [locations, user?.organization_id, location_id, setValue]);

  // Reset resource selection when location changes
  useEffect(() => {
    if (location_id) {
      setValue("resource_id", "");
      setValue("resource_instance_id", "");
    }
  }, [location_id, setValue]);

  const { data: availabilityQueryData } = useQuery(
    availabilityQueries.byDate(date)
  );

  const { data: bookingQueryData, isLoading: bookingQueryIsLoading } = useQuery(
    bookingQueries.byDateAndResourceId({
      date,
      resourceId: resource_id,
    })
  );

  // Determine booked instance IDs
  const bookedInstanceIds = useMemo(() => {
    if (!selectedResource || selectedResource.name !== "Desk" || !date) {
      return new Set<string>();
    }
    return new Set(
      bookingQueryData
        ?.filter((b) => b.resource_instance_id)
        .map((b) => b.resource_instance_id as string)
    );
  }, [bookingQueryData, date, selectedResource]);

  // Group desks into tables
  const tables = useMemo(() => {
    const desksPerTable = 6;
    const numTables = 5;
    const groupedTables: TResourceInstance[][] = Array.from(
      { length: numTables },
      () => []
    );

    resourceInstanceQueryData?.forEach((instance, index) => {
      const tableIndex = Math.floor(index / desksPerTable);
      if (tableIndex < numTables) {
        groupedTables[tableIndex].push(instance);
      }
    });
    return groupedTables;
  }, [resourceInstanceQueryData]);

  // Get desks for current table
  const currentTableDesks = useMemo(() => {
    return tables[selectedTable - 1] || [];
  }, [tables, selectedTable]);

  // Desk selection component
  const renderDeskSelection = () => (
    <div className="w-full">
      <h3 className="text-sm font-medium mb-2 text-muted-foreground px-1">
        Select Table
      </h3>
      {isLoadingResourceInstances ? (
        <div className="flex items-center justify-center p-6 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading desks...
        </div>
      ) : resourceInstanceQueryData && resourceInstanceQueryData.length > 0 ? (
        <>
          <Select
            value={selectedTable.toString()}
            onValueChange={(value) =>
              setSelectedTable(Number.parseInt(value, 10))
            }
          >
            <SelectTrigger className="w-full mb-4">
              <SelectValue placeholder="Select Table Number" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-xs font-medium text-muted-foreground px-2 py-1.5">
                  Tables
                </SelectLabel>
                {tables.map(
                  (_, index) =>
                    tables[index].length > 0 && (
                      <SelectItem
                        key={`table-select-${index + 1}`}
                        value={(index + 1).toString()}
                        className="cursor-pointer text-sm"
                      >
                        Table {index + 1}
                      </SelectItem>
                    )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="grid grid-cols-2 gap-3">
            {currentTableDesks.map((desk) => {
              const isBooked = bookedInstanceIds.has(desk.id);
              return (
                <Button
                  key={desk.id}
                  type="button"
                  variant={
                    resource_instance_id === desk.id ? "default" : "outline"
                  }
                  disabled={isBooked}
                  onClick={() => {
                    setValue("resource_instance_id", desk.id);
                    setWorkflow("book");
                  }}
                  className={cn(
                    "h-16 flex flex-col items-center justify-center gap-1",
                    isBooked && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <LampDesk className="h-4 w-4" />
                  <span className="text-xs font-medium">Desk {desk.name}</span>
                  {isBooked && (
                    <span className="text-xs text-muted-foreground">
                      Booked
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="bg-muted/50 rounded-lg p-6 flex flex-col items-center justify-center text-center border border-border">
          <LampDesk className="h-14 w-14 text-muted-foreground mb-2 opacity-50" />
          <p className="text-base font-medium">No desks available</p>
          <p className="text-sm text-muted-foreground mt-1">
            There are no desks configured for this location
          </p>
        </div>
      )}
    </div>
  );

  // Existing bookings component
  const renderExistingBookings = () => (
    <div className="w-full mt-4">
      <h3 className="text-sm font-medium mb-3 flex items-center">
        <Info className="h-4 w-4 mr-1 text-muted-foreground" />
        Existing Bookings
      </h3>
      {bookingQueryIsLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex flex-col space-y-2 animate-pulse">
              <div className="h-5 bg-muted rounded w-1/3" />
              <div className="h-14 bg-muted rounded w-full" />
            </div>
          ))}
        </div>
      ) : bookingQueryData && bookingQueryData.length > 0 ? (
        <ScrollArea className="w-full h-48">
          <div className="space-y-3">
            {bookingQueryData.map((booking) => (
              <div
                key={booking.id}
                className="rounded-lg border p-3 transition-all hover:shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                    <span className="text-sm font-medium">
                      {convertToAMPM(booking.start_time)} -{" "}
                      {convertToAMPM(booking.end_time)}
                    </span>
                  </div>
                  <Badge className="text-xs font-normal">
                    {selectedResource?.name}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="bg-background rounded-lg p-6 flex flex-col items-center justify-center text-center border border-border">
          <p className="text-base font-medium">No bookings found</p>
          <p className="text-sm text-muted-foreground mt-1">
            There are no existing bookings for this space on{" "}
            <span className="text-violet-600">
              {date && format(date, "MMM. dd, yyyy")}
            </span>
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => setWorkflow("book")}
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Create First Booking
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <Card
      className={cn(
        "xl:col-span-1 transition-all flex flex-col max-h-[calc(100vh-10rem)]",
        workflow === "resource" &&
          "border-2 border-violet-600/70 shadow-violet-300 shadow-lg"
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <Package className="text-violet-700" /> Available Spaces
        </CardTitle>
        <CardDescription>Select location and space</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-grow overflow-hidden p-4 pt-0">
        {!date ? (
          <div className="bg-muted/50 rounded-lg p-6 flex flex-col items-center justify-center text-center border border-border flex-grow">
            <CalendarFold className="h-14 w-14 text-muted-foreground mb-2 opacity-50" />
            <p className="text-base font-medium">Please select a date</p>
            <p className="text-sm text-muted-foreground mt-1">
              Select a date to view available locations and spaces
            </p>
          </div>
        ) : (
          <ScrollArea className="flex-grow h-0 pr-3">
            <div className="space-y-4 p-3 pt-0">
              {/* Location Selection */}
              <FormField
                control={control}
                name="location_id"
                rules={{ required: "Please select a location" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-muted-foreground px-1 mb-2 block">
                      Select Location
                    </FormLabel>
                    <Select
                      value={field.value || ""}
                      onValueChange={(value) => {
                        if (workflow !== "resource") {
                          setWorkflow("resource");
                        }
                        field.onChange(value);
                        trigger("location_id");
                      }}
                      disabled={
                        isLoadingLocations ||
                        !locations ||
                        locations.length === 0
                      }
                    >
                      <SelectTrigger className="text-base">
                        <SelectValue placeholder="Select a Location" />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoadingLocations ? (
                          <div className="flex items-center justify-center p-2">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Loading...
                          </div>
                        ) : isLocationsError ? (
                          <div className="p-2 text-destructive text-sm">
                            Error loading locations
                          </div>
                        ) : locations && locations.length > 0 ? (
                          locations.map((location) => (
                            <SelectItem
                              className="cursor-pointer"
                              key={location.id}
                              value={location.id}
                            >
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                {location.name}
                              </div>
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-2 text-muted-foreground text-sm">
                            No locations available
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {location_id ? (
                isLoadingResources ? (
                  <Skeleton className="h-10 w-full rounded-lg" />
                ) : isResourcesError ? (
                  <div className="text-destructive text-sm text-center p-4 bg-destructive/10 rounded">
                    Error loading spaces for this location.
                  </div>
                ) : (
                  <>
                    {/* Resource Type Selection */}
                    <FormField
                      control={control}
                      name="resource_id"
                      render={({ field }) => {
                        const locationResourceIds = new Set(
                          resources?.map((r) => r.id) || []
                        );
                        const filteredAvailabilities =
                          availabilityQueryData?.filter((a) =>
                            locationResourceIds.has(a.resource_id)
                          );

                        return (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-muted-foreground px-1 mb-2 block">
                              Select Space Type
                            </FormLabel>
                            <Select
                              value={field.value || ""}
                              onValueChange={(e) => {
                                const resource = resources?.find(
                                  (r) => r.id === e
                                );
                                if (resource) {
                                  field.onChange(e);
                                  setValue("resource_instance_id", null);
                                  setValue("start_time", "09:00");
                                  setValue("end_time", "17:00");
                                  if (resource.name === "Desk") {
                                    setWorkflow("resource");
                                  } else {
                                    setWorkflow("book");
                                  }
                                }
                              }}
                              disabled={!resources || resources.length === 0}
                            >
                              <SelectTrigger className="text-base">
                                <SelectValue placeholder="Select a space type" />
                              </SelectTrigger>
                              <SelectContent>
                                {resources && resources.length > 0 ? (
                                  resources.map((resource) => {
                                    const isAvailable =
                                      filteredAvailabilities?.some(
                                        (a) => a.resource_id === resource.id
                                      );
                                    return (
                                      <SelectItem
                                        className="cursor-pointer"
                                        key={resource.id}
                                        value={resource.id}
                                        disabled={!isAvailable}
                                      >
                                        {resource.name}
                                      </SelectItem>
                                    );
                                  })
                                ) : (
                                  <div className="p-2 text-muted-foreground text-sm">
                                    No spaces found for this location.
                                  </div>
                                )}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        );
                      }}
                    />

                    {/* Desk Selection or Existing Bookings */}
                    {selectedResource?.name === "Desk"
                      ? renderDeskSelection()
                      : selectedResource && renderExistingBookings()}
                  </>
                )
              ) : (
                <div className="bg-muted/50 rounded-lg p-6 flex flex-col items-center justify-center text-center border border-border">
                  <MapPin className="h-14 w-14 text-muted-foreground mb-2 opacity-50" />
                  <p className="text-base font-medium">
                    Please select a location
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Choose a location to see available spaces.
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourcesCard;
