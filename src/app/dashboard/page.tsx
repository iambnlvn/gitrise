"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Star, GitFork } from "lucide-react";
import Link from "next/link";
import { RepositorySidebar } from "../../components/layout/repository-sidebar";
import { RepositoryCard } from "../../components/layout/repository-card";
import { ProtectedRoute } from "../../components/layout/protected-route";
import { mockRepositories } from "./constants/constants";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  return (
    <ProtectedRoute loadingSkeleton={<DashboardSkeleton />}>
      <div className="bg-background min-h-screen">
        <div className="flex">
          <RepositorySidebar />

          <main className="flex-1 p-6">
            <div className="mx-auto max-w-6xl">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="mb-2 text-2xl font-bold">Repositories</h1>
                  <p className="text-muted-foreground">
                    Manage and explore your repositories
                  </p>
                </div>
                <Link href="/new">
                  <Button>New repository</Button>
                </Link>
              </div>

              {/* Search and Filter */}
              <div className="mb-6 flex items-center space-x-4">
                <div className="relative max-w-md flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Find a repository..." className="pl-10" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 size-4" />
                  Filter
                </Button>
              </div>

              {/* Repository Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockRepositories.map((repo, index) => (
                  <RepositoryCard
                    key={index}
                    name={repo.name}
                    owner={repo.owner}
                    description={repo.description}
                    language={repo.language}
                    stars={repo.stars}
                    forks={repo.forks}
                    isPrivate={repo.isPrivate}
                    updatedAt={repo.updatedAt}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
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
                <Skeleton className="mb-2 h-8 w-40" />
                <Skeleton className="h-4 w-64" />
              </div>
              <Skeleton className="h-10 w-32" />
            </div>

            {/* Search and Filter */}
            <div className="mb-6 flex items-center space-x-4">
              <div className="relative max-w-md flex-1">
                <div className="absolute top-1/2 left-3 -translate-y-1/2">
                  <Search className="text-muted-foreground size-4" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-24" />
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
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="mb-4 h-4 w-full" />
                    <div className="mt-4 flex items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <div className="mr-1 size-3 rounded-full bg-gray-200" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="text-muted-foreground size-4" />
                        <Skeleton className="size-8" />
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="text-muted-foreground size-4" />
                        <Skeleton className="size-8" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <Skeleton className="h-3 w-24" />
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
