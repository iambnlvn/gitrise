import { useState, useEffect } from "react";
import { Repository } from "@/types/profile";
import { mockRepositories } from "../dashboard/constants/constants";

export function useRepositories(userId: string) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadRepositories = async () => {
      try {
        setIsLoading(true);

        // For demo purposes, use mock data with a delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setRepositories(mockRepositories);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load repositories"),
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadRepositories();
  }, [userId]);

  return { repositories, isLoading, error };
}
