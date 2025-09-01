import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RepositoryCard } from "@/components/layout/repository-card";
import { Repository } from "@/types/profile";
import { Pin } from "lucide-react";
import { useRouter } from "next/navigation";

interface PinnedRepositoriesProps {
  userId: string;
}

export function PinnedRepositories({ userId }: PinnedRepositoriesProps) {
  const [pinnedRepos, setPinnedRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const loadPinnedRepos = async () => {
      try {
        setIsLoading(true);
        // In a real app, fetch from API
        // const response = await fetch(`/api/users/${userId}/pinned`);
        // const data = await response.json();

        // For demo, use first 2 repos from mock data
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Import dynamically to avoid circular dependencies
        const { mockRepositories } = await import("../mock/data");
        setPinnedRepos(mockRepositories.slice(0, 2));
      } catch (error) {
        console.error("Failed to load pinned repositories", error);
        setPinnedRepos([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPinnedRepos();
  }, [userId]);

  if (isLoading) {
    return (
      <div>
        <h2 className="mb-4 flex items-center text-lg font-semibold">
          <Pin className="mr-2 size-5" />
          Pinned
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-muted/20 h-32 animate-pulse rounded-md"
            />
          ))}
        </div>
      </div>
    );
  }

  if (pinnedRepos.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="mb-4 flex items-center text-lg font-semibold">
        <Pin className="mr-2 size-5" />
        Pinned
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {pinnedRepos.map((repo, index) => (
          <motion.div
            key={`${repo.owner}-${repo.name}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              className="cursor-pointer"
              onClick={() => router.push(`/${repo.owner}/${repo.name}`)}
            >
              <RepositoryCard {...repo} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
