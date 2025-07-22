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
import { QRCodeSVG } from "qrcode.react";
import {
  Dialog as UIDialog,
  DialogContent as UIDialogContent,
  DialogHeader as UIDialogHeader,
  DialogTitle as UIDialogTitle,
} from "@/components/ui/dialog";
import { Share2, Printer } from "lucide-react";
import Image from "next/image";

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
      className="voucher-card relative flex flex-col items-center justify-between border border-gray-200 bg-white shadow-lg px-6 py-6"
      style={{
        borderRadius: "18px",
        width: "340px",
        height: "200px",
        minHeight: "200px",
        aspectRatio: "340/200",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}
    >
      <div className="absolute top-4 left-4">
        <Image
          src="/logo.webp"
          alt="Incub8Space Logo"
          width={48}
          height={48}
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="flex flex-col items-center flex-1 justify-center w-full">
        <div className="voucher-title text-lg font-bold text-primary text-center mb-1">
          {name}
        </div>
        <div className="voucher-code font-mono text-base bg-gray-100 px-3 py-1 rounded mb-2 text-center">
          {code}
        </div>
        <div className="voucher-qr flex flex-col items-center my-1">
          <QRCodeSVG value={code} size={64} />
        </div>
        {expiring_at && (
          <div className="voucher-expiry text-xs text-muted-foreground mt-1">
            Expires: {new Date(expiring_at).toLocaleDateString()}
          </div>
        )}
      </div>
      <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-semibold">
        Incub8Space
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
          <Tabs defaultValue="product-vouchers" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="product-vouchers">
                Product Vouchers
              </TabsTrigger>
              <TabsTrigger value="reward-vouchers">Reward Vouchers</TabsTrigger>
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
        </DialogContent>
      </Dialog>
      {/* QR Code Dialog */}
      <UIDialog open={!!viewVoucher} onOpenChange={() => setViewVoucher(null)}>
        <UIDialogContent className="">
          <UIDialogHeader>
            <UIDialogTitle>Voucher</UIDialogTitle>
          </UIDialogHeader>
          <div className="flex flex-col items-center gap-4 py-2">
            {viewVoucher && (
              <VoucherLayout
                name={viewVoucher.name}
                code={viewVoucher.code}
                expiring_at={viewVoucher.expiring_at}
              />
            )}
          </div>
        </UIDialogContent>
      </UIDialog>
    </>
  );
}
