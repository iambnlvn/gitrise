"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { forgotPasswordSchema } from "@/lib/validations/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const emailValidation = forgotPasswordSchema.safeParse({ email });
      if (!emailValidation.success) {
        throw new Error("Please enter a valid email address");
      }
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send reset email");
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="from-primary via-secondary to-accent relative min-h-screen overflow-hidden bg-gradient-to-br">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 size-4 rotate-45 bg-white/20"></div>
          <div className="bg-primary/30 absolute top-40 right-20 size-6 rotate-45"></div>
          <div className="absolute bottom-32 left-20 size-3 rounded-full bg-white/30"></div>
          <div className="bg-secondary/20 absolute right-32 bottom-20 size-8 rotate-45"></div>
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-background rounded-2xl border border-white/10 p-8 shadow-xl">
              <div className="mb-6 text-center">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <Image src="/logo.png" alt="GitRise" width={32} height={32} />
                  <h1 className="text-foreground text-xl font-bold">GitRise</h1>
                </div>
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="size-8 text-green-600" />
                </div>
                <h2 className="text-foreground mb-2 text-2xl font-bold">
                  Check your email
                </h2>
                <p className="text-muted-foreground">
                  We&apos;ve sent a password reset link to{" "}
                  <strong>{email}</strong>
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => router.push("/auth")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-full"
                >
                  Back to sign in
                </Button>
                <p className="text-muted-foreground text-center text-sm">
                  Didn&apos;t receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    try again
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="from-primary via-secondary to-accent relative min-h-screen overflow-hidden bg-gradient-to-br">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 size-4 rotate-45 bg-white/20"></div>
        <div className="bg-primary/30 absolute top-40 right-20 size-6 rotate-45"></div>
        <div className="absolute bottom-32 left-20 size-3 rounded-full bg-white/30"></div>
        <div className="bg-secondary/20 absolute right-32 bottom-20 size-8 rotate-45"></div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-background rounded-2xl border border-white/10 p-8 shadow-xl">
            <div className="mb-6">
              <Link
                href="/auth"
                className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center"
              >
                <ArrowLeft className="mr-2 size-4" />
                Back to sign in
              </Link>
              <div className="mb-4 flex items-center justify-center gap-3">
                <Image src="/logo.png" alt="GitRise" width={32} height={32} />
                <h1 className="text-foreground text-xl font-bold">GitRise</h1>
              </div>
              <h2 className="text-foreground mb-2 text-2xl font-bold">
                Forgot your password?
              </h2>
              <p className="text-muted-foreground">
                Enter your email address and we&apos;ll send you a link to reset
                your password.
              </p>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="size-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2 transform" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-border focus:border-primary focus:ring-primary h-12 pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-full font-semibold"
              >
                {isLoading ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
