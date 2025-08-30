import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CommitDay } from "@/types/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContributionGraphProps {
  commitData: CommitDay[];
  totalContributions: number;
}

export function ContributionGraph({
  commitData,
  totalContributions,
}: ContributionGraphProps) {
  const [animateSquares, setAnimateSquares] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateSquares(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="bg-card/50 border-border/50 w-full backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <span>Contribution Activity</span>
          <span className="text-muted-foreground text-sm font-normal">
            {totalContributions.toLocaleString()} contributions in the last year
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 w-full">
          <div className="mb-3 grid grid-cols-53 gap-1">
            {commitData.map((day, index) => (
              <motion.div
                key={day.date}
                className={`size-3 rounded-sm ${getContributionColor(day.level)} hover:ring-primary/50 cursor-pointer hover:ring-2`}
                title={`${day.count} contributions on ${day.date}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  animateSquares
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
                }
                transition={{
                  delay: animateSquares ? index * 0.001 : 0,
                  duration: 0.2,
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
          <ContributionLegend />
        </div>
      </CardContent>
    </Card>
  );
}

function ContributionLegend() {
  return (
    <div className="text-muted-foreground flex items-center justify-between text-xs">
      <span>Less</span>
      <div className="flex items-center space-x-1">
        <div className="size-3 rounded-sm bg-gray-100 dark:bg-gray-800" />
        <div className="size-3 rounded-sm bg-green-200 dark:bg-green-900" />
        <div className="size-3 rounded-sm bg-green-400 dark:bg-green-700" />
        <div className="size-3 rounded-sm bg-green-600 dark:bg-green-500" />
        <div className="size-3 rounded-sm bg-green-800 dark:bg-green-300" />
      </div>
      <span>More</span>
    </div>
  );
}

function getContributionColor(level: number) {
  const colors = [
    "bg-gray-100 dark:bg-gray-800", // 0 contributions
    "bg-green-200 dark:bg-green-900", // 1-2 contributions
    "bg-green-400 dark:bg-green-700", // 3-4 contributions
    "bg-green-600 dark:bg-green-500", // 5-6 contributions
    "bg-green-800 dark:bg-green-300", // 7+ contributions
  ];
  return colors[level] || colors[0];
}
