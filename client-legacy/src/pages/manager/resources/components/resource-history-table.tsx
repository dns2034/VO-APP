import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type HistoryRecord = {
  id: string;
  clientEmail: string;
  resourceType: string;
  location: string;
  date: Date;
  startTime: string;
  endTime: string;
};

export const ResourceHistoryTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [resourceFilter, setResourceFilter] = useState<string>("All Spaces");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 5);

  const data: HistoryRecord[] = [
    {
      id: "1",
      clientEmail: "johnsmith@incub8space.com",
      resourceType: "Co-Working Space",
      location: "Dasma",
      date: new Date("2025-05-06"),
      startTime: "09:00",
      endTime: "17:00",
    },
    {
      id: "2",
      clientEmail: "jane.doe@incub8space.com",
      resourceType: "Meeting Room A",
      location: "Dasma",
      date: new Date("2025-05-07"),
      startTime: "10:00",
      endTime: "11:30",
    },
  ];

  const filteredData = data.filter((record) => {
    const matchesSearch =
      record.clientEmail.toLowerCase().includes(searchValue.toLowerCase()) ||
      record.resourceType.toLowerCase().includes(searchValue.toLowerCase()) ||
      record.location.toLowerCase().includes(searchValue.toLowerCase());

    const matchesResource =
      resourceFilter === "All Spaces" || record.resourceType === resourceFilter;

    const matchesDate =
      !selectedDate ||
      format(record.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

    return matchesSearch && matchesResource && matchesDate;
  });

  // Then paginate the filtered data
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const resourceOptions = [
    "All Spaces",
    "Co-Working Space",
    "Meeting Room A",
    "Meeting Room B",
    "Meeting Room C",
    "Private Office",
  ];

  const columns = [
    {
      id: "clientEmail",
      header: "Client Email",
      cell: ({ row }: { row: { original: HistoryRecord } }) =>
        row.original.clientEmail,
      sortable: true,
    },
    {
      id: "resourceType",
      header: "Space Type",
      cell: ({ row }: { row: { original: HistoryRecord } }) =>
        row.original.resourceType,
      sortable: true,
    },
    {
      id: "location",
      header: "Location",
      cell: ({ row }: { row: { original: HistoryRecord } }) =>
        row.original.location,
    },
    {
      id: "date",
      header: "Date",
      cell: ({ row }: { row: { original: HistoryRecord } }) =>
        format(row.original.date, "MMM d, yyyy"),
      sortable: true,
    },
    {
      id: "time",
      header: "Time",
      cell: ({ row }: { row: { original: HistoryRecord } }) =>
        `${row.original.startTime} - ${row.original.endTime}`,
    },
  ];

  const filters = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{resourceFilter}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {resourceOptions.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => setResourceFilter(option)}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <DataTable<HistoryRecord>
      columns={columns}
      data={paginatedData}
      searchPlaceholder="Search by email, space, location..."
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      filters={filters}
      page={page}
      pageSize={pageSize}
      totalCount={filteredData.length}
      showDatePicker={true}
      onDateSelect={setSelectedDate}
      noDataText="No history records found"
    />
  );
};
