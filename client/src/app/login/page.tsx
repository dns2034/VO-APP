import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="hidden bg-muted lg:flex lg:items-center lg:justify-center">
        <div className="text-center px-12">
          <Image
            src="/logo.webp"
            alt="Virtual Office Logo"
            width={120}
            height={120}
            className="mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to your Virtual Office
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Connect, collaborate, and be productive.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="lg:hidden text-center">
            <Image
              src="/logo.webp"
              alt="Virtual Office Logo"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
          </div>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-balance text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}