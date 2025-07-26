import type { NextConfig } from "next";
const appDomain =
  process.env.NEXT_PUBLIC_SUPABASE_BUCKET_DOMAIN || "localhost:3000";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
