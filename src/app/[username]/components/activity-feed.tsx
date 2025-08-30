import { motion } from "framer-motion";
import { Star, GitFork, GitPullRequest, GitCommit, Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Activity {
  type: string;
  repo: string;
  time: string;
  color: string;
  commits?: number;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  if (activities.length === 0) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        No recent activity
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <motion.div
          key={`${activity.type}-${activity.repo}-${index}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start"
        >
          <div className={cn("mt-1 mr-3 rounded-full p-1.5", activity.color)}>
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1">
            <div className="text-sm">
              <span className="font-medium">{getActivityText(activity)}</span>
            </div>
            <div className="text-muted-foreground text-xs">{activity.time}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function getActivityIcon(type: string) {
  switch (type) {
    case "created":
      return <Plus className="size-4 text-white" />;
    case "pushed":
      return <GitCommit className="size-4 text-white" />;
    case "starred":
      return <Star className="size-4 text-white" />;
    case "forked":
      return <GitFork className="size-4 text-white" />;
    case "pr":
      return <GitPullRequest className="size-4 text-white" />;
    default:
      return <GitCommit className="size-4 text-white" />;
  }
}

function getActivityText(activity: Activity) {
  switch (activity.type) {
    case "created":
      return (
        <>
          Created repository{" "}
          <Link
            href={`/${activity.repo}`}
            className="text-primary font-semibold hover:underline"
          >
            {activity.repo}
          </Link>
        </>
      );
    case "pushed":
      return (
        <>
          Pushed {activity.commits} commit{activity.commits !== 1 ? "s" : ""} to{" "}
          <Link
            href={`/${activity.repo}`}
            className="text-primary font-semibold hover:underline"
          >
            {activity.repo}
          </Link>
        </>
      );
    case "starred":
      return (
        <>
          Starred{" "}
          <Link
            href={`/${activity.repo}`}
            className="text-primary font-semibold hover:underline"
          >
            {activity.repo}
          </Link>
        </>
      );
    case "forked":
      return (
        <>
          Forked{" "}
          <Link
            href={`/${activity.repo}`}
            className="text-primary font-semibold hover:underline"
          >
            {activity.repo}
          </Link>
        </>
      );
    default:
      return (
        <>
          Activity on{" "}
          <Link
            href={`/${activity.repo}`}
            className="text-primary font-semibold hover:underline"
          >
            {activity.repo}
          </Link>
        </>
      );
  }
}
