"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { AuthApiResponse } from "@/types/api";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("code");

  useEffect(() => {
    if (!token) {
      router.push("/auth/forgot-password");
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setIsLoading(true);

    if (password !== confirmPassword) {
      setFieldErrors({ confirmPassword: "Passwords do not match" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data: AuthApiResponse = await response.json();

      if (!response.ok) {
        if (data.error?.details) {
          const details = JSON.parse(data.error.details);
          if (details?.fieldErrors) {
            setFieldErrors(details.fieldErrors);
          }
        } else {
          setError(data.error?.message || "An error occurred");
        }
        throw new Error(data.error?.message || "Failed to reset password");
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
                  Password reset successful
                </h2>
                <p className="text-muted-foreground">
                  Your password has been successfully reset. You can now sign in
                  with your new password.
                </p>
              </div>

              <Button
                onClick={() => router.push("/auth")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-full"
              >
                Continue to sign in
              </Button>
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
              <div className="mb-4 flex items-center justify-center gap-3">
                <Image src="/logo.png" alt="GitRise" width={32} height={32} />
                <h1 className="text-foreground text-xl font-bold">GitRise</h1>
              </div>
              <h2 className="text-foreground mb-2 text-2xl font-bold">
                Reset your password
              </h2>
              <p className="text-muted-foreground">
                Enter your new password below.
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
                  <Lock className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2 transform" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`border-border focus:border-primary focus:ring-primary h-12 pr-10 pl-10 ${
                      fieldErrors.password
                        ? "border-destructive focus:border-destructive"
                        : ""
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transform"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-destructive text-sm">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2 transform" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`border-border focus:border-primary focus:ring-primary h-12 pr-10 pl-10 ${
                      fieldErrors.confirmPassword
                        ? "border-destructive focus:border-destructive"
                        : ""
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transform"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="text-destructive text-sm">
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-full font-semibold"
              >
                {isLoading ? "Resetting..." : "Reset password"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
