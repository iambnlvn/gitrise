import { useState, useEffect } from "react";
import { Repository } from "@/types/profile";
import { starredRepositories } from "../app/[username]/mock/data";

export function useStarredRepositories(userId: string) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadStarredRepositories = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 700));
        setRepositories(starredRepositories);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to load starred repositories"),
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadStarredRepositories();
  }, [userId]);

  return { repositories, isLoading, error };
}
