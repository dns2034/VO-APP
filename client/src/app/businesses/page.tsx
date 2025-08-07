"use client";

import { useState } from "react";
import BottomBar from "@/components/bottom-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BusinessesService from "@/services/businesses.service";

const businesses = [
  {
    id: 1,
    name: "Coffee Corner",
    description: "A cozy place to enjoy premium coffee and snacks.",
    image: "/placeholder.png",
  },
  {
    id: 2,
    name: "Tech Solutions",
    description: "IT consulting and software development services.",
    image: "/placeholder.png",
  },
  {
    id: 3,
    name: "Fitness Hub",
    description: "Modern gym with personal trainers and group classes.",
    image: "/placeholder.png",
  },
  {
    id: 4,
    name: "Book Nook",
    description: "A quiet space for book lovers and readers.",
    image: "/placeholder.png",
  },
  {
    id: 5,
    name: "Green Eats",
    description: "Healthy and organic food options for everyone.",
    image: "/placeholder.png",
  },
  {
    id: 6,
    name: "Design Studio",
    description: "Creative design and branding agency.",
    image: "/placeholder.png",
  },
];

export default function BusinessesPage() {
  const [selectedBusiness, setSelectedBusiness] = useState<
    null | (typeof businesses)[0]
  >(null);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex flex-row items-center bg-white text-gray-900 p-4">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="font-bold text-lg">Businesses</h1>
          <p className="text-xs text-gray-500">
            Explore and connect with our partner businesses.
          </p>
        </div>
      </header>
      <main className="flex-1 flex flex-col gap-0 p-4 lg:p-6 max-w-4xl w-full mx-auto">
        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 mb-4">
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="my-businesses">My Businesses</TabsTrigger>
          </TabsList>
          <TabsContent value="explore">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {businesses.map((biz) => (
                <button
                  key={biz.id}
                  className="flex flex-col items-center bg-white rounded-lg border border-border p-2 hover:shadow-md transition cursor-pointer"
                  onClick={() => setSelectedBusiness(biz)}
                  type="button"
                >
                  <div className="w-full aspect-square rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={biz.image}
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
            <Dialog
              open={!!selectedBusiness}
              onOpenChange={() => setSelectedBusiness(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{selectedBusiness?.name}</DialogTitle>
                  <DialogDescription>
                    {selectedBusiness?.description}
                  </DialogDescription>
                </DialogHeader>
                <DialogClose asChild>
                  <Button className="mt-4 w-full" variant="outline">
                    Close
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </TabsContent>
          <TabsContent value="my-businesses">
            <div className="bg-white rounded-lg border border-border p-4 text-center">
              <h2 className="font-semibold text-base mb-2">My Businesses</h2>
              <p className="text-sm text-muted-foreground">
                You have not added any businesses yet.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <BottomBar />
    </div>
  );
}
