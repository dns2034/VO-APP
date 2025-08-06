import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type RowData,
  type SortingState,
} from "@tanstack/react-table";
import { format } from "date-fns";
import {
  ArrowDown,
  ArrowUp,
  Calendar as CalendarIcon,
  Search,
} from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useSearchParams } from "react-router-dom";

export type SortDirection = "asc" | "desc";

export type ExtendedColumnDef<
  TData extends RowData,
  TValue = unknown
> = ColumnDef<TData, TValue> & {
  sortable?: boolean;
  className?: string;
};

interface DataTableProps<TData extends RowData> {
  columns: ExtendedColumnDef<TData>[];
  data: TData[];
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filters?: React.ReactNode;
  page?: number;
  pageSize?: number;
  totalCount?: number;
  sortField?: string;
  sortDirection?: SortDirection;
  onSortChange?: (field: string, direction: SortDirection) => void;
  noDataText?: string;
  showDatePicker?: boolean;
  onDateSelect?: (date: Date | undefined) => void;
  dateRange?: DateRange;
  onDateRangeChange?: (range: DateRange | undefined) => void;
  actions?: React.ReactNode;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  searchPlaceholder = "Filter items...",
  searchValue = "",
  onSearchChange,
  filters,
  page = 1,
  pageSize = 5,
  totalCount = 0,
  sortField = "",
  sortDirection = "desc",
  onSortChange,
  noDataText = "No data found.",
  showDatePicker = true,
  onDateSelect,
  actions,
}: DataTableProps<TData>) {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? page);
  const currentPageSize = Number(searchParams.get("pageSize") ?? pageSize);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: sortField, desc: sortDirection === "desc" },
  ]);
  const [date, setDate] = useState<Date | undefined>();

  const table = useReactTable({
    data,
    columns: columns as ColumnDef<TData>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      sorting,
    },
    manualPagination: true,
    manualSorting: Boolean(onSortChange),
    manualFiltering: Boolean(onSearchChange),
  });

  const handleSort = (columnId: string) => {
    if (!onSortChange) return;

    const isSorted = sorting.some((s) => s.id === columnId);
    const currentSort = sorting.find((s) => s.id === columnId);

    if (isSorted) {
      const newDirection = currentSort?.desc ? "asc" : "desc";
      onSortChange(columnId, newDirection);
    } else {
      onSortChange(columnId, "asc");
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onDateSelect?.(selectedDate);
  };

  const SortIcon = ({ columnId }: { columnId: string }) => {
    const columnSort = sorting.find((s) => s.id === columnId);
    if (!columnSort) return null;

    return columnSort.desc ? (
      <ArrowDown className="ml-1 h-3.5 w-3.5 text-gray-500" />
    ) : (
      <ArrowUp className="ml-1 h-3.5 w-3.5 text-gray-500" />
    );
  };

  return (
    <div className="space-y-4">
      {/* Search, Filters, and Date Picker */}
      {(onSearchChange || filters || showDatePicker || actions) && (
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          {onSearchChange && (
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder={searchPlaceholder}
                className="pl-9 border-gray-200"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          )}

          <div className="flex items-center gap-3">
            {actions}
            {filters && <div className="flex gap-3">{filters}</div>}

            {showDatePicker && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-gray-50">
                {headerGroup.headers.map((header) => {
                  const columnDef = columns.find(
                    (col) => col.id === header.column.id
                  ) as ExtendedColumnDef<TData>;
                  return (
                    <TableHead
                      key={header.id}
                      className={`font-medium text-gray-600 ${
                        columnDef?.sortable ? "cursor-pointer" : ""
                      } ${columnDef?.className || ""}`}
                      onClick={() =>
                        columnDef?.sortable && handleSort(header.column.id)
                      }
                    >
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {columnDef?.sortable && (
                          <SortIcon columnId={header.column.id} />
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => {
                    const columnDef = columns.find(
                      (col) => col.id === cell.column.id
                    ) as ExtendedColumnDef<TData>;
                    return (
                      <TableCell key={cell.id} className={columnDef?.className}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {noDataText}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalCount > 0 && (
        <PaginationWithLinks
          page={currentPage}
          pageSize={currentPageSize}
          totalCount={totalCount}
        />
      )}
    </div>
  );
}
