"use client"
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/refer");
    }
  }, [user, router]);

  if (user === undefined) return <h1>Loading...</h1>;

  if (user === null) return <>{children}</>;
}
