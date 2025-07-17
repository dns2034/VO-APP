"use client";

import Image from "next/image";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator"

import { useRewards } from "@/hooks/useRewards";
import { useProducts } from "@/hooks/useProducts";


export default function RewardsPage() {
  const { rewards } = useRewards();
  const { products } = useProducts();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Virtual Office App
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Rewards</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <header>
              <h1 className="text-3xl font-bold tracking-tight">Rewards</h1>
              <p className="text-muted-foreground">
                Redeem your points for amazing products and rewards.
              </p>
            </header>
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:w-1/3 lg:w-1/4">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
              </TabsList>
              <TabsContent value="products">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                  {products.map((product) => (
                    <Card key={product.name} className="pt-0">
                      <CardHeader className="p-0">
                        <div className="relative aspect-video">
                          <Image
                            src={product.image_path || "/placeholder.png"}
                            alt={product.name}
                            fill
                            className="rounded-t-lg object-cover"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription className="mt-2 h-10">
                          {product.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <p className="font-semibold">{product.price}</p>
                        <Button>Redeem</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="rewards">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                  {rewards.map((reward) => (
                    <Card key={reward.name} className="pt-0">
                      <CardHeader className="p-0">
                        <div className="relative aspect-video">
                          <Image
                            src={reward.image_path || "/placeholder.png"}
                            alt={reward.name}
                            fill
                            className="rounded-t-lg object-cover"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <CardTitle>{reward.name}</CardTitle>
                        <CardDescription className="mt-2 h-10">
                          {reward.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <p className="font-semibold">{reward.price}</p>
                        <Button>Redeem</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
