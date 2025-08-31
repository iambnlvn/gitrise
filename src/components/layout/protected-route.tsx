"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Star, GitFork } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const DashboardSkeleton = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Header skeleton */}
      <header className="border-border bg-background fixed top-0 right-0 left-0 z-10 h-16 border-b">
        <div className="container flex h-full items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar skeleton */}
        <aside className="border-border bg-background fixed top-16 bottom-0 left-0 w-64 border-r">
          <div className="p-4">
            <Skeleton className="mb-6 h-8 w-full" />
            <div className="space-y-2">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
            </div>
          </div>
        </aside>

        <main className="ml-64 flex-1 p-6">
          <div className="mx-auto max-w-6xl">
            {/* Header section */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <Skeleton className="mb-2 h-8 w-40" /> {/* Repository title */}
                <Skeleton className="h-4 w-64" /> {/* Subtitle */}
              </div>
              <Skeleton className="h-10 w-32" /> {/* New repository button */}
            </div>

            {/* Search and Filter */}
            <div className="mb-6 flex items-center space-x-4">
              <div className="relative max-w-md flex-1">
                <div className="absolute top-1/2 left-3 -translate-y-1/2">
                  <Search className="text-muted-foreground h-4 w-4" />
                </div>
                <Skeleton className="h-10 w-full" /> {/* Search input */}
              </div>
              <Skeleton className="h-10 w-24" /> {/* Filter button */}
            </div>

            {/* Repository Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="border-border rounded-lg border p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <Skeleton className="h-5 w-32" /> {/* Repo name */}
                      <Skeleton className="h-5 w-16" /> {/* Private badge */}
                    </div>
                    <Skeleton className="mb-4 h-4 w-full" /> {/* Description */}
                    <div className="mt-4 flex items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <div className="mr-1 h-3 w-3 rounded-full bg-gray-200" />
                        <Skeleton className="h-4 w-16" /> {/* Language */}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="text-muted-foreground h-4 w-4" />
                        <Skeleton className="size-8" /> {/* Stars */}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="text-muted-foreground h-4 w-4" />
                        <Skeleton className="size-8" /> {/* Forks */}
                      </div>
                    </div>
                    <div className="mt-2">
                      <Skeleton className="h-3 w-24" /> {/* Updated at */}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function checkAuth() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        setUser(user);

        if (!user) {
          router.push("/auth");
        }
      } catch {
        router.push("/auth");
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        router.push("/auth");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
