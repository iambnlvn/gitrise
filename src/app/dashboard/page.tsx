import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import Link from "next/link";
import { Header } from "../../components/layout/header";
import { RepositorySidebar } from "../../components/layout/repository-sidebar";
import { RepositoryCard } from "../../components/layout/repository-card";
import { ProtectedRoute } from "../../components/layout/proteced-route";
import { mockRepositories } from "./constants/constants";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="bg-background min-h-screen">
        <Header />

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
                  <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input placeholder="Find a repository..." className="pl-10" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>

              {/* Repository Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockRepositories.map((repo, index) => (
                  <Link key={index} href={`/repository/john.doe/${repo.name}`}>
                    <RepositoryCard
                      name={repo.name}
                      description={repo.description}
                      language={repo.language}
                      languageColor={repo.languageColor}
                      stars={repo.stars}
                      forks={repo.forks}
                      isPrivate={repo.isPrivate}
                      updatedAt={repo.updatedAt}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
