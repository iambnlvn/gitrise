import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { RepositoryCard } from "@/components/layout/repository-card";
import { Repository } from "@/types/profile";
import { Input } from "@/components/ui/input";
import { Search, Star } from "lucide-react";
import { useStarredRepositories } from "@/app/hooks/use-starred-repositories";

interface StarredTabProps {
  userId: string;
}

export function StarredTab({ userId }: StarredTabProps) {
  const { repositories, isLoading } = useStarredRepositories(userId);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRepos = repositories.filter(
    (repo: Repository) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Star className="size-5 text-yellow-500" />
          Starred repositories ({repositories.length})
        </h2>

        <div className="relative flex-1 sm:max-w-xs">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            placeholder="Find a repository..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
              key={`${repo.owner}-${repo.name}`}
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
            <div className="col-span-2 py-12 text-center">
              {searchQuery ? (
                <p className="text-muted-foreground">
                  No starred repositories matching &quot;{searchQuery}&quot;
                </p>
              ) : (
                <p className="text-muted-foreground">
                  No starred repositories yet
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
