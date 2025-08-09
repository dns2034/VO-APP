import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_guest/auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full lg:grid lg:h-screen lg:grid-cols-2 xl:h-screen">
      <div className="hidden bg-muted lg:flex lg:items-center lg:justify-center">
        <div className="text-center px-12">
          <img
            src="/logo.webp"
            alt="Virtual Office Logo"
            className="mx-auto mb-6 size-[120px]"
          />
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to your Virtual Office
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Connect, collaborate, and be productive.
          </p>
        </div>
      </div>

      {/* Main Login Page */}
      <div className="flex items-center justify-center h-screen">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="lg:hidden text-center">
            <img
              src="/logo.webp"
              alt="Virtual Office Logo"
              className="mx-auto mb-4 size-[70px]"
            />
          </div>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-balance text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
