import { useSuspenseQueries } from "@tanstack/react-query";
import {
  FilterIcon,
  Gift,
  Package,
  Share2,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { productsService } from "@/services/products.service";
import { rewardsService } from "@/services/reward.service";
import { productVouchersQueryOptions, rewardVouchersQueryOptions } from "..";

const PAGE_SIZE = 6;

// Voucher Layout for QR dialog
function VoucherLayout({
  name,
  code,
  expiring_at,
}: {
  name: string;
  code: string;
  expiring_at: string | null;
}) {
  return (
    <div
      className="relative flex flex-col items-stretch justify-between bg-white"
      style={{
        borderRadius: "18px",
        width: "360px",
        height: "210px",
        minHeight: "210px",
        aspectRatio: "360/210",
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        border: "2px dashed #e5e7eb",
        overflow: "hidden",
        background:
          "repeating-linear-gradient(135deg, #f8fafc 0px, #f8fafc 20px, #f1f5f9 20px, #f1f5f9 40px)",
      }}
    >
      {/* Top section: Logo and Brand */}
      <div className="flex items-center justify-between px-6 pt-4">
        <div className="flex items-center gap-2">
          <img
            src="/logo.webp"
            alt="Incub8Space Logo"
            width={36}
            height={36}
            className="object-contain"
          />
          <span className="font-bold text-primary text-lg tracking-tight">
            Incub8Space
          </span>
        </div>
        <span className="text-xs text-gray-400 font-semibold tracking-widest uppercase">
          Voucher
        </span>
      </div>

      {/* Middle section: Voucher name and QR */}
      <div className="flex flex-1 flex-row items-center justify-between px-6 mt-2 mb-2">
        <div className="flex flex-col justify-center">
          <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            Voucher For
          </span>
          <span className="font-bold text-xl text-gray-900 leading-tight">
            {name}
          </span>
          <span className="text-xs text-gray-500 mt-2">
            Present this voucher at Incub8Space
          </span>
        </div>
        <div className="flex flex-col items-center">
          <QRCodeSVG value={code} size={48} />
        </div>
      </div>

      {/* Bottom section: Code and Expiry */}
      <div className="flex flex-row items-center justify-between px-6 pb-4">
        <div className="flex flex-col">
          <span className="text-[11px] text-gray-400">Voucher Code</span>
          <span className="font-mono text-base bg-gray-100 px-3 py-1 rounded text-gray-800 tracking-widest mt-1">
            {code}
          </span>
        </div>
        <div className="flex flex-col items-end"></div>
        <span className="text-[11px] text-gray-400">Expires</span>
        <span className="text-xs text-gray-700 font-medium mt-1">
          {expiring_at
            ? new Date(expiring_at).toLocaleDateString()
            : "No Expiry"}
        </span>
      </div>
    </div>
  );
}

export default function MyVouchers() {
  const [{ data: productVouchers }, { data: rewardVouchers }] =
    useSuspenseQueries({
      queries: [productVouchersQueryOptions, rewardVouchersQueryOptions],
    });

  const [productNames, setProductNames] = useState<Record<string, string>>({});
  const [rewardNames, setRewardNames] = useState<Record<string, string>>({});

  // Fetch product names for product vouchers
  useEffect(() => {
    async function fetchProductNames() {
      const ids = Array.from(
        new Set(productVouchers.map((v) => v.product_id).filter(Boolean))
      );
      if (ids.length === 0) return;
      const products = await Promise.all(
        ids.map(async (id) => {
          try {
            const prod = await productsService.getById(id);
            return prod ? { id, name: prod.name } : null;
          } catch {
            return null;
          }
        })
      );
      const nameMap: Record<string, string> = {};
      products.forEach((p) => {
        if (p) nameMap[p.id] = p.name;
      });
      setProductNames(nameMap);
    }
    fetchProductNames();
  }, [productVouchers]);

  // Fetch reward names for reward vouchers
  useEffect(() => {
    async function fetchRewardNames() {
      const ids = Array.from(
        new Set(rewardVouchers.map((v) => v.reward_id).filter(Boolean))
      );
      if (ids.length === 0) return;
      const rewards = await Promise.all(
        ids.map(async (id) => {
          try {
            const reward = await rewardsService.getById(id);
            return reward ? { id, name: reward.name } : null;
          } catch {
            return null;
          }
        })
      );
      const nameMap: Record<string, string> = {};
      rewards.forEach((r) => {
        if (r) nameMap[r.id] = r.name;
      });
      setRewardNames(nameMap);
    }
    fetchRewardNames();
  }, [rewardVouchers]);

  const allVouchers = [
    ...productVouchers.map((v) => ({
      ...v,
      type: "product" as const,
      displayName: productNames[v.product_id] || v.code || "",
      expiring_at: v.expiring_at,
    })),
    ...rewardVouchers.map((v) => ({
      ...v,
      type: "reward" as const,
      displayName: rewardNames[v.reward_id] || v.code || "",
      expiring_at: v.expiring_at,
    })),
  ];

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "product" | "reward">(
    "all"
  );
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  const filtered = allVouchers.filter(
    (v) =>
      (filterType === "all" || v.type === filterType) &&
      (v.displayName.toLowerCase().includes(search.toLowerCase()) ||
        (v.code ?? "").toLowerCase().includes(search.toLowerCase()))
  );
  const sorted = [...filtered].sort((a, b) =>
    sortAsc
      ? a.displayName.localeCompare(b.displayName)
      : b.displayName.localeCompare(a.displayName)
  );
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Share dialog state
  const handleShare = async (code: string, name: string) => {
    const shareData = {
      title: "Voucher Code",
      text: `Here is my voucher code for "${name}": ${code}`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        alert(
          `Failed to share voucher. Please try copying the code manually. ${err}`
        );
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(`${name}: ${code}`);
      alert("Voucher code copied to clipboard!");
    }
  };

  // Add state for currently viewed voucher for QR dialog
  const [viewVoucher, setViewVoucher] = useState<{
    name: string;
    code: string;
    expiring_at: string | null;
  } | null>(null);

  // Print handler for the voucher
  const handlePrint = () => {
    if (!viewVoucher) return;
    const printWindow = window.open("", "_blank", "width=400,height=600");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Voucher</title>
          <style>
            body { margin: 0; padding: 0; font-family: sans-serif; background: #f9fafb; }
            .voucher-card {
              width: 360px;
              height: 210px;
              border-radius: 18px;
              border: 2px dashed #e5e7eb;
              background: repeating-linear-gradient(135deg, #f8fafc 0px, #f8fafc 20px, #f1f5f9 20px, #f1f5f9 40px);
              box-shadow: 0 4px 24px rgba(0,0,0,0.10);
              padding: 0;
              overflow: hidden;
              display: flex;
              flex-direction: column;
              justify-content: stretch;
              align-items: stretch;
            }
          </style>
        </head>
        <body>
          <div id="voucher-print-root"></div>
          <script>
            window.onload = function() {
              var el = document.getElementById('voucher-print-root');
              el.innerHTML = window.opener.document.getElementById('voucher-print-content').innerHTML;
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `);
    // Place the voucher layout in a hidden div for printing
    setTimeout(() => {
      const voucherContent = document.getElementById("voucher-print-content");
      if (voucherContent && printWindow) {
        printWindow.document.getElementById("voucher-print-root")!.innerHTML =
          voucherContent.innerHTML;
      }
    }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 flex flex-col gap-0 max-w-2xl w-full mx-auto">
        {/* Search, Filter, Sort Row */}
        <div className="flex flex-row items-center justify-between gap-2 w-full mb-4">
          <Input
            type="search"
            placeholder="Search vouchers..."
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
                  <Package className="w-4 h-4 mr-1" /> Products
                </Button>
                <Button
                  variant={filterType === "reward" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("reward")}
                >
                  <Gift className="w-4 h-4 mr-1" /> Rewards
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
        {/* QR/Print view */}
        {viewVoucher ? (
          <div className="flex flex-col items-center py-4">
            <div id="voucher-print-content">
              <VoucherLayout
                name={viewVoucher.name}
                code={viewVoucher.code}
                expiring_at={viewVoucher.expiring_at}
              />
            </div>
            <div className="flex gap-2 mt-6">
              <Button variant="outline" onClick={() => setViewVoucher(null)}>
                Back to List
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                Print
              </Button>
            </div>
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {paginated.map((voucher) => (
              <AccordionItem key={voucher.id} value={voucher.id}>
                <AccordionTrigger className="py-2 flex items-center w-full rounded-lg">
                  <div className="flex flex-row flex-1 items-center gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-base text-primary truncate flex items-center gap-2">
                        {voucher.type === "product" ? (
                          <Package className="w-4 h-4" />
                        ) : (
                          <Gift className="w-4 h-4" />
                        )}
                        {voucher.displayName}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                        <span className="truncate">
                          Code: {voucher.code ?? "N/A"}
                          {voucher.expiring_at
                            ? ` • Expires: ${new Date(
                                voucher.expiring_at
                              ).toLocaleDateString()}`
                            : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1 text-xs text-left">
                    <div>
                      <span className="font-medium text-muted-foreground">
                        Voucher Code:{" "}
                      </span>
                      <span className="font-mono">{voucher.code}</span>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">
                        Type:{" "}
                      </span>
                      <span className="capitalize">{voucher.type}</span>
                    </div>
                    {voucher.expiring_at && (
                      <div>
                        <span className="font-medium text-muted-foreground">
                          Expires:{" "}
                        </span>
                        <span>
                          {new Date(voucher.expiring_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-row gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setViewVoucher({
                            name: voucher.displayName,
                            code: voucher.code ?? "",
                            expiring_at: voucher.expiring_at,
                          })
                        }
                      >
                        View QR
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Share voucher"
                        onClick={() =>
                          handleShare(
                            voucher.code ?? "",
                            voucher.displayName ?? ""
                          )
                        }
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
            {paginated.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No vouchers found.
              </div>
            )}
          </Accordion>
        )}
        {totalPages > 1 && (
          <Pagination className="justify-center mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  aria-disabled={page === 1}
                />
              </PaginationItem>
              <PaginationItem>
                <span className="px-2 text-sm">
                  Page {page} of {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  aria-disabled={page === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>
    </div>
  );
}
