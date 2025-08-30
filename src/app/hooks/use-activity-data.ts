import { useState, useEffect } from "react";
import { CommitDay } from "@/types/profile";
export function useActivityData(userId: string) {
  const [commitData, setCommitData] = useState<CommitDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // const data = await fetchCommitData(userId);
        const data: CommitDay[] = [];
        setCommitData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load commit data"),
        );
        // Fallback to generated data in development
        if (process.env.NODE_ENV === "development") {
          setCommitData(generateCommitData());
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [userId]);

  const totalContributions = commitData.reduce(
    (sum, day) => sum + day.count,
    0,
  );

  return {
    commitData,
    totalContributions,
    isLoading,
    error,
  };
}

// Generate realistic commit data for the past year
function generateCommitData(): CommitDay[] {
  const data: CommitDay[] = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Create realistic patterns - more commits on weekdays, less on weekends
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseChance = isWeekend ? 0.3 : 0.7;

    // Add randomness and seasonal patterns
    const seasonalMultiplier = Math.sin((i / 365) * Math.PI * 2) * 0.3 + 1;
    const randomFactor = Math.random();

    let count = 0;
    if (randomFactor < baseChance * seasonalMultiplier) {
      count = Math.floor(Math.random() * 8) + 1;
    }

    data.push({
      date: date.toISOString().split("T")[0],
      count,
      level:
        count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4,
    });
  }

  return data;
}
