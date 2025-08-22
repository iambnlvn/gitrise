"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  User,
  Lock,
  GitBranch,
  GitCommit,
  GitFork,
  GitMerge,
  Github,
} from "lucide-react";
import Image from "next/image";
import { loginSchema, signupSchema } from "@/lib/validations/auth";
import { AuthApiResponse } from "@/types/api";
import { treeifyError } from "zod";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

const GitLabIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.16l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.16l2.44 7.51 1.22 3.78a.84.84 0 0 1-.3.94z" />
  </svg>
);

export function MainAuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponseMessage(null);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const payload = isLogin
        ? { email, password }
        : { email, password, username, agreedToTerms };
      const validationSchema = isLogin ? loginSchema : signupSchema;
      const validationResult = validationSchema.safeParse(payload);

      if (!validationResult.success) {
        const errors = treeifyError(validationResult.error);

        setResponseMessage(errors.errors.join(", "));
        setIsError(true);
        return;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validationResult.data),
      });

      const data: AuthApiResponse = await response.json();

      if (!response.ok) {
        setResponseMessage(
          data.error?.message || "Authentication failed. Please try again.",
        );
        setIsError(true);
      } else {
        setResponseMessage(data.message || "Authentication successful!");
        setIsError(false);

        if (!isLogin) {
          setUsername("");
          setEmail("");
          setPassword("");
          setAgreedToTerms(false);
          router.replace("/dashboard");
        }
      }
    } catch {
      setResponseMessage(
        "An unexpected error occurred. Please try again later.",
      );
      setIsError(true);
    }
  };

  const handleGitHubAuth = async () => {
    // TODO: Implement GitHub OAuth with Supabase
    console.log("GitHub OAuth initiated");
  };

  const handleGitLabAuth = async () => {
    // TODO: Implement GitLab OAuth with Supabase
    console.log("GitLab OAuth initiated");
  };

  return (
    <div className="from-primary via-secondary to-accent relative min-h-screen overflow-hidden bg-gradient-to-br">
      {/* Background geometric elements */}
      <div className="absolute inset-0">
        {/* Geometric shapes */}
        <div className="absolute top-20 left-10 size-4 rotate-45 bg-white/20"></div>
        <div className="bg-primary/30 absolute top-40 right-20 size-6 rotate-45"></div>
        <div className="absolute bottom-32 left-20 size-3 rounded-full bg-white/30"></div>
        <div className="bg-secondary/20 absolute right-32 bottom-20 size-8 rotate-45"></div>
        <div className="absolute top-1/3 right-10 size-2 rounded-full bg-white/40"></div>

        {/* Curved lines */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 800">
          <path
            d="M0,400 Q300,200 600,400 T1200,400"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,300 Q400,100 800,300 T1200,300"
            stroke="rgba(16,185,129,0.2)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        {/* Main container */}
        <div className="w-full max-w-6xl">
          {/* GitRise branding */}
          {/* <div className="mb-3 text-center">
            <div className="flex items-center justify-center gap-3">
              <Image
                src="/logo.png"
                alt="GitRise"
                width={60}
                height={60}
                className="brightness-0 invert"
              />
              <span className="sr-only text-3xl font-bold text-white">
                GitRise
              </span>
            </div>
          </div> */}

          {/* Auth container */}
          <div className="bg-card/80 rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-sm">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              {/* Left side - Form */}
              <div className="bg-background rounded-2xl p-8 shadow-xl">
                <div className="mb-3">
                  <h2 className="text-foreground mb-2 text-2xl font-bold">
                    {isLogin
                      ? "Sign in to GitRise"
                      : "Create your GitRise account"}
                  </h2>
                  <p className="text-muted-foreground">
                    {isLogin
                      ? "Welcome back! Please sign in to continue"
                      : "Join the developer community"}
                  </p>
                </div>

                <div className="mb-3 space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGitHubAuth}
                    className="border-border hover:bg-muted h-12 w-full bg-transparent"
                  >
                    <Github className="mr-3 size-5" />
                    Continue with GitHub
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGitLabAuth}
                    className="border-border hover:bg-muted h-12 w-full bg-transparent"
                  >
                    <GitLabIcon className="mr-3 size-5" />
                    Continue with GitLab
                  </Button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="border-border w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background text-muted-foreground px-2">
                      Or continue with email
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="relative">
                      <User className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2 transform" />
                      <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border-border focus:border-primary focus:ring-primary h-12 pl-10"
                        required
                      />
                    </div>
                  )}

                  <div className="relative">
                    <User className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2 transform" />
                    <Input
                      type="email"
                      placeholder="Username or email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-border focus:border-primary focus:ring-primary h-12 pl-10"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2 transform" />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-border focus:border-primary focus:ring-primary h-12 pl-10"
                      required
                    />
                  </div>

                  {!isLogin && (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) =>
                          setAgreedToTerms(checked as boolean)
                        }
                      />
                      <label
                        htmlFor="terms"
                        className="text-muted-foreground text-sm"
                      >
                        I agree to the terms of service
                      </label>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-full rounded-xl font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
                  >
                    {isLogin ? "Sign in" : "Create account"}
                  </Button>
                </form>
                <p
                  className={cn(
                    isError ? "text-red-500" : "text-green-500",
                    "mt-4 min-h-[1.5rem] text-center font-medium",
                  )}
                >
                  {responseMessage}
                </p>
                <div className="mt-1 flex justify-center space-x-2 text-center">
                  <p className="text-muted-foreground">
                    {isLogin
                      ? "Don't have an account? "
                      : "Already have an account? "}
                  </p>
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary hover:text-primary/80 font-semibold"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </div>
                {isLogin && (
                  <div className="mt-4 text-center">
                    <Link
                      href="/auth/forgot-password"
                      className="text-primary hover:text-primary/80 text-sm"
                      type="button"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                )}
              </div>

              {/* Right side - Illustration */}
              <div className="hidden items-center justify-center lg:flex">
                <div className="relative">
                  {/* Central GitRise logo */}
                  <div className="from-primary to-secondary relative z-10 flex size-24 items-center justify-center rounded-full bg-gradient-to-br shadow-2xl">
                    <Image
                      src="/logo.png"
                      alt="GitRise"
                      width={48}
                      height={48}
                      className="brightness-0 invert"
                    />
                  </div>

                  {/* Dynamic orbiting icons based on configuration */}
                  {/* Orbiting user avatars */}
                  <div
                    className="absolute inset-0 animate-spin"
                    style={{ animationDuration: "20s" }}
                  >
                    <div className="absolute -top-8 left-1/2 flex size-10 -translate-x-1/2 transform items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-pink-500 shadow-lg">
                      <GitCommit className="size-8 text-white" />
                    </div>

                    <div className="from-primary to-secondary absolute top-1/2 -right-8 flex size-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-gradient-to-br shadow-lg">
                      <GitBranch className="size-8 text-white" />
                    </div>

                    <div className="absolute -bottom-8 left-1/2 flex size-10 -translate-x-1/2 transform items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg">
                      <GitFork className="size-8 text-white" />
                    </div>

                    <div className="from-accent to-secondary absolute top-1/2 -left-8 flex size-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-gradient-to-br shadow-lg">
                      <GitMerge className="size-8 text-white" />
                    </div>
                  </div>

                  {/* Connecting orbital rings */}
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 200 200"
                  >
                    {/* Inner orbit ring */}
                    <circle
                      cx="100"
                      cy="100"
                      r="60"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    />
                    {/* Middle orbit ring */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="1"
                      fill="none"
                      strokeDasharray="3,3"
                    />
                    {/* Outer orbit ring */}
                    <circle
                      cx="100"
                      cy="100"
                      r="100"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                      fill="none"
                      strokeDasharray="2,4"
                    />
                  </svg>

                  {/* Floating dots */}
                  <div className="bg-primary absolute -top-4 -right-4 size-2 animate-pulse rounded-full"></div>
                  <div
                    className="absolute -bottom-4 -left-4 size-2 animate-pulse rounded-full bg-pink-400"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="absolute top-8 -left-6 size-2 animate-pulse rounded-full bg-blue-400"
                    style={{ animationDelay: "2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
