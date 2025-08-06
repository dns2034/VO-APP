import { useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // ShadCN
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface PaginationWithLinksProps {
  pageSizeSelectOptions?: {
    pageSizeSearchParam?: string;
    pageSizeOptions: number[];
  };
  totalCount: number;
  pageSize: number;
  page: number;
  pageSearchParam?: string;
}

/**
 * Vite React Pagination with URL Sync
 * - Uses `react-router-dom`
 * - Works with ShadCN components
 *
 * @example
 * ```tsx
 * <PaginationWithLinks page={1} pageSize={20} totalCount={500} />
 * ```
 */
export function PaginationWithLinks({
  pageSizeSelectOptions,
  pageSize,
  totalCount,
  page,
  pageSearchParam = "page",
}: PaginationWithLinksProps) {
  const [, setSearchParams] = useSearchParams();

  const totalPageCount = Math.ceil(totalCount / pageSize);

  /** Update URL with new page */
  const goToPage = (newPage: number) => {
    setSearchParams((prevParams) => {
      prevParams.set(pageSearchParam, String(newPage));
      return prevParams;
    });
  };

  /** Update URL when changing page size */
  const changePageSize = (newPageSize: number) => {
    const key = pageSizeSelectOptions?.pageSizeSearchParam || "pageSize";
    setSearchParams((prevParams) => {
      prevParams.set(key, String(newPageSize));
      prevParams.delete(pageSearchParam);
      return prevParams;
    });
  };

  /** Render pagination items */
  const renderPageNumbers = () => {
    const items: JSX.Element[] = [];
    const maxVisiblePages = 5;

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => goToPage(i)}
              isActive={page === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => goToPage(1)}
            isActive={page === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPageCount - 1, page + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => goToPage(i)}
              isActive={page === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (page < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPageCount}>
          <PaginationLink
            onClick={() => goToPage(totalPageCount)}
            isActive={page === totalPageCount}
            className="cursor-pointer"
          >
            {totalPageCount}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 w-full">
      {pageSizeSelectOptions && (
        <div className="flex flex-col gap-4 flex-1">
          <SelectRowsPerPage
            options={pageSizeSelectOptions.pageSizeOptions}
            setPageSize={changePageSize}
            pageSize={pageSize}
          />
        </div>
      )}
      <Pagination className={cn({ "md:justify-end": pageSizeSelectOptions })}>
        <PaginationContent className="max-sm:gap-0">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => goToPage(Math.max(page - 1, 1))}
              aria-disabled={page === 1}
              className={
                page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
              }
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              onClick={() => goToPage(Math.min(page + 1, totalPageCount))}
              aria-disabled={page === totalPageCount}
              className={
                page === totalPageCount
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

function SelectRowsPerPage({
  options,
  setPageSize,
  pageSize,
}: {
  options: number[];
  setPageSize: (newSize: number) => void;
  pageSize: number;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="whitespace-nowrap text-sm">Rows per page</span>
      <Select
        value={String(pageSize)}
        onValueChange={(value) => setPageSize(Number(value))}
      >
        <SelectTrigger>
          <SelectValue>{pageSize}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
