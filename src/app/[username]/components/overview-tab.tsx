import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommitDay, DisplayConfig, Profile } from "@/types/profile";
import { ContributionGraph } from "./contrib-graph";
import { ActivityFeed } from "./activity-feed";
import { recentActivity } from "../mock/data";
import { PinnedRepositories } from "./pinned-repositories";

interface OverviewTabProps {
  user: Profile;
  commitData: CommitDay[];
  totalContributions: number;
  displayConfig: DisplayConfig;
}

export function OverviewTab({
  user,
  commitData,
  totalContributions,
  displayConfig,
}: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Pinned repositories section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PinnedRepositories userId={user.id} />
      </motion.div>
      <div className="space-y-6">
        {/* Contribution graph - only show if configured */}
        {displayConfig.showContributions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ContributionGraph
              commitData={commitData}
              totalContributions={totalContributions}
            />
          </motion.div>
        )}
      </div>
      <div className="space-y-6">
        {/* Activity section - only show if configured */}
        {displayConfig.showActivity && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityFeed activities={recentActivity} />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
