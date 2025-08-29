import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RepositoryCard } from "@/components/layout/repository-card";
import { Repository, Profile } from "@/types/profile";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRepositories } from "@/app/hooks/use-repositories";

interface RepositoriesTabProps {
  user: Profile;
  isOwnProfile: boolean;
}

export function RepositoriesTab({ user, isOwnProfile }: RepositoriesTabProps) {
  const { repositories, isLoading } = useRepositories(user.id);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRepos = repositories.filter(
    (repo: Repository) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold">
          Public repositories ({user.publicRepos})
        </h2>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input
              placeholder="Find a repository..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {isOwnProfile && (
            <Link href="/new">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                New
              </Button>
            </Link>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-muted/20 h-32 animate-pulse rounded-md"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredRepos.map((repo: Repository, index: number) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/${repo.owner}/${repo.name}`}>
                <RepositoryCard {...repo} />
              </Link>
            </motion.div>
          ))}

          {filteredRepos.length === 0 && (
            <div className="col-span-2 py-8 text-center">
              {searchQuery ? (
                <p className="text-muted-foreground">
                  No repositories matching &quot;{searchQuery}&quot;
                </p>
              ) : (
                <p className="text-muted-foreground">
                  No repositories available
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
