import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Virtual Office App | Incub8Space",
  description:
    "A virtual office app for managing your booking, referral and rewards.",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster
            closeButton
            toastOptions={{
              className: "bg-white",
              classNames: {
                closeButton: "text-black bg-gray-200 hover:bg-gray-300",
                description: "!text-gray-700",
              },
            }}
          />
          <div className="min-h-screen">{children}</div>
        </body>
      </html>
    </QueryClientProvider>
  );
}
