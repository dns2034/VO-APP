import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { ProductsService } from "@/services/products.service";
import { RewardsService } from "@/services/rewards.service";
import { useProductVouchers } from "@/hooks/useProductVouchers";
import { useRewardVouchers } from "@/hooks/useRewardVouchers";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import { Share2 } from "lucide-react";

const PAGE_SIZE = 4;

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
          <Image
            src="/logo.webp"
            alt="Incub8Space Logo"
            width={36}
            height={36}
            style={{ objectFit: "contain" }}
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
          {/* <QRCodeSVG value={code} size={72} /> */}
          <span className="text-[10px] text-gray-400 mt-1">Scan to redeem</span>
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

export default function VoucherDialog() {
  const [voucherDialogOpen, setVoucherDialogOpen] = useState(false);
  const { productVouchers, loading: productVouchersLoading } =
    useProductVouchers();
  const { rewardVouchers, loading: rewardVouchersLoading } =
    useRewardVouchers();

  // Pagination state
  const [productPage, setProductPage] = useState(1);
  const [rewardPage, setRewardPage] = useState(1);

  // Paginated data
  const paginatedProductVouchers = productVouchers.slice(
    (productPage - 1) * PAGE_SIZE,
    productPage * PAGE_SIZE
  );
  const paginatedRewardVouchers = rewardVouchers.slice(
    (rewardPage - 1) * PAGE_SIZE,
    rewardPage * PAGE_SIZE
  );

  const productTotalPages = Math.ceil(productVouchers.length / PAGE_SIZE) || 1;
  const rewardTotalPages = Math.ceil(rewardVouchers.length / PAGE_SIZE) || 1;

  // State for mapping product/reward id to name
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
            const prod = await ProductsService.getById(id);
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
            const reward = await RewardsService.getById(id);
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
          "Failed to share voucher. Please try copying the code manually." + err
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

  return (
    <>
      <Dialog open={voucherDialogOpen} onOpenChange={setVoucherDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="ml-auto" size="sm">
            My Vouchers
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>My Vouchers</DialogTitle>
            <DialogDescription>
              View your redeemed product and reward vouchers.
            </DialogDescription>
          </DialogHeader>
          {viewVoucher ? (
            <div className="flex flex-col items-center py-4">
              <VoucherLayout
                name={viewVoucher.name}
                code={viewVoucher.code}
                expiring_at={viewVoucher.expiring_at}
              />
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setViewVoucher(null)}
              >
                Back to List
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="product-vouchers" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="product-vouchers">
                  Product Vouchers
                </TabsTrigger>
                <TabsTrigger value="reward-vouchers">
                  Reward Vouchers
                </TabsTrigger>
              </TabsList>
              <TabsContent value="product-vouchers">
                {productVouchersLoading ? (
                  <p>Loading product vouchers...</p>
                ) : (
                  <>
                    <div className="flex flex-col gap-4 py-2">
                      {paginatedProductVouchers.map((voucher) => (
                        <div
                          key={voucher.id}
                          className="rounded-xl border border-gray-200 bg-white shadow-md p-4 flex flex-col gap-2"
                        >
                          {/* First row: name and code */}
                          <div className="flex flex-row items-center gap-2 w-full">
                            <span className="text-base font-semibold text-gray-900 truncate flex-1">
                              {productNames[voucher.product_id]}
                            </span>
                            <span className="font-mono text-xs sm:text-sm px-2 py-1 rounded bg-(--primary) text-white">
                              {voucher.code}
                            </span>
                          </div>
                          {/* Second row: View, expiry, share */}
                          <div className="flex flex-row items-center justify-between gap-2 mt-1">
                            <div className="flex flex-row gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-fit"
                                onClick={() =>
                                  setViewVoucher({
                                    name:
                                      productNames[voucher.product_id] ||
                                      voucher.code ||
                                      "",
                                    code: voucher.code ?? "",
                                    expiring_at: voucher.expiring_at,
                                  })
                                }
                              >
                                View
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Share voucher"
                                onClick={() =>
                                  handleShare(
                                    voucher.code ?? "",
                                    (productNames[voucher.product_id] ||
                                      voucher.code) ??
                                      ""
                                  )
                                }
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </div>
                            {voucher.expiring_at && (
                              <span className="text-xs text-muted-foreground ml-2">
                                Expires:{" "}
                                {new Date(
                                  voucher.expiring_at
                                ).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                      {productVouchers.length === 0 && (
                        <p className="text-muted-foreground text-center py-8">
                          No product vouchers found.
                        </p>
                      )}
                    </div>
                    {productVouchers.length > PAGE_SIZE && (
                      <Pagination className="justify-center mt-2">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() =>
                                setProductPage((p) => Math.max(1, p - 1))
                              }
                              aria-disabled={productPage === 1}
                            />
                          </PaginationItem>
                          <PaginationItem>
                            <span className="px-2 text-sm">
                              Page {productPage} of {productTotalPages}
                            </span>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationNext
                              onClick={() =>
                                setProductPage((p) =>
                                  Math.min(productTotalPages, p + 1)
                                )
                              }
                              aria-disabled={productPage === productTotalPages}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </>
                )}
              </TabsContent>
              <TabsContent value="reward-vouchers">
                {rewardVouchersLoading ? (
                  <p>Loading reward vouchers...</p>
                ) : (
                  <>
                    <div className="flex flex-col gap-4 py-4">
                      {paginatedRewardVouchers.map((voucher) => (
                        <div
                          key={voucher.id}
                          className="rounded-xl border border-gray-200 bg-white shadow-md p-4 flex flex-col gap-2"
                        >
                          <div className="flex flex-row items-center gap-2 w-full">
                            <span className="text-base font-semibold text-gray-900 truncate flex-1">
                              {rewardNames[voucher.reward_id] || voucher.code}
                            </span>
                            <span className="font-mono text-xs sm:text-sm px-2 py-1 rounded bg-(--primary) text-white">
                              {voucher.code}
                            </span>
                          </div>
                          <div className="flex flex-row items-center justify-between gap-2 mt-1">
                            <div className="flex flex-row gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-fit"
                                onClick={() =>
                                  setViewVoucher({
                                    name:
                                      rewardNames[voucher.reward_id] ||
                                      voucher.code ||
                                      "",
                                    code: voucher.code ?? "",
                                    expiring_at: voucher.expiring_at,
                                  })
                                }
                              >
                                View
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Share voucher"
                                onClick={() =>
                                  handleShare(
                                    voucher.code ?? "",
                                    (rewardNames[voucher.reward_id] ||
                                      voucher.code) ??
                                      ""
                                  )
                                }
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </div>
                            {voucher.expiring_at && (
                              <span className="text-xs text-muted-foreground ml-2">
                                Expires:{" "}
                                {new Date(
                                  voucher.expiring_at
                                ).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                      {rewardVouchers.length === 0 && (
                        <p className="text-muted-foreground text-center py-8">
                          No reward vouchers found.
                        </p>
                      )}
                    </div>
                    {rewardVouchers.length > PAGE_SIZE && (
                      <Pagination className="justify-center mt-2">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() =>
                                setRewardPage((p) => Math.max(1, p - 1))
                              }
                              aria-disabled={rewardPage === 1}
                            />
                          </PaginationItem>
                          <PaginationItem>
                            <span className="px-2 text-sm">
                              Page {rewardPage} of {rewardTotalPages}
                            </span>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationNext
                              onClick={() =>
                                setRewardPage((p) =>
                                  Math.min(rewardTotalPages, p + 1)
                                )
                              }
                              aria-disabled={rewardPage === rewardTotalPages}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </>
                )}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
