"use client";

import Image from "next/image";
import useForgotPassword from "@/hooks/useForgotPassword";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0); // in seconds

  const { sendResetLink } = useForgotPassword();

  useEffect(() => {
    if (countdown === 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const progress = countdown > 0 ? (countdown / 30) * 100 : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await sendResetLink(email);
      setCountdown(30); // Reset countdown to 30 seconds
      setEmail(""); // Clear email input
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="lg:hidden text-center">
          <Image
            src="/logo.webp"
            alt="Virtual Office Logo"
            width={70}
            height={70}
            className="mx-auto mb-4"
          />
        </div>
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email to reset your password
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
              disabled={countdown > 0}
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 text-center">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading || countdown > 0}
          >
            {loading
              ? "Sending..."
              : countdown > 0
              ? `Wait ${countdown}s`
              : "Send Reset Link"}
          </Button>

          {countdown > 0 && <Progress value={100 - progress} />}
        </form>
      </div>
    </div>
  );
}
