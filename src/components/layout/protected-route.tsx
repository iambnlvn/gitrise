"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  children: ReactNode;
  loadingSkeleton?: ReactNode;
}

const DefaultLoadingSkeleton = () => {
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
            <Skeleton className="mb-6 h-8 w-40" />
            <div className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export function ProtectedRoute({
  children,
  loadingSkeleton,
}: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

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
  }, [router]);

  if (isLoading) {
    return loadingSkeleton ?? <DefaultLoadingSkeleton />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
